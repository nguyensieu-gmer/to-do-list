import { ProjectManager } from './independencies/project.js';
import { TodoManager } from './independencies/todo.js';
import { TaskManager } from './independencies/task.js';
import { initRender, displayProject, getData, renderSidebar } from './independencies/screen.js';
import { addDays, addHours, format } from 'date-fns';
import './style.css';

class App{
    constructor(){
        this.PM = ProjectManager();
        this.TM = TodoManager();
        this.TKM = TaskManager();

        this.currentProjectID = null;

        this.init();
    }

    init(){
        this.initLocalStorage();
        this.bindEvents();
    }

    initLocalStorage(){
        const data = JSON.parse(localStorage.getItem('todolist'));

        if (data){
            this.PM.setProject(data);
        }
        else{
            this.addDefault();
        }

        const projects = getData();
        this.currentProjectID = projects.length ? projects[0].id : null;
        initRender();
    }

    addDefault(){
        const projectId = this.PM.addProject('Work out');
        const project = this.PM.findProjectById(projectId);

        const todoId = this.TM.addTodo(project, 'calisthenic');
        const findTodo = this.TM.findTodoById(project, todoId);

        const task1 = this.TKM.makeTask('push up', '12:00', true, false);
        const task2 = this.TKM.makeTask('squat', '5:00', false, false);
        const task3 = this.TKM.makeTask('crunch', '6:00', false, true);
        this.TM.addTask(findTodo, task1);
        this.TM.addTask(findTodo, task2);
        this.TM.addTask(findTodo, task3);

        this.save();
    }

    save(){
        localStorage.setItem('todolist', JSON.stringify(this.PM.getprojects()));
    }

    bindEvents(){
        const content = document.querySelector('.content');
        const confirm_dialog = document.getElementById('confirm_dialog');
        const Add_project_dialog = document.getElementById('Add_project_dialog');
        const Add_project = document.getElementById('Add_project');
        const modify_project_dialog = document.getElementById('modify_project_dialog');
        const add_todo_dialog = document.getElementById('add_todo_dialog');
        const rename_dialog = document.getElementById('rename_dialog');

        add_todo_dialog.addEventListener('submit', e => {
            if (e.submitter.value === 'cancel') return;
            const todoName = document.getElementById('input_todo_name');
            if (todoName.value === ''){
                return;
            }
            this.handleAddTodo(todoName.value);
        });

        rename_dialog.addEventListener('submit', e => {
            if (e.submitter.value === 'cancel') return;
            const newProjectName = document.getElementById('input_new_project_name');
            if (newProjectName.value === '') return;
            this.handleRenameProject(newProjectName.value);
        })

        modify_project_dialog.addEventListener('close', e => {
            const value = modify_project_dialog.returnValue;
            if (value === 'rename'){
                rename_dialog.showModal();
            }
            else if (value === 'delete'){
                confirm_dialog.showModal();
            }
            else if (value === 'add_todo'){
                add_todo_dialog.showModal();
            }
            else return;
        });

        Add_project.addEventListener('click', () => {
            Add_project_dialog.showModal();
        });

        Add_project_dialog.addEventListener('submit', e => {
            e.preventDefault();
            if (e.submitter.value === 'cancel'){
                Add_project_dialog.close();
                return;
            } 
                
            const new_project_name = document.getElementById('new_project_name');
            const newName = new_project_name.value
            if (newName === ''){
                Add_project_dialog.close();
                return;
            }
                
            this.handleAddproject(newName);
            Add_project_dialog.close();
        });

        content.addEventListener('click', e => {
            const btn = e.target.closest('.modify_project_btn');
            if (!btn) return;

            this.currentProjectID = btn.dataset.id;
            document.getElementById('modify_project_dialog').showModal();
        });

        confirm_dialog.addEventListener('close', e => {
            if (confirm_dialog.returnValue === 'yes'){
                this.handleDeleteProject();
            }
        });


    }
    handleAddTodo(todoName){
        const project = this.PM.findProjectById(this.currentProjectID);
        this.TM.addTodo(project, todoName);
        this.save();
        renderSidebar();
        displayProject(this.currentProjectID);
    }

    handleRenameProject(newProjectName){
        this.PM.renameProjectById(this.currentProjectID, newProjectName);
        this.save();
        renderSidebar();
        displayProject(this.currentProjectID);
    }

    handleAddproject(newName){
        const newProjectID = this.PM.addProject(newName);
        this.currentProjectID = newProjectID;
        this.save();
        renderSidebar();
        displayProject(newProjectID);
    }
    
    handleDeleteProject(){
        const ids = getData().map(item => item.id);
        const index = ids.findIndex(id => id === this.currentProjectID);

        if (index === -1) return;

        const next = ids[index - 1] || ids[index + 1];
        
        this.PM.deleteProjectById(this.currentProjectID);
        this.save();

        renderSidebar();

        if (next) {
            this.currentProjectID = next;
            displayProject(next);
        }
        else{
            this.currentProjectID = null;
        }
    }
}

new App();