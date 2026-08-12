import { Router } from "express";
import * as clientController from "../controllers/client.controller"
import { authenticateToken } from "../middlewares/auth.Middleware";
const router = Router();

router.post("/", authenticateToken, clientController.createClient);
router.get("/", authenticateToken, clientController.listClients);
router.get("/:id", authenticateToken, clientController.getClientById);
router.put("/:id", authenticateToken, clientController.updateClient);
router.delete("/:id", authenticateToken, clientController.deleteClient);


export default router;