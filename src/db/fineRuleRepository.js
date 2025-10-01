import { db } from "./db.js";

// Create fine rule
export async function createFineRule({ groupId, fineType, amount, frequency }) {
  return db.fineRules.add({
    groupId,
    fineType,
    amount,
    frequency,
  });
}

// Get fine rules by group
export async function getFineRulesByGroup(groupId) {
  return db.fineRules.where("groupId").equals(groupId).toArray();
}

// Update fine rule
export async function updateFineRule(id, updates) {
  return db.fineRules.update(id, updates);
}

// Delete fine rule
export async function deleteFineRule(id) {
  return db.fineRules.delete(id);
}
