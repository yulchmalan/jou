const newTaskInput = document.getElementById('newTaskInput');
const taskList = document.getElementById('taskList');
const showAllBtn = document.getElementById('showAll');
const showCompletedBtn = document.getElementById('showCompleted');
const showUncompletedBtn = document.getElementById('showUncompleted');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const renderTasks = (filter = 'all') => {
    taskList.innerHTML = '';
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'uncompleted') {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        const span = document.createElement('span');
        span.textContent = `${task.text} (${task.date})`;
        span.ondblclick = () => editTask(task.id, span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = () => deleteTask(task.id);

        if (!task.completed) li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
};

const addTask = (text) => {
    const now = new Date();
    const date = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    tasks.push({ id: Date.now(), text, date, completed: false });
    saveTasks();
    renderTasks();
};

const toggleTask = (id) => {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
};

const editTask = (id, span) => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            task.text = input.value;
            saveTasks();
            renderTasks();
        }
    };
    span.replaceWith(input);
    input.focus();
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

newTaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && newTaskInput.value.trim()) {
        addTask(newTaskInput.value.trim());
        newTaskInput.value = '';
    }
});

showAllBtn.onclick = () => renderTasks('all');
showCompletedBtn.onclick = () => renderTasks('completed');
showUncompletedBtn.onclick = () => renderTasks('uncompleted');

renderTasks();
