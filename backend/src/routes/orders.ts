import { Router } from "express";
import * as OrderController from '../controllers/order.controller';

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrdersById);
router.patch("/:id/status", OrderController.updateOrderStatus);

export default router;