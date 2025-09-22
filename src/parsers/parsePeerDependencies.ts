import { parsePackageJson } from "./parsePackageJson";

export const parsePeerDependencies = async () => {
  const { peerDependencies } = await parsePackageJson();

  if (!peerDependencies) {
    return [];
  }

  const dependencies = Object.keys(peerDependencies);

  console.log(`Found peerDependencies: ${dependencies}`);

  return dependencies;
};
