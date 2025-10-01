import { db } from "./db.js";

// Create new group & set creator as admin
export async function createGroup({ userId, groupName, country, currency, groupType }) {
  const groupId = await db.groups.add({
    userId,
    groupName,
    country,
    currency,
    groupType,
    createdAt: new Date().toISOString(),
  });

  // Add creator as admin in memberships
  await db.memberships.add({ userId, groupId, role: "admin" });

  return groupId;
}

// Get group by ID
export async function getGroupById(groupId) {
  return db.groups.get(groupId);
}

// Get all groups for a user (via memberships)
export async function getGroupsByUser(userId) {
  const memberships = await db.memberships.where("userId").equals(userId).toArray();
  return db.groups.bulkGet(memberships.map(m => m.groupId));
}

// Update group
export async function updateGroup(groupId, updates) {
  return db.groups.update(groupId, updates);
}

// Delete group (optionally delete memberships too)
export async function deleteGroup(groupId) {
  await db.groups.delete(groupId);
  await db.memberships.where("groupId").equals(groupId).delete();
}
