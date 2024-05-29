import { AuthContext } from "./security/AuthContext"
import { useContext } from "react"

export default function FooterComponent(){

    const authContext = useContext(AuthContext)


    return(
      <footer className = "Footer">
        <div className="container">
            Your Footer
        </div>
      </footer>
    )
  }