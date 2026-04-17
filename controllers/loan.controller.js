import loans from "../utils/loans.json" with { type: "json" };
import { roleBaseLoanFiltering } from "../utils/roleBaseFiltering.js";

export const getLoans = async (req, res) => {
  try {
    const userRole = req.user?.role;
    const { status } = req.query;

    const statusFilteredLoan = loans.filter((loan) =>
      status ? loan.status === status : true
    );

    const filteredLoans = statusFilteredLoan.map((loan) =>
      roleBaseLoanFiltering(loan, userRole)
    );

    res.status(200).json({ success: true, loans: filteredLoans });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const getUserLoansWithEmail = async (req, res) => {
  try {
    const userRole = req.user?.role;
    const userEmail = req.params.userEmail;

    const userEmailFilteredLoan = loans.filter(
      (loan) => loan.applicant?.email === userEmail
    );

    const filteredLoans = userEmailFilteredLoan.map((loan) =>
      roleBaseLoanFiltering(loan, userRole)
    );

    res.status(200).json({ success: true, loans: filteredLoans });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const getPastExpiredLoans = async (req, res) => {
  try {
    const userRole = req.user?.role;
    const now = new Date();

    const expiredFilteredLoan = loans.filter(
      (loan) => new Date(loan.maturityDate) < now
    );

    const filteredLoans = expiredFilteredLoan.map((loan) =>
      roleBaseLoanFiltering(loan, userRole)
    );

    res.status(200).json({ success: true, loans: filteredLoans });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const deleteLoan = async (req, res) => {
  try {
    const loanId = req.params.loanId;
    const filteredLoans = loans.filter((loan) => loan.id !== loanId);

    res
      .status(200)
      .json({
        success: true,
        message: "Loan deleted successfully",
        loans: filteredLoans,
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};
