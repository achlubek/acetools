import * as child_process from "child_process";
import * as path from "path";

export function runSync(execPath: string, input: Buffer | string): Buffer {
  if (execPath.startsWith("ace ")) {
    const replacement =
      "node " +
      path.resolve(
        path.dirname(__filename),
        "..",
        "..",
        "..",
        "dist",
        "cli.js"
      );
    const correctedExecPath = replacement + " " + execPath.substring(4);
    return child_process.execSync(correctedExecPath, { input });
  }
  return child_process.execSync(execPath, { input });
}
