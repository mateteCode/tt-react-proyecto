import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Count } from "./components/Count/Count";
import { Routes, Route } from "react-router-dom";
import { ItemDetailContainer } from "./components/ItemDatailContainer/ItemDetailContainer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<h1>Carrito</h1>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        <Count />
      </main>
      <Footer />
    </>
  );
}

export default App;
