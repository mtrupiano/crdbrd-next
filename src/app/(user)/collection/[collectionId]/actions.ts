import { authSafeActionClient } from "@/lib/safeAction";

export const fetchCollections = authSafeActionClient.action();
