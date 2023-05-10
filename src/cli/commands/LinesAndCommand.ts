import { Command } from "commander";
import { z } from "zod";

import { CommandInterface } from "@app/cli/initializeCli";
import { readFileAsUTF8StringLines } from "@app/cli/util/readFile";
import { writeStdoutUTF8StringLines } from "@app/cli/util/writeStdout";

export class LinesAndCommand implements CommandInterface {
  public register(program: Command): void | Promise<void> {
    program
      .command("lines:and")
      .argument("file1", "1st set of lines")
      .argument("file2", "2st set of lines")
      .action((file1, file2) => this.execute(file1, file2));
  }

  private schema = z.object({
    file1: z.string().min(1),
    file2: z.string().min(1),
  });

  private execute(file1: unknown, file2: unknown): void {
    const data = this.schema.parse({ file1, file2 });
    const lines1 = readFileAsUTF8StringLines(data.file1);
    const lines2 = readFileAsUTF8StringLines(data.file2);
    const result = lines1.filter((l) => lines2.includes(l));
    writeStdoutUTF8StringLines(result);
  }
}
