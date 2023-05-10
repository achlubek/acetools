import * as fs from "fs";

export function readStdinAsBuffer(): Buffer {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  return fs.readFileSync(process.stdin.fd);
}

export function readStdinAsUTF8String(): string {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  return fs.readFileSync(process.stdin.fd, "utf-8");
}

export function readStdinAsUTF8StringLines(crlf: boolean = false): string[] {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  return fs
    .readFileSync(process.stdin.fd, "utf-8")
    .trim()
    .split(crlf ? "\r\n" : "\n");
}
