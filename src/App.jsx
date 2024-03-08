import "./App.css";
import Form from "./components/Form";

import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </div>
  );
}
