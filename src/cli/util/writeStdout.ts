import * as fs from "fs";

export function writeStdoutBuffer(buffer: Buffer): void {
  fs.writeSync(process.stdout.fd, buffer);
}

export function writeStdoutUTF8String(str: string): void {
  return writeStdoutBuffer(Buffer.from(str, "utf-8"));
}

export function writeStdoutUTF8StringLines(
  str: string[],
  crlf: boolean = false
): void {
  return writeStdoutUTF8String(str.join(crlf ? "\r\n" : "\n"));
}
