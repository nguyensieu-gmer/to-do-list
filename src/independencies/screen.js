export function displayLocalStorage(){
    let todolist = JSON.parse(localStorage.getItem('todolist')) || [];

    function makeProjectBtn(projectId, projectName){
        const btn = document.createElement('button');
        btn.classList.add('sidebar_item');
        btn.dataset.id = projectId;
        const i = document.createElement('i');
        i.classList.add('ri-task-line');
        const p = document.createElement('p');
        p.textContent = projectName;
        btn.appendChild(i);
        btn.appendChild(p);
        return btn;
    }

    function displayProjectToSideBar(){
        const projectList = document.getElementById('projectList');
        projectList.innerHTML = '';
        todolist.forEach(project => {
            const btn = makeProjectBtn(project.id, project.projectName);
            projectList.appendChild(btn)
        });
    }

    const makeProjectName = (projectName) => {
        const div = document.createElement('div');
        div.classList.add('project_name');
        const h1 = document.createElement('h1');
        h1.textContent = projectName;
        div.appendChild(h1);
        const btn = document.createElement('button');
        btn.classList.add('btn');
        const i = document.createElement('i');
        i.classList.add('ri-more-fill');
        i.classList.add('add');
        btn.appendChild(i);
        div.appendChild(btn);
        return div;
    }

    const makeTodoName = (todoName) => {
        const div = document.createElement('div');
        div.classList.add('todo_name');
        const h2 = document.createElement('h2');
        h2.textContent = todoName;
        const btn = document.createElement('button');
        btn.classList.add('btn');
        const i = document.createElement('i');
        i.classList.add('ri-more-fill');
        i.classList.add('add');
        btn.appendChild(i);

        div.appendChild(h2);
        div.appendChild(btn);
        return div;
    }

    const makeTodoTask = (todo) => {
        const div = document.createElement('div');
        const todo_name = makeTodoName(todo.todoName);
        const ultask = makeTodoUl(todo.tasks);
        div.dataset.id = todo.id;
        div.appendChild(todo_name);
        div.appendChild(ultask);
        return div;
    }

    function makeTodoUl(tasks){
        const ul = document.createElement('ul');
        const makeFirstDiv = (checkList) => {
            const div = document.createElement('div');
            div.classList.add('first');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = checkList ? true : false;
            div.appendChild(input);
            return div;
        }
        const makeSecondDiv = (title, dueDate) => {
            const div = document.createElement('div');
            div.classList.add('second');
            const content = document.createElement('p');
            content.classList.add('title');
            content.textContent = title;
            div.appendChild(content);
            const time = document.createElement('p');
            time.classList.add('time');
            const i = document.createElement('i');
            i.classList.add('ri-time-fill');
            time.appendChild(i);
            time.append(` ${dueDate}`);
            div.appendChild(time);
            return div;
        }
        const makeThirdDiv = (priority) => {
            const div = document.createElement('div');
            div.classList.add('third');
            const btn1 = document.createElement('button');
            btn1.classList.add('btn');
            if (priority) btn1.classList.add('priority')
            const i1 = document.createElement('i');
            i1.classList.add('ri-poker-hearts-fill');
            btn1.appendChild(i1);
            div.appendChild(btn1);
            const btn2 = document.createElement('button');
            btn2.classList.add('btn');
            btn2.textContent = 'edit';
            const i2 = document.createElement('i');
            i2.classList.add('ri-hashtag');
            btn2.appendChild(i2);
            div.appendChild(btn2);
            return div;
        }
        function makeLi(item){
            const li = document.createElement('li');
            li.classList.add('task');
            li.dataset.id =  item.id;

            const first = makeFirstDiv(item.checkList);
            li.appendChild(first);

            const second = makeSecondDiv(item.title, item.dueDate);
            li.appendChild(second);

            const third = makeThirdDiv(item.priority);
            li.appendChild(third);
            return li;
        }
        tasks.forEach(item => {
            const li = makeLi(item);
            ul.appendChild(li);
        })
        const addbtn = makeAddTodoBtn();
        ul.appendChild(addbtn);
        return ul;
    }

    const makeAddTodoBtn = () => {
        const li = document.createElement('li');
        li.classList.add('task');
        const btn = document.createElement('button');
        btn.classList.add('add_todo');
        const i = document.createElement('i');
        i.classList.add('ri-add-circle-fill');
        btn.appendChild(i);
        const p = document.createElement('p');
        p.textContent = 'Add task';
        btn.appendChild(p);
        li.appendChild(btn);
        return li;
    }   

    function displayProject(id){
        const content = document.querySelector('.content');
        content.innerHTML = '';

        const project = todolist.find(item => item.id === id);

        if (!project){
            console.error('project not found!');
            return;
        }
        const project_name = makeProjectName(project.projectName); 
        content.appendChild(project_name);

        project.todos.forEach(todo => {
            const div = makeTodoTask(todo);
            content.appendChild(div);
        });
    }

    function displayTodo(){
        const projectUI = document.getElementById('projects');
        projectUI.addEventListener('click', e => {
            const btn = e.target.closest('.sidebar_item');
            if (!btn) return;
            const id = btn.dataset.id;
            if (!id){
                console.error('not found id');
                return;
            }
            displayProject(id);
        });
    }

    function displayWorkout(){
        const workout = todolist.find(item => item.projectName === 'Work out');
        if (!workout) return;

        displayProject(workout.id);
    }

    displayWorkout();
    displayTodo();
    displayProjectToSideBar();
}