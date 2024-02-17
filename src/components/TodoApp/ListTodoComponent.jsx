import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";

export default function ListTodoComponent(){

    const today = new Date();
   /*
    const targetDate = new Date(today.getFullYear(), today.getMonth() + 2 , today.getDay())

    const todos = [{id: 1, description: 'Learn AWS', done:false, targetDate: targetDate},
                    {id: 2, description: 'Learn Docker',done:false, targetDate: targetDate},
                    {id: 3, description: 'Learn Jenkins',done:false, targetDate: targetDate}]
*/

const [todos, setTodos] = useState([])
const [message, setMessage] = useState(null)

const authContext = useAuth()
const username = authContext.username
const navigate = useNavigate()



useEffect(
    () => refreshTodos(), []
)

function refreshTodos(){
    retrieveAllTodosForUsernameApi(username)
    .then(response => {
         setTodos(response.data)})
    .catch(error => console.log(error))
}

function deleteTodo(id){
    deleteTodoApi(username,id)
    .then(
        () => {
            setMessage(`Delete of toDo with ${id} successful`)
            refreshTodos()
        }
    )
    .catch(error => console.log(error))

}

function updateTodo(id){
    navigate(`/todo/${id}`)

    /*
    updateTodoApi(username,id)
    .then(
        () => {
            setMessage(`Update of toDo with ${id} successful`)
            refreshTodos()
        }
    )
    .catch(error => console.log(error))
*/
}

function addNewTodo(){
    navigate(`/todo/-1`)
}



    return(
      <div className = "container">
        <h1>Things you want to do!</h1>
        {message && <div className="alert alert-warning">{message}</div>}
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>description</th>
                        <th>isDone</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>                    
                </thead>
                <tbody>
                    {
                    todos.map( 
                        todo => (
                            <tr key = {todo.id}>
                                 <td>{todo.description}</td>
                                 <td>{todo.done.toString()}</td>
                                 <td>{todo.targetDate.toString()}</td>
                                 <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                 <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                             </tr>
                                )
                             )
                    }
                </tbody>
            </table>
        </div>
        <div className="btn btn-success m-5" onClick={addNewTodo}> Add New Todo

        </div>
      </div>
    )
  }

 

  

