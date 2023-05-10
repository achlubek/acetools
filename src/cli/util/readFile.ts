import * as fs from "fs";

import { UserError } from "@app/util/exceptions/UserError";

export function readFileAsBuffer(path: string): Buffer {
  if (!fs.existsSync(path)) {
    throw new UserError(`File ${path} does not exist`);
  }
  return fs.readFileSync(path);
}

export function readFileAsUTF8String(path: string): string {
  if (!fs.existsSync(path)) {
    throw new UserError(`File ${path} does not exist`);
  }
  return fs.readFileSync(path, "utf-8");
}

export function readFileAsUTF8StringLines(
  path: string,
  crlf: boolean = false
): string[] {
  if (!fs.existsSync(path)) {
    throw new UserError(`File ${path} does not exist`);
  }
  return fs.readFileSync(path, "utf-8").split(crlf ? "\r\n" : "\n");
}
