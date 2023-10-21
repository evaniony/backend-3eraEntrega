import express from "express";
export const ticketRouter = express.Router();
import { ticketController } from "../controller/ticket.controller.js";

ticketRouter.get("/:tid", ticketController.ticketById);