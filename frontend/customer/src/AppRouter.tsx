import { Route, Routes } from "react-router-dom"
import Catalog from "./pages/Catalog"
import Checkout from "./pages/Checkout"
import Order from "./pages/Order"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:orderId" element={<Order />} />
    </Routes>
  )
}

export default AppRouter