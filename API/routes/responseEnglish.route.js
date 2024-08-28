import express from "express";
import { createResponseEnglish, getAllEnglishResponses,  } from "../controllers/responseEnglish.controller.js";

const router = express.Router();
router.get("/getallEnglishresponses",getAllEnglishResponses);
router.post("/createresponseEnglish",createResponseEnglish);

export default router;

