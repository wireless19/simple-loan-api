import express from "express";
import {
    getLoans, getUserLoansWithEmail, getPastExpiredLoans, deleteLoan
} from "../controllers/loan.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const loanRoutes = express.Router();

// Apply middleware to ALL routes below
loanRoutes.use(verifyToken);
//you can use it like this: authorizeRoles("user", "admin") or authorizeRoles("user")
loanRoutes.get("/", authorizeRoles("superAdmin", "admin", "staff"), getLoans);
loanRoutes.get("/:userEmail/get", authorizeRoles("superAdmin", "admin", "staff"), getUserLoansWithEmail);
loanRoutes.get("/expired", authorizeRoles("superAdmin", "admin", "staff"), getPastExpiredLoans);
loanRoutes.delete("/:loanId/delete", authorizeRoles("superAdmin"), deleteLoan);


export default loanRoutes;