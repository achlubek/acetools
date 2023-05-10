import { ZodError } from "zod";

import { out } from "@app/cli/util/out";
import { InternalError } from "@app/util/exceptions/InternalError";
import { UserError } from "@app/util/exceptions/UserError";

export function outError(err: unknown): void {
  if (err instanceof ZodError) {
    for (const issue of err.issues) {
      const path = issue.path.join("/");
      out("red", `${path.length > 0 ? path : "main"}: ${issue.message}`);
    }
  } else if (err instanceof UserError) {
    out("red", `User Error: ${err.message}`);
  } else if (err instanceof InternalError) {
    out("red", `Server Error: ${err.message}`);
  } else {
    out(
      "red",
      `Generic Error: ${(err as { message?: string }).message ?? "unknown"}`
    );
  }
}
