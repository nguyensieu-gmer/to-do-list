import { ProjectManager } from './independencies/project.js';
import { TodoManager } from './independencies/todo.js';
import { TaskManager } from './independencies/task.js';
import { displayLocalStorage } from './independencies/screen.js';
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
    displayLocalStorage();
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function handleProjectEdit(){
    const Add_project = document.getElementById('Add_project');
    const Add_project_dialog = document.getElementById('Add_project_dialog');
    Add_project.addEventListener('click', e => {
        e.preventDefault();
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
        if (!newName){
            Add_project_dialog.close();
            return;
        }
            
        PM.addProject(newName);
        saveToLocalStorage('todolist', PM.getprojects());
        displayLocalStorage();
        Add_project_dialog.close();
    });
}

handleProjectEdit();
init();