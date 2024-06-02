import { createContext, useState, useContext } from "react";
import { executeJWTauthentication } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
import { useEffect } from "react";
import axios from "axios";



export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)



export default function AuthProvider({children}){

    const [isAuthenticated,setAuthenticated] = useState(false)
   // const[isLogin,setIsLogin] = useState(false)

    const [username,setUsername] = useState(null)
   // const [token,setToken] = useState(null)
    const [refreshToken,setRefreshToken] = useState('')
    const [accessToken,setAccessToken] = useState('')


    
/* Without authentication
    function login(username, password){
        if(username === "fatih" && password === "dummy"){
            setAuthenticated(true)
            setUsername(username)
            return true

        }else{
            setAuthenticated(false)
            setUsername(null)
            return false

        }
    }
*/

/* With basic authentication
   async function login(username, password){

        const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)

        try{
            
        const response = await executeBasicAuthentication(basicAuthToken)

        if(response.status === 200){
            setAuthenticated(true)
            setUsername(username)
            setToken(basicAuthToken)

            apiClient.interceptors.request.use(
                (config) => {config.headers.Authorization=basicAuthToken
                return config
                }
            )
            return true

        }else{
            logout()
            return false

        }
    }catch{
        logout()
        return false
    }
    }
    */


    useEffect(() => {
    
        const requestInterceptor= apiClient.interceptors.request.use(
            (config) => {
                if(accessToken){

                config.headers.Authorization = `Bearer ${accessToken}`
    
                //config.headers.refreshToken = refreshToken
                console.log("header a access token set edildi!",config.headers.Authorization )


                }
            return config
            },
            error =>{
                return Promise.reject(error);
            }
        );

         

    const responseInterceptor = apiClient.interceptors.response.use(

    response => response,
    async error => {
      const originalRequest = error.config;
      // Check if the error is due to token expiration
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        console.log("-------buraya girdi2------------")
        originalRequest._retry = true;
        try {
          // Attempt to refresh token
          if(refreshToken === null){
            const newRefreshToken = localStorage.getItem("refreshToken")
            setRefreshToken(newRefreshToken)
          }
           const newAccessToken = await refreshNewToken();
           setAccessToken(newAccessToken)
           setUsername(username)

           console.log("AccesToken:",newAccessToken)
        // Update the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // Retry the original request
        console.log("original request: ",originalRequest)
        
    

        return axios.request(originalRequest);
        } catch (refreshError) {
          // Handle token refresh error (e.g., redirect to login page)
          console.error('Error refreshing token:', refreshError);
          //throw refreshError;
          logout()
        }
      }
      // If error is not due to token expiration, simply reject the promise
      return Promise.reject(error);
    }
  );

        return () => {
            apiClient.interceptors.request.eject(requestInterceptor)

            apiClient.interceptors.response.eject(responseInterceptor)
        };
}, [accessToken,refreshToken]);


    const refreshNewToken = async () => {
        try {
            console.log("new refreshToken:",refreshToken)
            const response = await axios.post('http://localhost:8080/refreshToken', {
            refreshToken:refreshToken, withCredentials: true });
            const newAccesToken =response.data.accessToken;
            console.log("NewAccessToken: ",newAccesToken);
            localStorage.removeItem("accessToken");
            storeAccessTokenToLocal(newAccesToken)
            storeUsername(username)
            return newAccesToken
        } catch (error) {
          console.error('Error refreshing token:', error);
          logout()
        }
      };


    // With JWT authentication
   async function login(username, password){


    try{
        console.log("--------buraya girdi!----")
        console.log("apiClient:", apiClient.getUri)

        
    const response = await executeJWTauthentication(username, password)
    console.log("Response: ",response)

    if(response.status === 200){
        
        setRefreshToken(response.data.refreshToken)
        setAccessToken(response.data.accessToken)
        setAuthenticated(true)
        setUsername(username)

        storeAccessTokenToLocal(response.data.accessToken)
        storeRefreshTokenToLocal(response.data.refreshToken)
        storeUsername(username)


        return true

    } else{

        logout()
        return false

    }
}catch{
    console.log("login failed!")

    logout()
    return false
}
}

const storeAccessTokenToLocal = (accessToken)=>
  localStorage.setItem("accessToken", accessToken);
const storeRefreshTokenToLocal = (refreshToken) =>
  localStorage.setItem("refreshToken", refreshToken);
  const storeUsername = (username) =>
  localStorage.setItem("username", username);

    

     async function logout(){
        
       
       /*

        try {
            // Send logout request to server
            const response = apiClient.get("/logout");
            console.log("Responselogout:",response)
            if (response.status === 200) {
              // Logout successful
              // Redirect the user to the login page or homepage
              //window.location.href = '/login';
            } else {
              // Handle logout error
              console.error('Logout failed');
            }
          } catch (error) {
            console.error('Error during logout:', error);
          }
*/

              
       unsetCredentials()
       removeLocalStorage()

    }


    async function removeLocalStorage(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
    }

    async function unsetCredentials(){
        setAuthenticated(false)
        setUsername(null)
        setAccessToken(null)
        setRefreshToken(null)
    }



    return (
            <AuthContext.Provider value={ { isAuthenticated, login, logout, username, accessToken, refreshToken ,setAccessToken, setUsername, setAuthenticated, setRefreshToken}}>
                {children}
            </AuthContext.Provider>
    )
}