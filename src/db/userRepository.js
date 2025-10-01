import { db } from "./db.js";
import bcrypt from "bcryptjs";

// Create new user
export async function createUser({ fullname, email, password }) {
  const hash = await bcrypt.hash(password, 10);
  const userId = await db.users.add({
    fullname,
    email,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
    lastLoggedIn: null,
  });

  // By default: user is just a "member" (but no group yet)
  // Membership will be added after they select/create group
  return userId;
}

// Get user by email
export async function getUserByEmail(email) {
  return db.users.where("email").equals(email).first();
}

// Update lastLoggedIn timestamp
export async function updateUserLastLoggedIn(userId) {
  return db.users.update(userId, {
    lastLoggedIn: new Date().toISOString(),
  });
}
