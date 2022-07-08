export class Model {
  constructor() {
    this.todoDataBase = [];
    this.id = 0;
    this.localStorageGet = JSON.parse(window.localStorage.getItem("todo"));

    if (this.todoDataBase.length === 0 && this.localStorageGet !== null) {
      this.localStorageGet.forEach((Element) => {
        Element.id > this.id ? (this.id = Element.id) : (this.id = this.id);
        this.todoDataBase.push(Element);
      });
    }
  }

  uploadTodo() {
    fetch("/upload", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.todoDataBase),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async downloadTodo() {
    console.log("model is ok");
    const url = "/download";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    this.todoDataBase = data;
    this._renderTodo(this.todoDataBase);
    localStorage.setItem("todo", JSON.stringify(this.todoDataBase));
    // console.log(this.todoDataBase);
    // console.log(
    //   localStorage.setItem("todo", JSON.stringify(this.todoDataBase))
    // );

    // updateShowDate();
  }

  addTodo(todoText) {
    this.todo = {
      id: ++this.id,
      complete: false,
      edit: false,
      todo: todoText,
    };
    this.todoDataBase.push(this.todo);
    this._renderTodo(this.todoDataBase);
    localStorage.setItem("todo", JSON.stringify(this.todoDataBase));
  }

  deleteTodo(id) {
    this.todoDataBase = this.todoDataBase.filter((todo) => {
      return todo.id !== id;
    });
    this._renderTodo(this.todoDataBase);
    localStorage.setItem("todo", JSON.stringify(this.todoDataBase));
  }

  completeTodo(id) {
    this.todoDataBase.forEach((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
    });
    this._renderTodo(this.todoDataBase);
    localStorage.setItem("todo", JSON.stringify(this.todoDataBase));
  }

  editTodo(todoId, todoText) {
    this.todoDataBase.forEach((todo) => {
      if (todo.id === todoId) {
        todo.edit = !todo.edit;
        todo.todo = todoText;
      }
    });
    this._renderTodo(this.todoDataBase);
    localStorage.setItem("todo", JSON.stringify(this.todoDataBase));
  }

  todoFilter(statusTodo) {
    if (statusTodo === "all") {
      this._renderTodo(this.todoDataBase);
    } else if (statusTodo === "complete") {
      let filterDataBase = this.todoDataBase.filter((todo) => {
        return todo.complete !== false;
      });
      this._renderTodo(filterDataBase);
    } else if (statusTodo === "active") {
      let filterDataBase = this.todoDataBase.filter((todo) => {
        return todo.complete !== true;
      });
      this._renderTodo(filterDataBase);
    }
  }

  renderPage(renderTodo) {
    this._renderTodo = renderTodo;
  }
}
