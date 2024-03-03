import { useAuth } from "./security/AuthContext"
export default function LogoutComponent(){

  const authContext = useAuth()

  async function logout(){
  authContext.logout()
  }

  logout();



/*
//If we want to see only comment on page:

    return(
      <div className = "Logout">
         <h1>You are Logged out</h1>
         <div>Thank you for using App. Come back soon!</div>

      </div>
    )

*/
  }