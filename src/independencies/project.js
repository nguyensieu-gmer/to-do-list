export default function(){
    const projects = []; // project must doesn't have undefined

    // not duplicate project name
    const addProject = (projectsName) => {
        if (projects.find(ob => ob.project === projectsName))
            return; // Duplicate name error
        projects.push({project: projectsName, todos: []});
    }

    // able to duplicate todo name
    const addTodo = (projectsName, todoName) => {
        const project = projects.find(ob => ob.project === projectsName);
        if (project === undefined) 
            return; // Project with projectName isn't be found
        project.todos.push({todo: todoName, tasks: []});
    }

    // able to duplicate task
    const addTask = (projectName, todoName, task) => {
        const project = projects.find(ob => ob.project === projectName);
        if (project === undefined){
            return;// Project with projectName isn't be found
        }
        const todo = project.todos.find(ob => ob.todo === todoName);
        if (todo === undefined){
            return;//todo with todoName isn't be found
        }
        todo.tasks.push(task);
    }

    const getprojects = () => projects;

    return {
        addProject,
        addTodo,
        addTask,
        getprojects,
    }
}