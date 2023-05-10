import * as chalk from "chalk";

type SimpleFunction = (str: string) => string;
type OnlyChalkColors<T extends keyof chalk.Chalk> =
  chalk.Chalk[T] extends SimpleFunction ? T : never;

export const out = <T extends keyof chalk.Chalk>(
  color: OnlyChalkColors<T>,
  str: string
): void => {
  // ah yes
  // eslint-disable-next-line no-console,@typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.error(chalk[color](str));
};
