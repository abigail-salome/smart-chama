import { db } from "./db.js";

// Add contribution
export async function addContribution({ userId, groupId, contributionRuleId, amountPaid, date }) {
  return db.contributions.add({
    userId,
    groupId,
    contributionRuleId,
    amountPaid,
    date,
  });
}

// Get contributions for a group
export async function getContributionsByGroup(groupId) {
  return db.contributions.where("groupId").equals(groupId).toArray();
}

// Get contributions by user
export async function getContributionsByUser(userId) {
  return db.contributions.where("userId").equals(userId).toArray();
}

// Update contribution
export async function updateContribution(id, updates) {
  return db.contributions.update(id, updates);
}

// Delete contribution
export async function deleteContribution(id) {
  return db.contributions.delete(id);
}
