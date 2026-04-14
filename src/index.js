import manageProject from './independencies/project.js';
import { makeTask } from './independencies/task.js';
import { addHours, format } from 'date-fns';

let mn = manageProject();
mn.addProject("code");
mn.addTodo("code", "leetcode");
let task1 = makeTask("greedy", "first two of greedy section", `${format(addHours(new Date(), 10), 'MM/dd/yyyy')}`, true, "no note", false);
mn.addTask("code", "leetcode", task1);
mn.addProject("code");
mn.addTodo("leetcode");
mn.addTask('code', 'leetcode', task1);
mn.addProject('gym');
console.log(mn.getprojects());