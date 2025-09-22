import { resolve } from "path";

interface PackageJson {
  main?: string;
  peerDependencies?: Record<string, string>;
}

let PackageJsonCache: PackageJson | null = null;

export const parsePackageJson = async () => {
  if (PackageJsonCache) {
    return PackageJsonCache;
  }

  console.log("Parse package.json");

  const packageJson: PackageJson = await import(
    resolve(process.cwd(), "package.json")
  );

  PackageJsonCache = packageJson;

  return packageJson;
};
