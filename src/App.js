import React, {useState} from "react";
import Heading from "./components/Heading";
import ToDoLists from "./components/ToDoLists";
import Notes from "./components/Notes"
import Login from "./components/Login";

let loggedIn = false;

function App() {
    let [user, setUser] = useState({
        username: "",
        name: ""
    });
    function getUserName(userGet) {
        loggedIn = true;
        setUser(userGet);
    }

  return (
      <div className="App">
          {loggedIn ?
          <div className="mainpage">
              <Heading name={user.name}/>
              <ToDoLists uname={user.username}/>
              <Notes uname={user.username}/>
          </div>: <Login func={getUserName}/>}

      </div>
  );
}

export default App;
