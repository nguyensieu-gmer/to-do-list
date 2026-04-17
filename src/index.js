import { ProjectManager } from './independencies/project.js';
import { TodoManager } from './independencies/todo.js';
import { TaskManager } from './independencies/task.js';
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
    const task = TKM.makeTask('push up', '12:00', true, false);
    TM.addTask(findTodo, task);
    localStorage.setItem('todolist', JSON.stringify(PM.getprojects()));
}

addDefault();