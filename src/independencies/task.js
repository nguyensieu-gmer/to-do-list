export function makeTask(title, description, dueDate, priority, notes, checkList){
    return {
        title,
        description,
        dueDate,
        priority,
        notes,
        checkList,
    }
}