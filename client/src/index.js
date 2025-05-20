import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import PcStore from "./store/PcStore";
import './styles/index.css'; 
export const Context = createContext(null);

const root = ReactDOM.createRoot(
    document.getElementById("root")
);


root.render(
    <Context.Provider value={{ 
        user: new UserStore(),
        pc: new PcStore()
    }}>
        <App />
    </Context.Provider>
);

