import { db } from "./db.js";

// Add membership (default role = member)
export async function addMembership({ userId, groupId, role = "member" }) {
  return db.memberships.add({ userId, groupId, role });
}

// Get members of a group
export async function getMembersByGroup(groupId) {
  return db.memberships.where("groupId").equals(groupId).toArray();
}

// Get groups for a user
export async function getGroupsByUserId(userId) {
  return db.memberships.where("userId").equals(userId).toArray();
}

// Update membership role (e.g., promote member to admin)
export async function updateMembership(id, updates) {
  return db.memberships.update(id, updates);
}

// Remove membership
export async function deleteMembership(id) {
  return db.memberships.delete(id);
}
