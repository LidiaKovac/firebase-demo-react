import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../db";

export const createUser = async (email: string, pass: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, pass);
  return user;
};

export const login = async (email: string, pass: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, pass);
  return user;
};
