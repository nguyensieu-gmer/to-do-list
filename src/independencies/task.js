export function TaskManager(){
    const makeTask = (title, dueDate, priority, checkList) => {
        return {
            id: crypto.randomUUID(),
            title, 
            dueDate,
            priority,
            checkList
        }
    }
    const modifyTask = (task, newData) => {
        if (!task) return;
        Object.assign(task, newData);
    }

    return {
        makeTask,
        modifyTask
    }
}