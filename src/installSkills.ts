import { mkdir, readdir } from 'fs/promises';
import { join } from 'path';

const copyDir = async (src: string, dst: string): Promise<void> => {
  await mkdir(dst, { recursive: true });

  for (const entry of await readdir(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name);
    const dstPath = join(dst, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, dstPath);
    } else {
      await Bun.write(dstPath, Bun.file(srcPath));
    }
  }
};

export const installSkills = async (): Promise<void> => {
  const src = join(import.meta.dir, '..', 'skills');
  const dst = join(process.cwd(), '.claude', 'skills');

  await copyDir(src, dst);

  console.log('Skills installed to .claude/skills/');
};
