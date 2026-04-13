import manageProject from './independencies/project.js';
import { makeTask } from './independencies/task.js';
import { addHours, addQuarters } from 'date-fns';

let mn = manageProject();
mn.addProject("code");
mn.addTodo("code", "leetcode");
let task1 = makeTask("greedy", "first two of greedy section", `${addHours(new Date(), 10)}`, true, "no note", false);
mn.addTask("code", "leetcode", task1);
mn.addProject("code");
mn.addTodo("code", "leetcode");
console.log(mn.getprojects())