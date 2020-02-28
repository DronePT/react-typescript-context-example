import React from "react";
import "./App.css";

import {
  NavigationMenuContextProvider,
  withNavigationMenuContext
} from "./context/NavigationMenuContext";

const Menu = withNavigationMenuContext(props => {
  const classNames = ["Menu"];

  if (props.navigationMenuContext && props.navigationMenuContext.isOpen) {
    classNames.push("is-open");
  }

  return (
    <div className={classNames.join(" ")}>
      <div>Hello, I'm The Navigation Menu!</div>
      <button className="btn btn-sm" onClick={props.navigationMenuContext?.closeMenu}>
        Close
      </button>
    </div>
  );
});

const RandomComponent = withNavigationMenuContext(props => {
  const { navigationMenuContext } = props;

  if (!navigationMenuContext) return <div>Loading</div>;

  const { toggleMenu, isOpen } = navigationMenuContext;

  return (
    <button className="btn" onClick={toggleMenu}>
      Click to {isOpen ? "close" : "open"} menu!
    </button>
  );
});

function App() {
  return (
    <NavigationMenuContextProvider>
      <div className="App">
        <h1>React Context API Example</h1>
        <Menu></Menu>
        <RandomComponent></RandomComponent>
      </div>
    </NavigationMenuContextProvider>
  );
}

export default App;
