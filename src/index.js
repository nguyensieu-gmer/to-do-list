import ManageProject from './independencies/project.js';
import { makeTask } from './independencies/task.js';
import { addDays, addHours, format } from 'date-fns';
import './style.css';

function addDefault(){
    const MP = ManageProject();
    const project = 'work out';
    const todo = 'kalisthenic';
    MP.addProject(project);
    MP.addTodo(project, todo);
    const task1 = makeTask('push up', '12:30', true, false);
    const task2 = makeTask('crunch', '10:00', true, false);
    const task3 = makeTask('squat', '13:30', true, false);
    MP.addTask(project, todo, task1);
    MP.addTask(project, todo, task2);
    MP.addTask(project, todo, task3);
    localStorage.setItem("todolist", JSON.stringify(MP.getprojects()));
}

addDefault();

let todolist = JSON.parse(localStorage.getItem('todolist'));
console.log(todolist);

const projectsUi = document.getElementById('projects');
projects.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('sidebar_item');
});
