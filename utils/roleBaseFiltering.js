export const roleBaseLoanFiltering = (loan, role) => {
  if (role === "admin" || role === "superAdmin") {
    return loan;
  }

  const { totalLoan, ...restApplicant } = loan.applicant;

  return {
    ...loan,
    applicant: restApplicant,
  };
};