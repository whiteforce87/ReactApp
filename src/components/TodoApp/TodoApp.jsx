import "./TodoApp.css"
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom"
import LogoutComponent from "./LogoutComponent"
import FooterComponent from "./FooterComponent"
import HeaderComponent from "./HeaderComponent"
import ListTodoComponent from "./ListTodoComponent"
import ErrorComponent from "./ErrorComponent"
import WelcomeComponent from "./WelcomeComponent"
import LoginComponent from "./LoginComponent"
import AuthProvider, {useAuth} from "./security/AuthContext"
import TodoComponent from "./TodoComponent"
import { useEffect } from "react"
import { apiClient } from "./api/ApiClient"
import PrivateRoutes from "./security/PrivateRoutes"


function AuthenticatedRoute({children}){

    const authContext = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!authContext.isAuthenticated) {
            // Redirect to login page
            let accessToken = localStorage.getItem("accessToken");
            if(accessToken != null){
                authContext.isAuthenticated = true
                authContext.setAccessToken(accessToken)
            }else{
                navigate('/login', { replace: true });

            }
        }
    }, [authContext.isAuthenticated, navigate]);
    console.log("Durum su:",authContext.isAuthenticated)


   return authContext.isAuthenticated ? children : null;
}


   

export default function TodoApp (){


    return (

        <div className="TodoApp">
            <AuthProvider>

            <BrowserRouter>
              <HeaderComponent/>
                <Routes>
                    <Route path = '/' element={<LoginComponent/>}/>
                    <Route path = '/login' element={<LoginComponent/>}/>

                    <Route path="/" element={<PrivateRoutes/>}>
             
                        <Route path = '/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path = '/todos' element={
                            <AuthenticatedRoute>
                                <ListTodoComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path = '/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path = '/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>
                    </Route>
                    
                    <Route path = '*' element={<ErrorComponent/>}/>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
