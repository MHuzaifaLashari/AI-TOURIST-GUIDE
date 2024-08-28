import express from "express";
import { responseController,createResponse, getAllResponses } from "../controllers/response.controller.js";
const router = express.Router();
router.get("/getresponse",responseController);
router.post("/createresponse",createResponse);
router.get("/getallresponses",getAllResponses)
export default router;

