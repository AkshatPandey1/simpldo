import React from "react";
import Heading from "./components/Heading";
import ToDo from "./components/ToDo";
function App() {

  // let [data, setState] = useState({API: "Loading..."});
  //
  // useEffect(() => {
  //   fetch("http://localhost:9000/testData")
  //       .then((val) => val.json())
  //       .then((val) => {
  //         setState(val);
  //       });
  //
  //   return () => {
  //     setState({API: "Loading..."});
  //   }
  // },[]);

  return (
      <div className="App">
          <Heading name={"AP"}/>
          <ToDo/>
      </div>
  );
}

export default App;
