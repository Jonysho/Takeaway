import { useState } from "react";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Navigation from "./components/Navigation";
import Order from "./components/Order";

function App() {
  const [active, setActive] = useState(1)

  const displayData = () => {
    switch(active) {
      case 1:
        return <Home />
      case 2:
        return <Menu />
      case 3:
        return <Order />
      default:
        return <Home />
    }
  }

  return (
    <div className="App">
      <Navigation active={active} setActive={setActive}/>
      <main>
        {displayData()}
      </main>
    </div>
  );
}

export default App;
