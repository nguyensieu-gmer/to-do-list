import { ProjectManager } from './independencies/project.js';
import { TodoManager } from './independencies/todo.js';
import { TaskManager } from './independencies/task.js';
import { addDays, addHours, format } from 'date-fns';
import './style.css';

const PM = ProjectManager();
const TM = TodoManager();
const TKM = TaskManager();

