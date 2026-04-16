import ManageProject from './independencies/project.js';
import { makeTask } from './independencies/task.js';
import { addDays, addHours, format } from 'date-fns';
import './style.css';

const MP = ManageProject();

const project = 'work out';
const todo = 'kalisthenic';
MP.addProject(project);
MP.addTodo(project, todo);
const task1 = makeTask('push up', '60 in 3 set', `${format(new Date(), 'MM/dd/yyyy')}`, true, 'none', false);
const task2 = makeTask('crunch', '60 in 3 set', `${format(new Date(), 'MM/dd/yyyy')}`, true, 'none', false);
const task3 = makeTask('squat', '60 in 3 set', `${format(new Date(), 'MM/dd/yyyy')}`, true, 'none', false);
MP.addTask(project, todo, task1);
MP.addTask(project, todo, task2);
MP.addTask(project, todo, task3);

localStorage.setItem("todolist", JSON.stringify(MP.getprojects()));

let projects = JSON.parse(localStorage.getItem('todolist'));
console.log(projects);

// const container = document.querySelector('.container');
// projects.forEach(item => {
//     const div = document.createElement('div');
//     const h1 = document.createElement('h1');
//     h1.textContent = `${item.project}`;
//     div.appendChild(h1);
//     item.todos.forEach(t => {
//         const h2 = document.createElement('h2');
//         h2.textContent = `${t.todo}`;
//         div.appendChild(h2);
//         const ul = document.createElement('ul');
//         t.tasks.forEach(ts => {
//             const li = document.createElement('li');
//             li.textContent = `${ts.title}`;
//             ul.appendChild(li);
//         })
//         div.appendChild(ul);
//     })
//     container.appendChild(div);
// })