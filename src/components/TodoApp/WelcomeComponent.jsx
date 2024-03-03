import { useState} from "react"
import { useParams, Link} from "react-router-dom"
import { retrieveHelloWorldBeanPathVariable } from "./api/HelloWorldApiService"
import { useAuth } from "./security/AuthContext"

export default function WelcomeComponent(){

    const {username} = useParams()

    const [message, setMessage] = useState(null)

    const authContext = useAuth()

    function callHelloWorldRestApi(){
        
        //retrieveHelloWorldBean()
        retrieveHelloWorldBeanPathVariable("fatih", authContext.accessToken)
        .then((response) => successfullResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log('cleanup'))
        

    }

    function successfullResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }
    
        return(
          <div className = "Welcome">
            <h1>Welcome {username}</h1>
            <div>
    
                Manage your todos - <Link to="/todos">GO HERE</Link>
            </div>
            <div>
                <button className= "btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello world</button>
            </div>
            <div className="text-info">{message}</div>
          </div>
        )
      }