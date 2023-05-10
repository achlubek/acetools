import { Command } from "commander";

import { CommandInterface } from "@app/cli/initializeCli";
import { readStdinAsUTF8String } from "@app/cli/util/readStdin";
import { writeStdoutUTF8String } from "@app/cli/util/writeStdout";

export class DosToUnixCommand implements CommandInterface {
  public register(program: Command): void | Promise<void> {
    program.command("dos2unix").action(() => this.execute());
  }

  private execute(): void {
    const content = readStdinAsUTF8String();
    writeStdoutUTF8String(content.replaceAll("/r", ""));
  }
}
