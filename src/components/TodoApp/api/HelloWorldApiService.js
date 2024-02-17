import axios from "axios"


const apiClient = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
)
/*
export function retrieveHelloWorldBean(){
    return axios.get('http://localhost:8080/hello-world')
}
*/
export const retrieveHelloWorldBean = () => apiClient.get('/hello-world')

export const retrieveHelloWorldBeanPathVariable = (username) => apiClient.get(`/hello-world/path-variable/${username}`)
