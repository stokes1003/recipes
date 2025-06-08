import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { RecipePage } from "./Pages/RecipePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
    </Routes>
  );
}

export default App;
