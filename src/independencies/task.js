export const makeTask = (title, dueDate, priority, checkList) => {
    return {
        id: crypto.randomUUID(),
        title, 
        // description,
        dueDate,
        priority,
        // notes,
        checkList
    }
}