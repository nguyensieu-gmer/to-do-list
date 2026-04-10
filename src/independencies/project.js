// datastructure

// projects:Object { name of project as keys
//     tasks:Array [
//          todo:Object {
//              title,
//              description,
//              etc....,
//          }
//     ]
// }

export default () => {
    const projects = {}; 

    const addProject = (nameOfProject) => {
        projects[nameOfProject] = [];
    }
    const addTaskOfProject = (nameOfProject, task) => {
        if (!(nameOfProject in projects)) return;
        projects[nameOfProject].push(task);
    }

    const getProject = () => {
        return projects;
    }

    return {
        addProject,
        addTaskOfProject,
        getProject,
    }
}