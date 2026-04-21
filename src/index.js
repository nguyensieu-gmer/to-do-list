import { ProjectManager } from './independencies/project.js';
import { TodoManager } from './independencies/todo.js';
import { TaskManager } from './independencies/task.js';
import { screenController } from './independencies/screen.js';
import { addDays, addHours, format } from 'date-fns';
import './style.css';

const PM = ProjectManager();
const TM = TodoManager();
const TKM = TaskManager();

function addDefault(){
    const projectId = PM.addProject('Work out');
    const project = PM.findProjectById(projectId);
    const todoId = TM.addTodo(project, 'calisthenic');
    const findTodo = TM.findTodoById(project, todoId);
    const task1 = TKM.makeTask('push up', '12:00', true, false);
    const task2 = TKM.makeTask('squat', '5:00', false, false);
    const task3 = TKM.makeTask('crunch', '6:00', false, true);
    TM.addTask(findTodo, task1);
    TM.addTask(findTodo, task2);
    TM.addTask(findTodo, task3);
    localStorage.setItem('todolist', JSON.stringify(PM.getprojects()));
}

function init(){
    const data = JSON.parse(localStorage.getItem('todolist'));
    
    if (data){
        PM.setProject(data);
    }
    else{
        addDefault();
    }
    screenController().init();
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function saveToDoList(){
    saveToLocalStorage('todolist', PM.getprojects());
}

function handleProjectEdit(){
    const Add_project_dialog = document.getElementById('Add_project_dialog');
    const modify_project_dialog = document.getElementById('modify_project_dialog');
    const content = document.querySelector('.content');
    const Add_project = document.getElementById('Add_project');
    const confirm_dialog = document.getElementById('confirm_dialog');
    const rename_dialog = document.getElementById('rename_dialog');
    const add_todo_dialog = document.getElementById('add_todo_dialog');

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

    const addTodo = (projectId, todoName) => {
        const project = PM.findProjectById(projectId);
        TM.addTodo(project, todoName);
        saveToDoList();
    }

    add_todo_dialog.addEventListener('submit', e => {
        if (e.submitter.value === 'cancel') return;
        const input_todo_name = document.getElementById('input_todo_name');
        if (input_todo_name.value === ''){
            return;
        }
        addTodo(Add_project_dialog.dataset.id, input_todo_name.value);
        screenController().init();
    });

    const deleteProject = (projectId) => {
        PM.deleteProjectById(projectId);
        saveToDoList();
    }

    confirm_dialog.addEventListener('close', e => {
        const value = confirm_dialog.returnValue;
        if (value === 'yes'){
            deleteProject(Add_project_dialog.dataset.id);
            screenController().init();
        }
    });

    rename_dialog.addEventListener('submit', e => {
        if (e.submitter.value === 'cancel') return;
        const input_new_project_name = document.getElementById('input_new_project_name');
        if (input_new_project_name === '') return;
        renameProject(Add_project_dialog.dataset.id, input_new_project_name.value);
        screenController().init();
    })

    const renameProject = (projectId, newName) => {
        PM.renameProjectById(projectId, newName);
        saveToDoList();
    }

    content.addEventListener('click', e => {
        const btn = e.target.closest('.modify_project_btn');
        if (!btn) return;

        Add_project_dialog.dataset.id = btn.dataset.id;
        modify_project_dialog.showModal();
    });

    Add_project.addEventListener('click', e => {
        Add_project_dialog.showModal();
    });

    Add_project.addEventListener('click', e => {
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
            
        const project_id = PM.addProject(newName);
        saveToDoList();
        screenController().init();
        screenController().displayProject(project_id);
        Add_project_dialog.close();
    });
}

handleProjectEdit();
init();