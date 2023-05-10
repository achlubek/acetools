import { Command } from "commander";
import { z } from "zod";

import { CommandInterface } from "@app/cli/initializeCli";
import { readStdinAsUTF8String } from "@app/cli/util/readStdin";
import { writeStdoutUTF8String } from "@app/cli/util/writeStdout";

export class PasteCommand implements CommandInterface {
  public register(program: Command): void | Promise<void> {
    program
      .command("paste")
      .argument("alias", "Alias to look for")
      .argument("<formula...>", "Original material")
      .action((alias, formula) => this.execute(alias, formula));
  }

  private schema = z.object({
    alias: z.string().min(1),
    formula: z.string().min(1),
  });

  private execute(alias: unknown, formula: unknown): void {
    const formulaSchema = z.array(z.string());
    const data = this.schema.parse({
      alias,
      formula: formulaSchema.parse(formula).join(" "),
    });
    const content = readStdinAsUTF8String();
    const result = data.formula.replaceAll(data.alias, content);
    writeStdoutUTF8String(result);
  }
}
