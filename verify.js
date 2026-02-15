#!/usr/bin/env node

/**
 * Project Setup & Verification Script
 * Run this to verify everything is properly configured
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const checks = [];

function check(name, condition, details = '') {
  const status = condition ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
  console.log(`${status} ${name}`);
  if (details && !condition) {
    console.log(`  ${colors.yellow}→ ${details}${colors.reset}`);
  }
  checks.push({ name, condition });
}

function directoryExists(dir) {
  return fs.existsSync(dir);
}

function fileExists(file) {
  return fs.existsSync(file);
}

function commandExists(cmd) {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

console.log(`\n${colors.blue}📋 AI Media Hub - Project Verification${colors.reset}\n`);

// Check Node.js
console.log(`${colors.blue}System Requirements:${colors.reset}`);
check('Node.js installed', commandExists('node'), 'Install Node.js 18+');
check(
  'npm installed',
  commandExists('npm'),
  'npm should come with Node.js'
);

// Check directories
console.log(`\n${colors.blue}Project Structure:${colors.reset}`);
check('Client directory', directoryExists('./client'), 'Frontend code');
check('Server directory', directoryExists('./server'), 'Backend code');
check('Shared directory', directoryExists('./shared'), 'Shared types');

// Check configuration files
console.log(`\n${colors.blue}Configuration Files:${colors.reset}`);
check('Client package.json', fileExists('./client/package.json'));
check('Server package.json', fileExists('./server/package.json'));
check('Client tsconfig.json', fileExists('./client/tsconfig.json'));
check('Server tsconfig.json', fileExists('./server/tsconfig.json'));
check('Tailwind config', fileExists('./client/tailwind.config.js'));
check('Vite config', fileExists('./client/vite.config.ts'));
check('Docker Compose', fileExists('./docker-compose.yml'));

// Check source files
console.log(`\n${colors.blue}Source Files:${colors.reset}`);
check('Client entry point', fileExists('./client/src/main.tsx'));
check('Server entry point', fileExists('./server/src/index.ts'));
check('React App component', fileExists('./client/src/App.tsx'));
check('API service', fileExists('./client/src/services/api.ts'));
check('Auth controller', fileExists('./server/src/controllers/authController.ts'));
check('Content controller', fileExists('./server/src/controllers/contentController.ts'));

// Check documentation
console.log(`\n${colors.blue}Documentation:${colors.reset}`);
check('Main README', fileExists('./README.md'), 'Full project documentation');
check('Getting Started', fileExists('./GETTING_STARTED.md'), 'Quick setup guide');
check('API Reference', fileExists('./API_REFERENCE.md'), 'API endpoint docs');
check('Deployment Guide', fileExists('./DEPLOYMENT.md'), 'Production deployment');
check('Troubleshooting', fileExists('./TROUBLESHOOTING.md'), 'Common issues');
check('Features List', fileExists('./FEATURES.md'), 'Complete features');

// Check dependencies
console.log(`\n${colors.blue}Dependencies:${colors.reset}`);
const clientPackage = JSON.parse(fs.readFileSync('./client/package.json', 'utf8'));
const serverPackage = JSON.parse(fs.readFileSync('./server/package.json', 'utf8'));

check('React installed', 'react' in clientPackage.dependencies);
check('TypeScript installed', 'typescript' in clientPackage.devDependencies);
check('Tailwind installed', 'tailwindcss' in clientPackage.devDependencies);
check('Express installed', 'express' in serverPackage.dependencies);
check('MongoDB driver', 'mongoose' in serverPackage.dependencies);
check('JWT support', 'jsonwebtoken' in serverPackage.dependencies);

// Check environment templates
console.log(`\n${colors.blue}Environment Setup:${colors.reset}`);
check('Client env template', fileExists('./client/.env.example'));
check('Server env template', fileExists('./server/.env.example'));

// Check if node_modules exist (installed)
console.log(`\n${colors.blue}Installation Status:${colors.reset}`);
check(
  'Client dependencies installed',
  directoryExists('./client/node_modules'),
  'Run: cd client && npm install'
);
check(
  'Server dependencies installed',
  directoryExists('./server/node_modules'),
  'Run: cd server && npm install'
);

// Summary
const passed = checks.filter((c) => c.condition).length;
const total = checks.length;
const percentage = Math.round((passed / total) * 100);

console.log(`\n${colors.blue}Summary:${colors.reset}`);
console.log(`${colors.green}✓ Passed${colors.reset}: ${passed}/${total} (${percentage}%)`);

if (passed === total) {
  console.log(
    `\n${colors.green}✨ Everything looks good! You're ready to start development.${colors.reset}`
  );
  console.log(`\n${colors.yellow}Next steps:${colors.reset}`);
  console.log('1. Ensure MongoDB is running');
  console.log('2. Start the server: cd server && npm run dev');
  console.log('3. Start the client: cd client && npm run dev');
  console.log('4. Open http://localhost:5173 in your browser');
} else {
  console.log(
    `\n${colors.yellow}⚠️  Some checks failed. Please review the items above.${colors.reset}`
  );
}

console.log('');
process.exit(passed === total ? 0 : 1);
