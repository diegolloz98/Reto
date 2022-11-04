import React, {useState, useEffect} from 'react';
import './home.css';
import Loading from '../loading/Loading';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import {
    Form, Input, Button,
  } from 'semantic-ui-react';
const Home = () => {
    const [todos, setTodos] = useState([]);
    const [todoAdded, settodoAdded] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    

    useEffect(() => {
        getTodos()
    }, [])

    useEffect(() => {
        console.log(todos)
    }, [])

    function getTodos (){
        setLoading(true);
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((result) =>{
                setTodos(result.data);
                setLoading(false);
                
        })
        .catch(error => console.log(error.message))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {userId: Math.floor(Math.random() * 9000) + 1000, 
                    id: Math.floor(Math.random() * 9000) + 1000, 
                    title: name, 
                    completed: false
        }
        settodoAdded(todoAdded.push(data))
        console.log(todoAdded)
        console.log(todos)
        console.log(todoAdded.concat(todos))
        setTodos(todoAdded.concat(todos))
        settodoAdded([])
    }
    

    if(loading){
        return <Loading/>
      }
      

    return (
    <div className="container header___container">

        <h1>Todos</h1>
        <Form className="form" onSubmit={handleSubmit}>
            <div class="field">
                    <label>Description</label>
                        <Input
                            type="text"
                            placeholder="Description"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                    >
                        Crear
                    </Button>   
            </Form>
        <button onClick={()=> getTodos()} >Refresh</button>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Description</th>
                    <th>Completed</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  {todos.map(todo => (
                      <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.userId}</td>
                        <td>{todo.title}</td>
                        {!todo.completed &&
                            <>
                                <td >
                                    <icon > <AiOutlineCloseCircle size={20}/> </icon>
                                </td>
                            </>
                        }
                        {todo.completed &&
                            <>
                                <td >
                                    <icon > <MdOutlineDone size={20}/> </icon>
                                </td>
                            </>
                        }
                        
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
    );
}

export default Home