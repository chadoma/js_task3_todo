//全てのTodoList
const todos = [];

elements = {
  addItemInput: document.querySelector('.add_item_input'),
  addTaskBtn: document.querySelector('.add_item_btn'),
  todoItems: document.querySelector('.todo_table_items'),
  todoList: document.querySelector('.todo_list'),
  todoTable: document.querySelector('.todo_table'),
  todoStateBtn: document.querySelector('.todo_state_btn')
};


//addTaskBtnを押すとイベント
elements.addTaskBtn.addEventListener('click', () => {
//todolistを作成
  createTodoItems();
//classを付ける事にによって、表示するか分ける
  switchTodoItemsDisplay();
//input入力をreset
  resetInput();
});


//radioボタンのvalueが変わるとイベント
elements.todoStateBtn.addEventListener('change', () => {
//radioBtnのvalueによって表示を切り替える
  switchTodoItemsDisplay();
});


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


//radioBtnのvalueによって表示を切り替える
//filteredクラスを付けて表示を消す
const switchTodoItemsDisplay = () => {
  showTodoItems();

  const type = elements.todoStateBtn.type.value;

  if (type === 'active') {
    Array.from(elements.todoItems.children)
        .filter((todo) => !todo.textContent.includes('作業中'))
        .forEach((todo) => todo.classList.add('filtered'));

  } else if (type === 'complete') {
    Array.from(elements.todoItems.children)
        .filter((todo) => !todo.textContent.includes('完了'))
        .forEach((todo) => todo.classList.add('filtered'));
  }
};


//input入力をresetする関数
const resetInput = () => {
  elements.addItemInput.value = '';
};


//todoItemsにtodos[]を表示する関数
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
    let newText = document.createTextNode(index);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(todo.content);
    newCell.appendChild(newText);

    const stateButton = document.createElement('button');
    stateButton.textContent = todo.state ? '完了' : '作業中';
    newCell = newRow.insertCell();
    newCell.appendChild(stateButton);

    //stateButtonを押すと作業中と完了が入れ替わる
    toggleButton(stateButton, todo);

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
  switchTodoItemsDisplay();
};

//stateButtonのtoggle
const toggleButton = (stateButton, todo) => {
  stateButton.addEventListener('click', () => {
    todo.state = !todo.state;
    stateButton.textContent = todo.state ? '完了' : '作業中';
  });
};

