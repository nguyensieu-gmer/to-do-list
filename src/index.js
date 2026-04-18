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

// function handleProjectEdit(){
//     const Add_project = document.getElementById('Add_project');
//     Add_project.addEventListener('click', e => {

//     });
// }
  
addDefault();
screenController();