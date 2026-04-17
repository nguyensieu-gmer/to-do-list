export function TodoManager(){
    //{projectName: name, id: crypto.randomUUID(), todos: []}
    //{todoName: name,id: crypto.randomUUID(), tasks: []}
    const addTodo = (project, todoName) => {
        const todo = {
            todoName: todoName,
            id: crypto.randomUUID(),
            tasks: []
        }
        project.todos.push(todo);
        return todo.id;
    }

    const findTodoById = (project, todoId) => {
        if (!project) return;
        const todo = project.todos.find(ob => ob.id === todoId);
        return todo; 
    }

    const renameTodo = (todo, newTodoName) => {
        if (!todo) return;
        todo.todoName = newTodoName;
    }

    const deleteTodoById = (project, todoId) => {
        if (!project) return;
        project.todos = project.todos.filter(item => item.id !== todoId);
    }

    const addTask = (todo, task) => {
        if (!todo) return;
        todo.tasks.push(task);
        return task.id;
    }

    const findTaskById = (todo, taskId) => {
        if (!todo) return;
        return todo.tasks.find(item => item.id === taskId);
    }

    const deleteTaskById = (todo, taskId) => {
        if (!todo) return;
        todo.tasks = todo.tasks.filter(item => item.id !== taskId);
    }

    return {
        addTodo,
        findTodoById,
        renameTodo, 
        deleteTodoById,

        addTask,
        findTaskById,
        deleteTaskById
    }
}