import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { RecipePage } from "./Pages/RecipePage";
import { AddRecipe } from "./Pages/AddRecipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
    </Routes>
  );
}

export default App;
