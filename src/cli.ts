import { initializeCli } from "@app/cli/initializeCli";
import { outError } from "@app/cli/util/outError";
import { initializeDI } from "@app/initialize";

const runCli = async (): Promise<void> => {
  const di = initializeDI();
  const program = await initializeCli(di);
  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    outError(err);
  }
};

void runCli();
