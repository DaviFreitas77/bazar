import { Routes, Route } from "react-router-dom";
import {Search} from "./pages/search";
import {Product} from "./pages/product"


function App() {
  return (  
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>

  );
}

export default App;
