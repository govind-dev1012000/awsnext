import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   const result = axios.get("http://localhost:1337/api/todos");
  //   setTodos(result.data.data);
  //   console.log(result.data.data)
  // }, []);

  useEffect(() => {
    axios.get("http://43.204.219.196/api/todos").then(res => {
      setTodos(res?.data.data);
      console.log(res?.data.data);
    })
    // console.log(result);
    // 
    return
  }, []);

  const addTodo = async (text) => {
    console.log(text)


    // const res = await fetch('http://localhost:1337/api/todos', {
    //   method: 'post',
    //   body: {

    //     "data": {
    //       "text": text
    //     }

    //   }
    // })


    // console.log(res)
    if (text && text.length > 0) {
      const result = await axios.post("http://43.204.219.196/api/todos", {
        data: {
          text
        }
      });
       setTodos([...todos, result.data.data]);
    }


  };

  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete("http://43.204.219.196/api/todos/" + todo.id);
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };

  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new todo text or description:");
    if (newTodoText != null) {
      const result = await axios.put("http://43.204.219.196/api/todos/" + todo.id, {
        data: {
          text: newTodoText
        }
      });
      const moddedTodos = todos.map((_todo) => {
        if (_todo.id === todo.id) {
          return result.data.data;
        } else {
          return _todo;
        }
      });
      setTodos(moddedTodos);
    }
  };

  return (
    <div>
      <Head>
        <title>ToDo app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}