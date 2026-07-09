"use server";

import argon2 from "argon2";
import { redirect } from "next/navigation";
import { SignupSchema, LoginSchema } from "@/lib/validation/auth";
import { getUserByEmail, createUser } from "@/lib/db/queries/users";
import { createSession, deleteSession } from "@/lib/session";

export type AuthFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function signup(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;

  const existing = await getUserByEmail(email);
  if (existing) {
    return { message: "An account with this email already exists." };
  }

  const passwordHash = await argon2.hash(password);

  let userId: string;
  try {
    const user = await createUser({ name, email, passwordHash });
    userId = user.id;
  } catch {
    return { message: "An account with this email already exists." };
  }

  await createSession(userId);
  redirect("/account");
}

export async function login(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  const validPassword = user ? await argon2.verify(user.passwordHash, password) : false;

  if (!user || !validPassword) {
    return { message: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/account");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
