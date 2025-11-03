import { Routes, Route } from "react-router-dom";
import {Search} from "./pages/search";
import {Product} from "./pages/product"
import { Header } from "./components/ui/header";
import {Checkout} from "./pages/checkout"


function App() {
  return (  
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
</>
  );
}

export default App;
