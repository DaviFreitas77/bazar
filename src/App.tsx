import { Routes, Route } from "react-router-dom";
import {Category} from "./pages/category";


function App() {
  return (  
      <Routes>
        <Route path="/" element={<Category />} />
      </Routes>

  );
}

export default App;
