import Dexie from "dexie";

export const db = new Dexie("smart-chama");

// Version 1 
db.version(1).stores({
  users: "++id, fullname, email, passwordHash, createdAt",
  groups:
    "++id, userId, groupName, country, currency, groupType, createdAt",
  memberships: "++id, userId, groupId, role",
  groupContributionRules:
    "++id, groupId, contributionName, contributionAmountPerMember, contributionType, contributionCategory",
  contributions:
    "++id, userId, groupId, contributionRuleId, amountPaid, date",
  loans:
    "++id, userId, groupId, loanType, loanAmount, loanInterestRate, loanInterestRatePer, loanGracePeriod, fixedRepaymentPeriod, status, startDate, dueDate",
  fineRules: "++id, groupId, fineType, amount, frequency",
  finesIssued: "++id, userId, groupId, fineRuleId, amount, date, status",
});

// Version 2 (added lastLoggedIn field to users)
db.version(2).stores({
  users: "++id, fullname, email, passwordHash, createdAt, lastLoggedIn",
});


db.version(2).upgrade(async (tx) => {
  await tx.table("users").toCollection().modify((user) => {
    if (!user.lastLoggedIn) {
      user.lastLoggedIn = null; 
    }
  });
});
