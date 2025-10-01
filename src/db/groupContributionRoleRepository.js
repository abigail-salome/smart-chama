import { db } from "./db.js";

// Create contribution rule
export async function createContributionRule({ groupId, contributionName, contributionAmountPerMember, contributionType, contributionCategory }) {
  return db.groupContributionRules.add({
    groupId,
    contributionName,
    contributionAmountPerMember,
    contributionType,
    contributionCategory,
  });
}

// Get rules for a group
export async function getContributionRulesByGroup(groupId) {
  return db.groupContributionRules.where("groupId").equals(groupId).toArray();
}

// Update rule
export async function updateContributionRule(id, updates) {
  return db.groupContributionRules.update(id, updates);
}

// Delete rule
export async function deleteContributionRule(id) {
  return db.groupContributionRules.delete(id);
}
