import { createUser, getUserByEmail, updateUserLastLoggedIn } from "../db/userRepository";
import bcrypt from "bcryptjs";

// Sign up new user
export async function signUp(fullname, email, password) {
  return createUser({ fullname, email, password });
}

// Log in user
export async function logIn(email, password) {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  //  Updates lastLoggedIn timestamp
  await updateUserLastLoggedIn(user.id);

  // Fetches updated user
  const updatedUser = await getUserByEmail(email);

  // Saves session 
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  return updatedUser;
}

// Logs out user
export function logOut() {
  localStorage.removeItem("currentUser");
}
