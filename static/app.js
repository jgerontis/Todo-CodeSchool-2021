var url = "https://cs-2021-todo-jg.herokuapp.com";

var app = new Vue({
  el: "#app",
  data: {
    todos: [
      /*
            { 
                name:"Feed the dog",
                description:"N/A",
                done:false,
                editing:false,
                deadline: new Date().toLocaleDateString()
            }
            */
    ],
    new_todo_name: "",
    new_todo_description: "",
    new_todo_deadline: "",
    new_todo_completed: "",
  },
  created: function () {
    this.getTodos();
  },
  methods: {
    addNewTodo: function () {
      var request_body = {
        name: this.new_todo_name,
        description: this.new_todo_description,
        done: false,
        editing: false,
        deadline: this.new_todo_deadline,
      };
      fetch(`${url}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request_body),
      }).then(function (response) {
        console.log(request_body);
        console.log(response);
        if (response.status == 400) {
          response.json().then(function (data) {
            alert(data.msg);
          });
        } else if (response.status == 201) {
          app.new_todo_name = "";
          app.new_todo_description = "";
          app.new_todo_deadline = "";
          app.getTodos();
        }
      });
    },
    deleteTodo: function (todo) {
      fetch(`${url}/todo/` + todo, {
        method: "DELETE",
      })
        .then((response) => response.body)
        .then(function (data) {
          console.log(data);
          app.getTodos();
        });
    },
    saveTodo: function (todo) {
      todo.editing = false;
      fetch(`${url}/todo/` + todo._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
    },
    editTodo: function (todo) {
      this.$set(todo, "editing", true);
    },
    getTodos: function () {
      fetch(`${url}/todo`)
        .then((response) => response.json())
        .then(function (data) {
          app.todos = data;
          console.log(JSON.stringify(data));
        });
    },
    saveTodoDone: function (todo) {
      console.log(todo.done);
      fetch(`${url}/todo/` + todo._id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: todo.done }),
      }).then((response) => console.log(response));
    },
  },
});
