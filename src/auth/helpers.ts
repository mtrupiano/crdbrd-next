"use server"

import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from ".";

export async function signIn(...args) {
  await nextAuthSignIn(args);
}

export async function signOut(...args) {
  await nextAuthSignOut(args);
};