import './App.css';
import TodoApp from './components/TodoApp/TodoApp';
//import LearningComponent from "./components/learning/LearningComponent"
//import Counter from "./components/counter/Counter"


function App() {
  return (
    <div className="App">
      {/*<Counter></Counter>*/}
      <TodoApp></TodoApp>
    </div>
  );
}


/*
function App() {
  return (
    <div className="App">
      <CounterButton></CounterButton>
      <CounterButton by={2}></CounterButton>
      <CounterButton by={5}></CounterButton>
    </div>
  );
}
*/
//<PlayWithProps property1="value1" property2="value2"></PlayWithProps>

//function PlayWithProps({property1, property2}){
 // console.log(property1)
 // console.log(property2)

  //return (
  //  <div>Props</div>
 // )
//}



export default App;
