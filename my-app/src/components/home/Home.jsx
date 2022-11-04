import React, {useState, useEffect} from 'react';
import Loading from '../loading/Loading';
import Todos from '../todosId/TodosId'
import Pagination from '../Pagination/Pagination'
import axios from 'axios';
import {
    Form, Input, Button,
  } from 'semantic-ui-react';
const Home = () => {
    const [todos, setTodos] = useState([]);
    const [todoAdded, settodoAdded] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    
    

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
                setName("");
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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost)
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
        <Pagination 
            postsPerPage={postsPerPage} 
            totalPosts={todos.length} 
            paginate={paginate}/>
        <Todos todos={currentPosts} />
    </div>
    );
}

export default Home