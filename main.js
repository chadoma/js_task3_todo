//全てのTodoList
const todos = [];

elements = {
  addItemInput: document.querySelector('.add_item_input'),
  addTaskBtn: document.querySelector('.add_item_btn'),
  todoItems: document.querySelector('.todo_table_items'),
  todoList: document.querySelector('.todo_list'),
  todoTable: document.querySelector('.todo_table'),
}

//addTaskBtnを押すと発火
elements.addTaskBtn.addEventListener('click', (e) => {

//todolistを作成する関数
  addTodoItems();
//htmlにtodoListを表示する関数
  showTodoItems();
//input入力をresetする関数
  resetInput();

});


//input入力をresetする関数
const resetInput = () => {
  elements.addItemInput.value = '';
}


//todolistを作成する関数
const addTodoItems = () => {
  let todo = elements.addItemInput.value.trim();
  if (todo) {
    todos.push(todo);
  }else
    console.log('aaaaa');
}

//Htmlにtodolistを表示する関数
const showTodoItems = () => {
  let html, newHtml;
  // 重複表示を防止
  while (elements.todoItems.firstChild) {
    elements.todoItems.removeChild(elements.todoItems.firstChild);
  }

  todos.forEach((todo, index)=>{
    let state = '作業中';
    let table = elements.todoItems;
    let newRow = table.insertRow();
    //各々セルに対する、データを作成
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(index + 1);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(todo);
    newCell.appendChild(newText);

    const stateButton = document.createElement('button');
    stateButton.textContent = state;
    newCell = newRow.insertCell();
    newCell.appendChild(stateButton);

    //todolistを消すbuttonを作成
    const deleteButton = document.createElement("button");
    deleteButton.textContent = '削除';

    newCell = newRow.insertCell();
    newCell.appendChild(deleteButton);

    deleteButton.addEventListener('click', ()=>{
      //todoListを消す関数
      // deleteTodoItem(index);
    });

  });

}

// //todoItemを消す関数
// const deleteTodoItem = (index)=>{
//   todos.splice(index, 1);
//   showTodoItems();
// }
//
//
