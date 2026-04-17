import { ManageProject } from './independencies/project.js';
import { makeTask } from './independencies/task.js';
import { addDays, addHours, format } from 'date-fns';
import './style.css';

function addDefault(){
    const MP = ManageProject();
    const project = 'work out';
    const todo = 'kalisthenic';
    let pId = MP.addProject(project);
    let tId = MP.addTodo(pId, todo);
    const task1 = makeTask('push up', '12:30', true, false);
    const task2 = makeTask('crunch', '10:00', true, false);
    const task3 = makeTask('squat', '13:30', true, false);
    MP.addTask(pId, tId, task1);
    MP.addTask(pId, tId, task2);
    MP.addTask(pId, tId, task3);

    console.log(MP.getprojects())
    // localStorage.setItem("todolist", JSON.stringify(MP.getprojects()));
}

addDefault();

// let projectList = JSON.parse(localStorage.getItem('todolist'));
// console.log(projectList);

// function addProjectNameToSideBar(){
//     const projectsUi = document.getElementById('projects');
//     projectList.forEach(project => {
//         const btn = document.createElement('button');
//         btn.classList.add('sidebar_item');
//         const i = document.createElement('i');
//         i.classList.add('ri-task-line');
//         const para = document.createElement('p');
//         para.textContent = `${project.project}`;
//         btn.appendChild(i);
//         btn.appendChild(para);
//         projectsUi.appendChild(btn);
//     });
// }

// addProjectNameToSideBar();
