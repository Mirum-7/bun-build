import { resolve } from "path";

export const parseEntrypointFromPackageJson = async () => {
  const packageJson: { main?: string } = await import(
    resolve(process.cwd(), "package.json")
  );

  console.log("Parse entrypoint from package.json");

  if (!packageJson.main) {
    throw new Error('"main" field in package.json not found');
  }

  const mainPath = resolve(process.cwd(), packageJson.main);

  const isExist = await Bun.file(mainPath).exists();

  if (!isExist) {
    throw new Error(`file "${packageJson.main}"(package.json[main]) not found in project`);
  }

  console.log(`Found entrypoint: ${packageJson.main}`);

  return [mainPath];
};
