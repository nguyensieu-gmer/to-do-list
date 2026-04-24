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
        this.currentTodoID = null;
        this.currentTaskID = null;

        this.init();
    }

    init(){
        this.initLocalStorage();
        this.bindEvents();
    }

    initLocalStorage(){
        const data = JSON.parse(localStorage.getItem('todolist'));

        if (!data || data.length === 0){
            this.addDefault();
        }
        else{
            
            this.PM.setProject(data);
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
        const confirm_project_dialog = document.getElementById('confirm_project_dialog');
        const Add_project_dialog = document.getElementById('Add_project_dialog');
        const Add_project = document.getElementById('Add_project');
        const modify_project_dialog = document.getElementById('modify_project_dialog');
        const add_todo_dialog = document.getElementById('add_todo_dialog');
        const rename_project_dialog = document.getElementById('rename_project_dialog');
        const modify_todo_dialog = document.getElementById('modify_todo_dialog');
        const rename_todo_dialog = document.getElementById('rename_todo_dialog');
        const delete_todo_dialog = document.getElementById('delete_todo_dialog');
        const add_task_dialog = document.getElementById('add_task_dialog');
        const edit_task_dialog = document.getElementById('edit_task_dialog');
        const edit_option_dialog = document.getElementById('edit_option_dialog');
        const delete_task_dialog = document.getElementById('delete_task_dialog');

        delete_task_dialog.addEventListener('close', e => {
            const value = delete_task_dialog.returnValue;
            if (value === 'yes'){
                this.handleDeleteTask();
            }
        }); 

        edit_task_dialog.addEventListener('close', () => {
            edit_task_dialog.querySelector('form').reset();
        });

        edit_task_dialog.addEventListener('submit', e => {
            const form = edit_task_dialog.querySelector('form');

            const title = form.elements['input_edit_task_title'].value;
            const dueDate = form.elements['input_edit_task_duedate'].value;
            const priority = form.elements['input_edit_task_priority'].checked;
            const checkList = form.elements['input_edit_task_check'].checked;
            
            const newData = {title, dueDate, priority, checkList};

            this.handleEditTask(newData);
        });

        edit_option_dialog.addEventListener('close', e => {
            const value = edit_option_dialog.returnValue;
            if (value === 'edit'){
                edit_task_dialog.showModal();
            }
            else if (value === 'delete'){
                delete_task_dialog.showModal();
            }
            else return;
        });

        add_task_dialog.addEventListener('submit', e => {
            if (e.submitter.value === 'cancel') return;
            const form = add_task_dialog.querySelector('form');

            const title = form.elements['input_task_title'].value;
            const dueDate = form.elements['input_task_duedate'].value;
            const priority = form.elements['input_task_priority'].checked;
            const checkList = form.elements['input_task_check'].checked;

            this.handleMakeTask(title, dueDate, priority, checkList);
        });

        delete_todo_dialog.addEventListener('close', e => {
            if (delete_todo_dialog.returnValue === 'yes'){
                this.handleDeleteTodo();
            }
        })

        rename_todo_dialog.addEventListener('submit', e => {
            if (e.submitter.value === 'cancel') return;

            const newName = document.getElementById('input_new_todo_name').value;
            if (newName === '') return;
            this.handleRenameTodo(newName);
        })

        modify_todo_dialog.addEventListener('close', () => {
            const value = modify_todo_dialog.returnValue;
            if (value === 'rename'){
                rename_todo_dialog.showModal();
            }
            else if (value === 'delete'){
                delete_todo_dialog.showModal();
            }
            else return;
        });

        add_todo_dialog.addEventListener('submit', e => {
            if (e.submitter.value === 'cancel') return;
            const todoName = document.getElementById('input_todo_name');
            if (todoName.value === ''){
                return;
            }
            this.handleAddTodo(todoName.value);
        });

        rename_project_dialog.addEventListener('submit', e => {
            if (e.submitter.value === 'cancel') return;
            const newProjectName = document.getElementById('input_new_project_name');
            if (newProjectName.value === '') return;
            this.handleRenameProject(newProjectName.value);
        })

        modify_project_dialog.addEventListener('close', e => {
            const value = modify_project_dialog.returnValue;
            if (value === 'rename'){
                rename_project_dialog.showModal();
            }
            else if (value === 'delete'){
                confirm_project_dialog.showModal();
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
            const priority_mark_btn = e.target.closest('.priority_mark_btn');
            if (priority_mark_btn){
                const task = priority_mark_btn.closest('.task');
                const todo = task.closest('.project_item');

                this.currentTodoID = todo.dataset.id;
                this.currentTaskID = task.dataset.id;

                this.handleTogglePriorityTask();
                return;
            }

            const modify_project_btn = e.target.closest('.modify_project_btn');
            if (modify_project_btn){
                this.currentProjectID = modify_project_btn.dataset.id;
                modify_project_dialog.showModal();
                return;
            }

            const add_task = e.target.closest('.add_task');
            if (add_task){
                const todo = add_task.closest('.project_item');
                this.currentTodoID = todo.dataset.id;
                add_task_dialog.showModal();
                return;
            }

            const edit_task_btn = e.target.closest('.edit_task_btn');
            if (edit_task_btn){
                const task = edit_task_btn.closest('.task');
                this.currentTaskID = task.dataset.id;

                const project_item = task.closest('.project_item');
                this.currentTodoID = project_item.dataset.id;

                this.fillEditTaskDialog();
                edit_option_dialog.showModal();
                return;
            }

            const modify_todo_btn = e.target.closest('.modify_todo_btn');
            if (modify_todo_btn){
                const project_item = modify_todo_btn.closest('.project_item');
                this.currentTodoID = project_item.dataset.id;
                modify_todo_dialog.showModal();
                return;
            }
        });

        confirm_project_dialog.addEventListener('close', e => {
            if (confirm_project_dialog.returnValue === 'yes'){
                this.handleDeleteProject();
            }
        });

        content.addEventListener('change', e => {
            const checkbox = e.target.closest('.task_checked');
            if (!checkbox) return;

            const task = checkbox.closest('.task');
            const todo = task.closest('.project_item');

            this.currentTodoID = todo.dataset.id;
            this.currentTaskID = task.dataset.id;

            this.handleToggleCheckListTask(checkbox.checked);
        });
    }

    handleTogglePriorityTask(){
        if (!this.currentProjectID || !this.currentTodoID || !this.currentTaskID) return;
        const project = this.PM.findProjectById(this.currentProjectID);
        const todo = this.TM.findTodoById(project, this.currentTodoID);
        const task = this.TM.findTaskById(todo, this.currentTaskID);

        task.priority = !task.priority;
        this.save();
        displayProject(this.currentProjectID);
    }

    handleToggleCheckListTask(isChecked){
        if (!this.currentProjectID || !this.currentTodoID || !this.currentTaskID) return;
        const project = this.PM.findProjectById(this.currentProjectID);
        const todo = this.TM.findTodoById(project, this.currentTodoID);
        const task = this.TM.findTaskById(todo, this.currentTaskID);

        task.checkList = isChecked;
        this.save();
        displayProject(this.currentProjectID);
    }

    handleDeleteTask(){
        if (!this.currentProjectID || !this.currentTodoID || !this.currentTaskID) return;
        const project = this.PM.findProjectById(this.currentProjectID);
        const todo = this.TM.findTodoById(project, this.currentTodoID);
        this.TM.deleteTaskById(todo, this.currentTaskID);

        this.save();
        displayProject(this.currentProjectID);
    }

    handleEditTask(newData){
        if (!this.currentProjectID || !this.currentTodoID || !this.currentTaskID) return;
        const project = this.PM.findProjectById(this.currentProjectID);
        const todo = this.TM.findTodoById(project, this.currentTodoID);
        const task = this.TM.findTaskById(todo, this.currentTaskID);

        this.TKM.modifyTask(task, newData);
        this.save();
        displayProject(this.currentProjectID);
    }

    fillEditTaskDialog(){
        const project = this.PM.findProjectById(this.currentProjectID);
        if (!project) return;

        const todo = this.TM.findTodoById(project, this.currentTodoID);
        if (!todo) return;

        const task = this.TM.findTaskById(todo, this.currentTaskID);
        if (!task) return;

        const form = document.querySelector('#edit_task_dialog form');

        form.elements['input_edit_task_title'].value = task.title || '';
        form.elements['input_edit_task_duedate'].value = task.dueDate || '';
        form.elements['input_edit_task_priority'].checked = !!task.priority;
        form.elements['input_edit_task_check'].checked = !!task.checkList;
    }

    handleMakeTask(title, dueDate, priority, checkList){
        if (!this.currentProjectID || !this.currentTodoID) return;

        const task = this.TKM.makeTask(title, dueDate, priority, checkList);
        const project = this.PM.findProjectById(this.currentProjectID);
        const todo = this.TM.findTodoById(project, this.currentTodoID);

        this.TM.addTask(todo, task);
        this.save();
        displayProject(this.currentProjectID);
    }

    handleDeleteTodo(){
        this.TM.deleteTodoById(this.PM.findProjectById(this.currentProjectID), this.currentTodoID);
        this.save();
        displayProject(this.currentProjectID);
    }

    handleRenameTodo(newName){
        const todo = this.TM.findTodoById(this.PM.findProjectById(this.currentProjectID), this.currentTodoID);
        this.TM.renameTodo(todo, newName);
        this.save();
        displayProject(this.currentProjectID);
    }

    handleAddTodo(todoName){
        if (!this.currentProjectID) return;
        const project = this.PM.findProjectById(this.currentProjectID);
        this.TM.addTodo(project, todoName);
        this.save();
        renderSidebar();
        displayProject(this.currentProjectID);
    }

    handleRenameProject(newProjectName){
        if (!this.currentProjectID) return;
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
        if (!this.currentProjectID) return;
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