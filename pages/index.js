import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import axios from "axios";
import { getSession ,useSession, signIn, signOut } from "next-auth/react";
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'

export default function Home() {
  const [todos, setTodos] = useState([]);

  var token = useSession()

  const [path,setPath]=useState(true)

  if (token.status== "authenticated" && path) {
    setPath(false)
    axios.get("http://13.127.243.26/api/todos",{
      headers: {
        Authorization:
          `Bearer ${token.data.jwt}`,
      }
    }).then(res => {
      setTodos(res?.data.data);
      // console.log(res?.data.data);
    })
  }
  // console.log(token.status)
  // Cookies.set('auth','hi')
  // var t = Cookies.get('next-auth.csrf-token')
  // // var decoded = jwt_decode(t);
  // console.log(t)
  // console.log(decoded)


//  const [a]=useState(
//   useSession()
// )

  // useEffect(()=>{
  //   var use = await useSession();
  //   console.log(use);
  // },[])

  // useEffect(() => {
  //   axios.get("https://5s97615slj.execute-api.ap-south-1.amazonaws.com/api/todos",{
  //     headers: {
  //       Authorization:
  //         `Bearer ${token.data.jwt}`,
  //     }
  //   }).then(res => {
  //     setTodos(res?.data.data);
  //     console.log(res?.data.data);
  //   })
  //   return
  // }, []);

  const addTodo = async (text) => {
    console.log(text)
    if (text && text.length > 0) {
      const result = await axios.post("http://13.127.243.26/api/todos", {

          data: {
            text
          }
        },
        {
          headers: {
            Authorization:
            `Bearer ${token.data.jwt}`,
          }
      }
      );
       setTodos([...todos, result.data.data]);
    }


  };

  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete("http://13.127.243.26/api/todos/" + todo.id,{
        headers: {
          Authorization:
          `Bearer ${token.data.jwt}`,
        }
      }
      );
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };

  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new todo text or description:");
    if (newTodoText != null) {
      const result = await axios.put("http://13.127.243.26/api/todos/" + todo.id, {
        data: {
          text: newTodoText
        }
      },
      {
        headers: {
          Authorization:
          `Bearer ${token.data.jwt}`,
        }
      }
      );
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

// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Home() {
//   const { data: session } = useSession();
//   console.log(session)
//   if (session) {
//     return (
//       <div>
//         Welcome user<br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>
//     );
//   }
//   return (
//     <div>
//       Click to sign into your user account <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </div>
//   );
// }
