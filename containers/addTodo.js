function AddTodo({ addTodo }) {
    return (
      <>
        <div className="addTodoContainer">
          <input
            className="todoInputText"
            type="text"
            placeholder="Add new todo here..."
            id="text"
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                addTodo(text.value);
                text.value = "";
              }
            }}
          />
          <input
            className="todoInputButton"
            type="button"
            value="Add Todo"
            onClick={() => {
              addTodo(text.value);
              text.value = "";

            }}
          />
        </div>
      </>
    );
  }
  
  export default AddTodo;