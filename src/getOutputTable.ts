import type { BuildOutput } from "bun";
import { relative } from "path";
import { formatFileSize } from "./formatFileSize";

export const getOutputTable = (result: BuildOutput) =>
  result.outputs.map((output) => ({
    File: relative(process.cwd(), output.path),
    Type: output.kind,
    Size: formatFileSize(output.size),
  }));
