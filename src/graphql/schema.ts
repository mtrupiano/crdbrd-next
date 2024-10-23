import "./types/User";
import "./types/CollectionSpace";
import "./types/RealWorldLocation";
import "./types/CollectedCard";
import "./types/CustomCardAttribute";
import "./types/AttributesOnCards";
// import "./types/CollectedCardAttributes";

import { builder } from "./builder";

export const schema = builder.toSchema();
