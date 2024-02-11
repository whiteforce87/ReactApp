import {  useNavigate} from "react-router-dom"
import { useState } from "react"
import { useAuth } from "./security/AuthContext"


export default function LoginComponent(){


    const [username, setUserName] = useState("fatih")
    const [password, setPassword] = useState("fatih")
    const [showErrorMessage, setErroruccessMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()




    function handleUsernameChange(event){
        setUserName(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleSubmit(){
        if(authContext.login(username,password)){
            navigate(`/welcome/${username}`)
        }else{
            setErroruccessMessage(true)
        }
    }

    return(
      <div className = "Login">
        {/* <SuccessMessageComponent></SuccessMessageComponent> */}
        {/* <ErrorMessageComponent></ErrorMessageComponent> */}
        {showErrorMessage && <div className="ErrorMessage">Authentication Failed. Check credentials.</div>}
        <div className="LoginForm">
            <div>
                <label>User Name</label>
                <input type="text" name="username" value={username} onChange={handleUsernameChange}></input>
            </div>
            <div>
                <label>Password</label>
                <input type="text" name="password" value={password} onChange={handlePasswordChange}></input>
            </div>
            <div>
                <button type="button" name="login" onClick={handleSubmit}>login</button>
            </div>
        </div>
      </div>
    )
  }


  






 