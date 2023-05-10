import { AeroDI } from "aero-di";
import { Command } from "commander";

export interface CommandInterface {
  register(program: Command): void | Promise<void>;
}

export const initializeCli = async (di: AeroDI): Promise<Command> => {
  const program = new Command();
  program.name("cli").description("cli").version("1.0.0");

  const commandClasses =
    di.classMetadataProvider.getByInterface("CommandInterface");
  for (const commandClass of commandClasses) {
    const commandInstance = di.getByClassData<CommandInterface>(commandClass);
    await commandInstance.register(program);
  }
  return program;
};
