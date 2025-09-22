import { resolve } from "path";
import { parsePackageJson } from "./parsePackageJson";

export const parseEntrypointFromPackageJson = async () => {
  const { main } = await parsePackageJson();

  if (!main) {
    throw new Error('"main" field in package.json not found');
  }

  const mainPath = resolve(process.cwd(), main);

  const isExist = await Bun.file(mainPath).exists();

  if (!isExist) {
    throw new Error(`file "${main}"(package.json[main]) not found in project`);
  }

  console.log(`Found entrypoint: ${main}`);

  return [mainPath];
};
