export function ManageProject(){
    let projects = []; // project must doesn't have undefined
    //{project: projectName, id: crypto.randomUUID(), todos: []}
    //{todo: todoName,id: crypto.randomUUID(), tasks: []}

    // undefined if not found and ob if contrast
    const findProject = (projectId) => {
        const project = projects.find(ob => ob.id === projectId);
        return project; 
    }

    const renameProject = (projectId, newProjectName) => {
        const targetProject = findProject(projectId);
        if (targetProject === undefined) 
            return; // projectName not be found
        targetProject.project = newProjectName;
    }

    // not able duplicate project name
    const addProject = (projectName) => {
        const project = {project: projectName, id: crypto.randomUUID(), todos: []};
        projects.push(project);
        return project.id;
    }

    const deleteProject = (projectId) => {
        projects = projects.filter(item => item.id !== projectId);
    }

    // undefined if not found and ob if contrast
    const findTodo = (projectId, todoId) => {
        const project = findProject(projectId);
        if (project === undefined) return;
        const todo = project.todos.find(ob => ob.id === todoId);
        return todo; 
    }

    const renameTodo = (projectId, todoId, newTodoName) => {
        const targetTodo = findTodo(projectId, todoId);
        if (targetTodo === undefined)
            return; // todoName not be found
        targetTodo.todo = newTodoName;
    }

    // not be able to duplicate todo name
    const addTodo = (projectId, todoName) => {
        const project = findProject(projectId);
        if (project === undefined) 
            return; // Project with project id isn't be found
        let todo = {todo: todoName,id: crypto.randomUUID(), tasks: []};
        project.todos.push(todo);
        return todo.id;
    }

    const deleteTodo = (projectId, todoId) => {
        let project = findProject(projectId);
        if (!project) return;
        project.todos = project.todos.filter(item => item.id !== todoId);
    }

    // able to duplicate task
    const addTask = (projectId, todoId, task) => {
        const project = findProject(projectId);
        if (project === undefined){
            return;// Project with projectName isn't be found
        }
        const todo = findTodo(projectId, todoId);
        if (todo === undefined){
            return;//todo with todoName isn't be found
        }
        todo.tasks.push(task);
    }

    const findTaskById = (projectId, todoId, taskId) => {
        const todo = findTodo(projectId, todoId);
        if (!todo) return; // not found todo
        return todo.tasks.find(item => item.id === taskId);
    }

    const modifyTask = (task, title, dueDate, priority, checkList) => {
        if (!task) return;
        let newData = {
            title,
            // description,
            dueDate,
            priority,
            // notes,
            checkList
        };
        Object.assign(task, newData);
    }

    const deleteTask = (projectId, todoId, taskId) => {
        let todo = findTodo(projectId, todoId);
        if (!todo) return;
        todo.tasks = todo.tasks.filter(item => item.id !== taskId);
    }
    
    const getprojects = () => JSON.parse(JSON.stringify(projects));

    return{
        getprojects,
        renameProject,
        renameTodo,
        addProject, 
        addTodo,
        addTask,
        findTaskById,
        modifyTask,
        deleteProject,
        deleteTodo,
        deleteTask,
    }
}