import FirstComponent from './FirstComponent'
import SecondComponent from './SecondComponent'
import {ThirdComponent} from './FirstComponent'
import LearningJS from './LearningJS'


function LearningComponent() {
    return (
      <div className="App">
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
        <LearningJS></LearningJS>

      </div>
    );
  }
  
  export default LearningComponent