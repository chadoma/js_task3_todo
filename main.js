//全てのTodoListItem
data = {
  allItems: [],
}


elements = {
  itemInput: document.querySelector('.add_item_input'),
  addTaskBtn: document.querySelector('.add_item_btn'),
  todoItems: document.querySelector('.todo_table_items'),
  todoList: document.querySelector('.todo_list'),
  displayNone: document.querySelector('.none'),
}

//addTaskBtnを押すと発火
elements.addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();

//todolistを作成する関数
  addTodoItems();
//htmlにtodoListを表示する関数
  showTodoItems();
//input入力をresetする関数
  resetInput();

});


//input入力をresetする関数
const resetInput = () => {
  elements.itemInput.value = '';
}


//todolistを作成する関数
const addTodoItems = () => {
  let ids, newTodoItem;
  // create ids
  //[1,2,3] 次のIDは４
  //[1,3,4,6] 次のIDは7一度DELETEした番号は使えない様にした。
  //ids = 最後のid+1とする

  if (data.allItems.length > 0) {
    ids = data.allItems[data.allItems.length - 1].id + 1;
  } else {
    ids = 0;
  }
  //空白入力を除去、newTodoItemとして、allItemsにpush
  if (elements.itemInput.value.trim()) {
    newTodoItem = {
      id: ids,
      desc: elements.itemInput.value.trim(),
      state: false,
    }
    data.allItems.push(newTodoItem);
    elements.displayNone.style.display = 'none';
    //空白入力や、入力しないと警告を出す.
  } else {
    elements.displayNone.style.display = 'block';
  }
}

//Htmlにtodolistを表示する関数
const showTodoItems = () => {
  let html, newHtml;
  // 重複表示を防止
  while (elements.todoItems.firstChild) {
    elements.todoItems.removeChild(elements.todoItems.firstChild);
  }


  data.allItems.forEach((item, index) => {
    html = `
    <tr class="item-${ index }">
    <td>%id%</td>
    <td>%description%</td>
    <td><button>%state%</button></td>
    <td><button>削除</button></td>
   </tr> 
  `;
    newHtml = html.replace('%id%', item.id);
    newHtml = newHtml.replace('%description%', item.desc);
    //taskが作業中か？否か。
    if (!item.state) {
      newHtml = newHtml.replace('%state%', '作業中');
    } else {
      newHtml = newHtml.replace('%state%', '完了');

    }
    document.querySelector('.todo_table_items').insertAdjacentHTML('beforeend', newHtml);

  })


}

