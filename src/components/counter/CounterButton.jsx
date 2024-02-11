
import {PropTypes} from 'prop-types'
//import { useState } from 'react'
import './Counter.css'


export default function CounterButton({by, incrementMethod, decrementMethod}){

    /*const buttonStyle = {
        fontSize:"20px",
        backgroundColor: "#00a5ab",
        width:"110px",
        borderRadius: "30px",
        color: "white",
        margin : "10px",
        padding: "10px"}
*/


    //const state = useState(0);
   // const [count, setCount] = useState(0);
/*
    function incrementCounterFunction(){
        
        //state[1](state[0] + 1)
        //console.log(state[0])
        //console.log(state[1])
        //setCount(count + by)
        incrementMethod(by);
    }

    function decrementCounterFunction(){
        
        //state[1](state[0] + 1)
        //console.log(state[0])
        //console.log(state[1])
        //setCount(count - by)
        decrementMethod(by);
    }
*/
    return (
        <div className="Counter">
            <div>
                <button className="counterButton" onClick={() =>incrementMethod(by)}
                    //style = {buttonStyle}
                
                >+{by}</button>
                <button className="counterButton" onClick={() => decrementMethod(by)}
                    //style = {buttonStyle}
                
                >-{by}</button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by : PropTypes.number
  
  }

CounterButton.defaultProps = {
    by : 1
  
  }