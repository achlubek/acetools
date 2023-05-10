import { Command } from "commander";
import { z } from "zod";

import { CommandInterface } from "@app/cli/initializeCli";
import { readStdinAsUTF8String } from "@app/cli/util/readStdin";
import { writeStdoutUTF8String } from "@app/cli/util/writeStdout";

export class RegexReplaceCommand implements CommandInterface {
  public register(program: Command): void | Promise<void> {
    program
      .command("regex:replace")
      .argument("regex", "The regex, as string")
      .argument("repl", "The replacements formula, as string")
      .argument("[flags]", "The replacements formula, as string", " ")
      .action((regex, repl, flags) => this.execute(regex, repl, flags));
  }

  private schema = z.object({
    regex: z.string().min(1),
    repl: z.string().min(0),
    flags: z.string().min(0),
  });

  private execute(regex: unknown, repl: unknown, flags: unknown): void {
    const data = this.schema.parse({ regex, repl, flags });
    const input = readStdinAsUTF8String();
    if (data.flags.includes("g")) {
      const output = input.replaceAll(
        new RegExp(data.regex, data.flags.trim()),
        data.repl
      );
      writeStdoutUTF8String(output);
    } else {
      const output = input.replace(
        new RegExp(data.regex, data.flags.trim()),
        data.repl
      );
      writeStdoutUTF8String(output);
    }
  }
}
