import { db } from "./db.js";

// Create loan
export async function createLoan({ userId, groupId, loanType, loanAmount, loanInterestRate, loanInterestRatePer, loanGracePeriod, fixedRepaymentPeriod, status, startDate, dueDate }) {
  return db.loans.add({
    userId,
    groupId,
    loanType,
    loanAmount,
    loanInterestRate,
    loanInterestRatePer,
    loanGracePeriod,
    fixedRepaymentPeriod,
    status,
    startDate,
    dueDate,
  });
}

// Get loans for a group
export async function getLoansByGroup(groupId) {
  return db.loans.where("groupId").equals(groupId).toArray();
}

// Get loans by user
export async function getLoansByUser(userId) {
  return db.loans.where("userId").equals(userId).toArray();
}

// Update loan status/details
export async function updateLoan(id, updates) {
  return db.loans.update(id, updates);
}

// Delete loan
export async function deleteLoan(id) {
  return db.loans.delete(id);
}
