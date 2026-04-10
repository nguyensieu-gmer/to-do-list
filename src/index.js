import { addDays } from "date-fns";
import { makeTask } from "./independencies/task.js";
import createProjectManage from "./independencies/project.js";

const mn = createProjectManage();

mn.addProject("code");
mn.addProject("gym");
const task1 = makeTask("leetcode", "i will finish greedy section", `${new Date()}`, "1", "it's too hard", true);
const task3 = makeTask("read technic book", "read elequeen", `${addDays(new Date(), 1)}`, "1", "no", true);
const task2 = makeTask("push up", "", `${new Date()}`, "1", "", false);
mn.addTaskOfProject("code", task1);
mn.addTaskOfProject("gym", task2);
mn.addTaskOfProject("code", task3);

console.log(mn.getProject());
localStorage.setItem("todolis", JSON.stringify(mn.getProject()));