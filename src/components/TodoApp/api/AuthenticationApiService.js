import { apiClient } from "./ApiClient"

export const executeBasicAuthentication = (token) => apiClient.get(`/basicauth`,
{
    headers:{
    Authorization: token
    }
})