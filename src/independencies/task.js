export const makeTask = (title, description, dueDate, priority, notes, checkList) => {
    return {
        id: crypto.randomUUID(),
        title, 
        description,
        dueDate,
        priority,
        notes,
        checkList
    }
}