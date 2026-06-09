import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  console.log('Running vite build...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Resolve absolute path to server.ts to avoid any working directory issues in Vercel/sandboxes
  const serverPath = path.join(__dirname, 'server.ts');
  if (fs.existsSync(serverPath)) {
    console.log(`Found server.ts at ${serverPath}, bundling with esbuild...`);
    const outfile = path.join(__dirname, 'dist', 'server.cjs');
    execSync(`npx esbuild "${serverPath}" --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile="${outfile}"`, { stdio: 'inherit' });
    console.log('Server bundle completed successfully.');
  } else {
    console.warn(`Warning: server.ts not found at ${serverPath}. Skipping server bundle (perfect for static deployments like Vercel).`);
  }
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
