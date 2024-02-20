import { apiClient } from "./ApiClient"


//This is for Basic authentication
export const executeBasicAuthentication = (token) => apiClient.get(`/basicauth`,
{
    headers:{
    Authorization: token
    }
})

//This is for JWT authentication
export const executeJWTauthentication = (username,password) => apiClient.post(`/authenticate`,
{username, password})