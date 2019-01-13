const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

// 해야할 일을 생성할 때마다 배열에 넣을거임
let toDos = [];

function deleteToDo(event){
    console.dir(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


function saveToDos(){
    // 그냥 localStorage.setItem(TODOS_LS, toDos); 를 써서 저장하면
    // key : toDos, value에 [object Object]로 저장되기 때문에 
    // JSON.stringify(toDos)를 써줘야 string으로 저장됨 object -> string
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDO(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDO(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // 그냥 불러오면 string 으로 불러오기 때문에 다시 Object로 바꿔서 불러줘야함
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
           paintToDO(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();