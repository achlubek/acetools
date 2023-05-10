import { Command } from "commander";
import { z } from "zod";

import { CommandInterface } from "@app/cli/initializeCli";
import { runSync } from "@app/cli/util/exec";
import { readStdinAsUTF8StringLines } from "@app/cli/util/readStdin";
import {
  writeStdoutBuffer,
  writeStdoutUTF8String,
} from "@app/cli/util/writeStdout";

export class LinesForeachCommand implements CommandInterface {
  public register(program: Command): void | Promise<void> {
    program
      .command("lines:foreach")
      .argument("<execparts...>", "What to do")
      .action((execparts) => this.execute(execparts));
  }

  private schema = z.object({
    exec: z.string().min(1),
  });

  private execute(execparts: unknown): void {
    const exec = z.array(z.string());
    const data = this.schema.parse({
      exec: exec.parse(execparts).join(" "),
    });
    const lines = readStdinAsUTF8StringLines();
    for (const line of lines) {
      const result = runSync(data.exec, line);
      writeStdoutBuffer(result);
      writeStdoutUTF8String("\n");
    }
  }
}
