import { AeroDI } from "aero-di";

import { classesReflection } from "@app/reflectionData";

export const initializeDI = (): AeroDI => {
  return new AeroDI(classesReflection);
};
