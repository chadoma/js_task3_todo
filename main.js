//全てのTodoList
const todos = [];

elements = {
  addItemInput: document.querySelector('.add_item_input'),
  addTaskBtn: document.querySelector('.add_item_btn'),
  todoItems: document.querySelector('.todo_table_items'),
  todoList: document.querySelector('.todo_list'),
  todoTable: document.querySelector('.todo_table')
};

//addTaskBtnを押すと発火
elements.addTaskBtn.addEventListener('click', () => {

//todolistを作成する関数
  createTodoItems();
//htmlにtodoListを表示する関数
  showTodoItems();
//input入力をresetする関数
  resetInput();

});


//input入力をresetする関数
const resetInput = () => {
  elements.addItemInput.value = '';
};


//todolistを作成する関数
const createTodoItems = () => {
  const todo = elements.addItemInput.value.trim();
  if (todo) {
    todos.push({
      content: todo,
      state: false
    });
  }
};
//Htmlにtodos[]を表示する関数
const showTodoItems = () => {

  // 重複表示を防止
  while (elements.todoItems.firstChild) {
    elements.todoItems.removeChild(elements.todoItems.firstChild);
  }

  todos.forEach((todo, index) => {
    const table = elements.todoItems;
    const newRow = table.insertRow();

    //各々セルに対する、データを作成
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(index + 1);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(todo.content);
    newCell.appendChild(newText);

    const stateButton = document.createElement('button');
    stateButton.addEventListener('click', () => {
      toggleButton(stateButton, todo.state);
    });
    stateButton.textContent = todo.state ? '完了' : '作業中';
    newCell = newRow.insertCell();
    newCell.appendChild(stateButton);

    //todolistを消すbuttonを作成
    const deleteButton = document.createElement("button");
    deleteButton.textContent = '削除';
    newCell = newRow.insertCell();
    newCell.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      // todoListを消す関数
      deleteTodoItem(index);
    });

  });

};

// todoItemを消す関数
const deleteTodoItem = (index) => {
  todos.splice(index, 1);
  showTodoItems();
};

const toggleButton = (button, state) => {
  state = !state;
  console.log(state);
  button.textContent = state;
};


