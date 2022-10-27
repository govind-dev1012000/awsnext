import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState([]);



  useEffect(() => {
    axios.get("https://5s97615slj.execute-api.ap-south-1.amazonaws.com/api/todos",{
      headers: {
        Authorization:
          'Bearer 033c12370b4a91f531ef64eb63d897e8e469dac69b4c61ed2c287e1fbc55accfb52b06a41573ce9ddf502ed527caab6bead4529aafc70ca4a406036f65a5a6f8a46195230b859f4d13241f18cd12b1c3b91a1fd7b426290f74a5536f1d8e309c7ce3c56e1722d9a0e976f51de50d622859642cbb41a6a582b36d0038b34dcdb1',
      }
    }).then(res => {
      setTodos(res?.data.data);
      console.log(res?.data.data);
    })
    return
  }, []);

  const addTodo = async (text) => {
    console.log(text)
    if (text && text.length > 0) {
      const result = await axios.post("https://5s97615slj.execute-api.ap-south-1.amazonaws.com/api/todos", {

          data: {
            text
          }
        },{
          headers: {
            Authorization:
              'Bearer 033c12370b4a91f531ef64eb63d897e8e469dac69b4c61ed2c287e1fbc55accfb52b06a41573ce9ddf502ed527caab6bead4529aafc70ca4a406036f65a5a6f8a46195230b859f4d13241f18cd12b1c3b91a1fd7b426290f74a5536f1d8e309c7ce3c56e1722d9a0e976f51de50d622859642cbb41a6a582b36d0038b34dcdb1',
          }
        
      
      });
       setTodos([...todos, result.data.data]);
    }


  };

  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete("https://5s97615slj.execute-api.ap-south-1.amazonaws.com/api/todos/" + todo.id,{
        headers: {
          Authorization:
            'Bearer 033c12370b4a91f531ef64eb63d897e8e469dac69b4c61ed2c287e1fbc55accfb52b06a41573ce9ddf502ed527caab6bead4529aafc70ca4a406036f65a5a6f8a46195230b859f4d13241f18cd12b1c3b91a1fd7b426290f74a5536f1d8e309c7ce3c56e1722d9a0e976f51de50d622859642cbb41a6a582b36d0038b34dcdb1',
        }
      });
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };

  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new todo text or description:");
    if (newTodoText != null) {
      const result = await axios.put("https://5s97615slj.execute-api.ap-south-1.amazonaws.com/api/todos/" + todo.id, {
        data: {
          text: newTodoText
        }
      },{
        headers: {
          Authorization:
            'Bearer 033c12370b4a91f531ef64eb63d897e8e469dac69b4c61ed2c287e1fbc55accfb52b06a41573ce9ddf502ed527caab6bead4529aafc70ca4a406036f65a5a6f8a46195230b859f4d13241f18cd12b1c3b91a1fd7b426290f74a5536f1d8e309c7ce3c56e1722d9a0e976f51de50d622859642cbb41a6a582b36d0038b34dcdb1',
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