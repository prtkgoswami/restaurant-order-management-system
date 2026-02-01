import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
