// Set time in TODO list
function getTime(){
    let time = new Date().toLocaleTimeString();
    let date = new Date().toDateString();
    document.getElementById("time").innerHTML=time;
    document.getElementById("date").innerHTML=date;
}
setInterval(getTime, 100);

//to access the input box
const addInput = document.querySelector('#task-addition');

//to access the add button movement
const form = document.querySelector('.add-task');

//to access the output div
const output = document.querySelector('.output');

//to access error div
const error = document.querySelector('.error');

let todos = [];

const loadPage = () =>{
  window.location.reload()
}

//make letiable to access todos data from local storage
const storageTodos = JSON.parse(localStorage.getItem('todos'));

//first update your todos array if there is any element in storageTodos
if(storageTodos){
    todos=storageTodos;
}

//If todos is empty then show the error
if(todos.length===0){
  console.log(error);
    error.innerHTML='Nothing is in TODO list';
    error.style.display="block";
}

//This loop is creating a list then adding todos data to list
for(let i=0;i<todos.length;i++){
    let li = document.createElement('li');
    let inputValue = todos[i];
    let text = document.createTextNode(inputValue);
    li.appendChild(text);
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u2421");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    output.appendChild(li);
}

function newElement(e){
    e.preventDefault();
    error.innerHTML = null;
    let li = document.createElement('li');
    let inputValue = addInput.value;
    let text = document.createTextNode(inputValue);
    li.appendChild(text);
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u2421");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    if(inputValue===''){
        alert("You must write something!");
    }
    else{
        output.appendChild(li);
        todos.push(inputValue);
        localStorage.setItem('todos',JSON.stringify(todos));
    }
    addInput.value = '';
    loadPage();
}

form.addEventListener('submit',newElement);


// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
    todos.splice(i, i+1)
    localStorage.setItem('todos', JSON.stringify(todos));
    loadPage();
  }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ol');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'li') {
    ev.target.classList.toggle('checked');
  }
}, false);