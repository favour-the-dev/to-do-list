const form = document.querySelector('#form');
const taskinputfield = document.querySelector('#taskinput');
const taskCont = document.querySelector('#task-cont');


const tasklist = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(){
    const value = taskinputfield.value.trim();
     if(value){
        tasklist.push(value);
        localStorage.setItem('tasks', JSON.stringify(tasklist));
        displaytask()
        taskinputfield.value = ''
    }
}

function displaytask(){
    taskCont.innerHTML = '<h1 class="uppercase font-bold w-1/2 mx-auto text-center text-2xl text-gray-200 my-4">To-Do-List</h1>';
    tasklist.forEach(tasks=>{
        const task = document.createElement('div');
        task.innerHTML = `<div id="task" class="bg-white text-gray-800 p-4 rounded flex gap-2 items-center mb-4">
        <label class="flex">
            <input type="checkbox"id="checkbtn" class="checked">
        </label> 
        <p class="uppercase">${tasks}</p>
        <button class="bg-red-500 text-gray-200 text-sm px-2 rounded hover:bg-red-600" id="deletebtn">Delete</button>
        </div>`
        taskCont.appendChild(task)
    })
}


form.addEventListener('submit', e=>{
    e.preventDefault();
    addTask()
})


displaytask()

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('bg-red-500')){
        const delbtn = e.target;
        const taskparent = delbtn.parentElement;
        tasklist.forEach((ta, index)=>{
            if(taskparent.querySelector('p').textContent === ta){
                taskparent.classList.add('hidden');
                tasklist.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasklist));
            }
        })
    }

    if(e.target.classList.contains('checked')){
        if(e.target.checked){
            const parenttask = e.target.parentElement.parentElement;
            const paragraph = parenttask.querySelector('p');
            paragraph.classList.add('line-through')
        }else{
            const parenttask = e.target.parentElement.parentElement;
            const paragraph = parenttask.querySelector('p');
            paragraph.classList.remove('line-through')
        }
    }
})