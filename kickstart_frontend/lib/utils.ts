import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface User {
  fullName: string;
  email: string;
  birth_year: number;
  type: string;
}

export const addUsersToDB = async (user: User): Promise<void> => {
  try {
    await setDoc(doc(db, "users", user.email), {
      name: user.fullName,
      email: user.email,
      birth_year: user.birth_year,
      type: user.type,
    });
    console.log("Document written with ID:", user.email);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export function sanitizeEmail(email: string): string {
  // Replace '@' with '_'
  let sanitizedEmail = email.replace(/@/g, '_');
  
  // Replace '.' with '-'
  sanitizedEmail = sanitizedEmail.replace(/\./g, '-');
  
  return sanitizedEmail;
}

export function unsanitizeEmail(sanitizedEmail: string): string {
  // Replace '_' with '@'
  let unsanitizedEmail = sanitizedEmail.replace(/_/g, '@');
  
  // Replace '-' with '.'
  unsanitizedEmail = unsanitizedEmail.replace(/-/g, '.');
  
  return unsanitizedEmail;
}
