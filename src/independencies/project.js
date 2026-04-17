export function ProjectManager(){
    let projects = []; // project must doesn't have undefined
    //{projectName: name, id: crypto.randomUUID(), todos: []}
    //{todoName: name, id: crypto.randomUUID(), tasks: []}

    // not able duplicate project name
    const addProject = (projectName) => {
        const project = {
            projectName: projectName,
            id: crypto.randomUUID(),
            todos: []
        };
        projects.push(project);
        return project.id;
    }

    const findProjectById = (projectId) => {
        const project = projects.find(ob => ob.id === projectId);
        return project; 
    }

    const renameProjectById = (projectId, newProjectName) => {
        const project = findProjectById(projectId);
        if (!project) 
            return;
        project.projectName = newProjectName;
    }

    const deleteProjectById = (projectId) => {
        projects = projects.filter(item => item.id !== projectId);
    }
    
    const getprojects = () => JSON.parse(JSON.stringify(projects));

    return{
        addProject, 
        findProjectById, 
        renameProjectById, 
        deleteProjectById, 
        getprojects
    }
}