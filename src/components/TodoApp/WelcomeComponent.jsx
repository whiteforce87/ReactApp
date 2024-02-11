import { useParams, Link} from "react-router-dom"


export default function WelcomeComponent(){

    const {username} = useParams()
    
        return(
          <div className = "Welcome">
            <h1>Welcome {username}</h1>
            <div>
    
                Your todos - <Link to="/todos">GO HERE</Link>
            </div>
          </div>
        )
      }