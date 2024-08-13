import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/desktop" className="taskLink">Task 1</Link>
      <Link to="/transactions" className="taskLink">Task 2</Link>
    </div>
  );
}

export default App;
