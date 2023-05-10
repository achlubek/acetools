import { AeroDI } from "aero-di";

import { initializeDI } from "@app/initialize";

export let globalTestDI: AeroDI;

export const mochaHooks = {
  beforeAll(done: () => void) {
    const setup = async (): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (globalTestDI) {
        done();
        return;
      }
      try {
        globalTestDI = await initializeDI();
        done();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };
    void setup();
  },
};
