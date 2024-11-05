import "./types";
import "./mutations";
import "./queries";

import { builder } from "./builder";

export const schema = builder.toSchema();
