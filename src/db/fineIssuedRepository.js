import { db } from "./db.js";

// Issue fine
export async function issueFine({ userId, groupId, fineRuleId, amount, date, status }) {
  return db.finesIssued.add({
    userId,
    groupId,
    fineRuleId,
    amount,
    date,
    status,
  });
}

// Get fines for a group
export async function getFinesByGroup(groupId) {
  return db.finesIssued.where("groupId").equals(groupId).toArray();
}

// Get fines by user
export async function getFinesByUser(userId) {
  return db.finesIssued.where("userId").equals(userId).toArray();
}

// Update fine (e.g., mark as paid)
export async function updateFine(id, updates) {
  return db.finesIssued.update(id, updates);
}

// Delete fine
export async function deleteFine(id) {
  return db.finesIssued.delete(id);
}
