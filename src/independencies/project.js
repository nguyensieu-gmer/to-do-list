export default function(){
    const projects = []; // project must doesn't have undefined

    // undefined if not found and ob if contrast
    const findProject = (projectName) => {
        const project = projects.find(ob => ob.project === projectName);
        return project; 
    }

    // undefined if not found and ob if contrast
    const findTodo = (projectName, todoName) => {
        const project = findProject(projectName);
        if (project === undefined) return;
        const todo = project.todos.find(ob => ob.todo === todoName);
        return todo; 
    }

    // not able duplicate project name
    const addProject = (projectName) => {
        //duplicate project name case
        if (findProject(projectName) !== undefined) return;
        projects.push({project: projectName, todos: []});
    }

    // not be able to duplicate todo name
    const addTodo = (projectName, todoName) => {
        const project = findProject(projectName);
        if (project === undefined) 
            return; // Project with projectName isn't be found
        if (findTodo(projectName, todoName) !== undefined){
            return; // duplicate todo
        }
        project.todos.push({todo: todoName, tasks: []});
    }

    // able to duplicate task
    const addTask = (projectName, todoName, task) => {
        const project = findProject(projectName);
        if (project === undefined){
            return;// Project with projectName isn't be found
        }
        const todo = findTodo(projectName, todoName);
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

// write existed project and existed tode