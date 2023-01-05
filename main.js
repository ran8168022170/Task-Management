let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();



// social



let form1 = document.getElementById("form1");
console.log(form1);
let input1 = document.getElementById("input");
let msg1 = document.getElementById("msg1");
let posts = document.getElementById("posts");

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation1();
});

let formValidation1 = () => {
  if (input1.value === "") {
    msg1.innerHTML = "Post cannot be blank";
    console.log("failure");
  } else {
    console.log("successs");
    msg1.innerHTML = "";
    acceptData1();
  }
};

let data1 = {};

let acceptData1 = () => {
  data1["text"] = input1.value;
  console.log(data1);
  createPost();
};

let createPost = () => {
  posts.innerHTML += `
  <div class="styling">
    <p>${data1.text}</p>
    <span class="options">
      <i onClick="editPost(this)" class="fas fa-edit"></i>
      <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;
  input1.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};

let editPost = (e) => {
  input1.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};


//important

var input = document.querySelector('.todo_input');
var MainTodoContainer = document.getElementById('todos')
var addingButton = document.querySelector('.add-item');
var deleteAllBtn = document.querySelector('.deleteBtn');
var completedButton = document.querySelector('.completed');
var removeButton = document.querySelector('.trash');

addingButton.addEventListener('click', function(e){
    /* stoping button behaviour */
    e.preventDefault();
    
    /* Create all the elements */
    if(input.value.trim()){
        /* UL Tag */
        var ulTag = document.createElement('ul');
        ulTag.classList.add('todo-list-container');
        /* Todo list div */
        var todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        /* LI Tag */
        var liTag = document.createElement('li');
        liTag.innerText = input.value;
        liTag.classList.add('todo-item');
        /* Button Div */
        var buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button');
        /* completed button element1 */
        var completeButton = document.createElement('button');
        completeButton.classList.add('completed');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        /* Edit Button */
        var editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';
        editBtn.classList.add('editBtn');
        editBtn.onclick = function(){
            editWorking(liTag);
        }
        /* trash button element2 */
        var trashButton = document.createElement('button');
        trashButton.classList.add('trash');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    
        /* Appending Elements into each other */
        ulTag.appendChild(todoList);
        todoList.appendChild(liTag);
        todoList.appendChild(buttonDiv);
        buttonDiv.appendChild(completeButton);
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(trashButton);
    
        /* if input is empty then don't display empty list in DOM */
        MainTodoContainer.appendChild(ulTag);

            /* sessionStorage */
        /* when the add button click clear the input value */
        input.value = '';
        /* complete and trash button working */
        todoList.addEventListener('click', function(e){
            var items = e.target;
            if(items.classList[0] === 'completed'){
                var todo = items.parentElement;
                var todo2 = todo.parentElement;
                todo2.classList.add('line_through')
            }
            else if(items.classList[0] === 'trash'){
                var todo = items.parentElement;
                var todo2 = todo.parentElement;
                todo2.classList.add('fall');
                todo2.addEventListener('transitionend', function(){
                    var todo3 = todo2.parentElement;
                    todo3.remove();
                });
            }
        });
    }else if(input.value === ''){
        alert('please fill the input field')
    }
});


function editWorking(e){
    var editValue = prompt('edit the select item', e.firstChild.nodeValue);
    e.firstChild.nodeValue = editValue;
}
function deleteAllElements(){
    var gettingUlTag = document.querySelectorAll('.todo-list-container');
    for(var i = 0; i < gettingUlTag.length; i++){
        gettingUlTag[i].remove();
    }
    input.value = '';
}

