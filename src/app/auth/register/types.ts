import { User } from "@/types/User";

export type ApiError = "USER_ALREADY_EXISTS" | "OTHER";

export type FormValidationErrors = {
  email: Array<string>;
  password: Array<string>;
};

export const ApiErrorsUIMessage = {
  USER_ALREADY_EXISTS: "A user with that email already exists.",
  OTHER: "There was an issue with our servers",
};

export type RegisterActionResponse = {
  apiErrors?: Arrray<ApiError>;
  formValidationErrors?: FormValidationErrors;
  userData?: User;
};
