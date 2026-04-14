export default function(){
    let projects = []; // project must doesn't have undefined

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

    const renameProject = (projectName, newProjectName) => {
        const targetProject = findProject(projectName);
        if (targetProject === undefined) 
            return; // projectName not be found
        targetProject.project = newProjectName;
    }

    const renameTodo = (projectName, todoName, newTodoName) => {
        const targetTodo = findTodo(projectName, todoName);
        if (targetTodo === undefined)
            return; // todoName not be found
        targetTodo.todo = newTodoName;
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

    const findTaskById = (projectName, todoName, taskId) => {
        const todo = findTodo(projectName, todoName);
        if (!todo) return; // not found todo
        return todo.tasks.find(item => item.id === taskId);
    }

    const modifyTask = (task, title, description, dueDate, priority, notes, checkList) => {
        if (!task) return;
        let newData = {
            title,
            description,
            dueDate,
            priority,
            notes,
            checkList
        };
        Object.assign(task, newData);
    }

    const deleteProject = (projectName) => {
        projects = projects.filter(item => item.project !== projectName);
    }

    const deleteTodo = (projectName, todoName) => {
        let project = findProject(projectName);
        if (!project) return;
        project.todos = project.todos.filter(item => item.todo !== todoName);
    }

    const deleteTask = (projectName, todoName, taskId) => {
        let todo = findTodo(projectName, todoName);
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