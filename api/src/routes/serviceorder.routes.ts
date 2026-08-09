import { Router } from "express";
import * as serviceController from "../controllers/serviceorder.controller"
import { authenticateToken } from "../middlewares/auth.Middleware";
const router = Router();

router.post("/", authenticateToken, serviceController.createServiceOrder);
router.get("/", authenticateToken, serviceController.listServiceOrders);
router.get("/:id", authenticateToken, serviceController.getServiceOrderById);
router.put("/:id", authenticateToken, serviceController.updateServiceOrder);
router.delete("/:id", authenticateToken, serviceController.deleteServiceOrder);


export default router;