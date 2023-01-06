let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


form.onsubmit = e => {
    e.preventDefault();

    if (textInput.value === "") {
            console.log("failure");
            msg.innerHTML = "Task cannot be blank";
          } else {
            console.log("success");
            msg.innerHTML = "";
            const newTask = addTask(
                textInput.value,
                
                textarea.value
            );
          
            createTasks(newTask);
            
            add.setAttribute("data-bs-dismiss", "modal");
            add.click();
        
            (() => {
              add.setAttribute("data-bs-dismiss", "");
            })();


  
    
  
    
  }
};



let data = [{}];

const addTask = (text, description) => {
    data.push({
      text,
      description,
      
    });
  
    localStorage.setItem("data", JSON.stringify(data));
  
    return { text, description };
  };
  



const createTasks = ({text,description}) => {

    console.log("creat data invoked");
    // Create elements
    const taskDiv = document.createElement("div");

    taskDiv.classList.add("hello");
    taskDiv.setAttribute('draggable', true);
    taskDiv.addEventListener('dragstart',dragStart);
    taskDiv.addEventListener('dragend',dragEnd);
    const taskName = document.createElement("h2");
    const taskDesc = document.createElement("p");


    
  
    // Fill the content
    taskName.innerText = text;
    taskDesc.innerText = description;
    
  
    // Add to the dom
    taskDiv.append(taskName, taskDesc);
    tasks.appendChild(taskDiv);



    textInput.value = "";
  
    textarea.value = "";
  
    
  };

//data.forEach(createTasks);

for (let i = 1; i < data.length; i++) {
    var a=data[i].text;
    var b=data[i].description;
    createTasks({a,b});

}
var div=document.querySelectorAll('.hello');
var app=document.querySelectorAll('.app');
dragItem=null;



for(var i of div){
    
    i.addEventListener('dragstart',dragStart);
    i.addEventListener('dragend',dragEnd);
}
function dragStart(ev){
    dragItem=this;
    console.log("invoked dragStart ");
    setTimeout(()=>this.style.display="none",0);


}
function dragEnd(){
    console.log("invoked dragEnd ");
    setTimeout(()=>this.style.display="block",0);
    dragItem=null;
}

for(j of app){
    j.addEventListener('dragover',dragOver)
    j.addEventListener('dragenter',dragEnter)
    j.addEventListener('dragleave',dragleave)
    j.addEventListener('drop',Drop)
}

function Drop(){
    console.log("Drop invoked");
    this.append(dragItem);
}

function dragOver(e){
    console.log("dragOver invoked");
e.preventDefault();
this.style.border="2px dotted cyan";


}

function dragEnter(e){

    console.log("dragEnter invoked")

    e.preventDefault();


}
function dragleave(){
    console.log("dragleave invoked")
    this.style.border="none";

}




let resetForm = () => {
  textInput.value = "";

  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log("here data "+data.length);
  
})();