const { execSync } = require('child_process');
const fs = require('fs');

// Check if serve is installed
try {
  require.resolve('serve');
  console.log('✓ serve package is installed');
} catch (e) {
  console.log('Installing serve package...');
  execSync('npm install serve --no-save', { stdio: 'inherit' });
}

// Check if port 8080 is already in use
try {
  // Different command for different OS
  if (process.platform === 'win32') {
    const output = execSync('netstat -ano | findstr :8080').toString();
    if (output) {
      console.warn('Warning: Port 8080 may already be in use. Tests might fail if another server is running on this port.');
    }
  } else {
    const output = execSync('lsof -i:8080 -t').toString();
    if (output) {
      console.warn('Warning: Port 8080 may already be in use. Tests might fail if another server is running on this port.');
    }
  }
} catch (e) {
  // If the command fails, it usually means no process is using the port, which is good
  console.log('✓ Port 8080 appears to be available');
}

console.log('Ready to run tests. Use "npm test" to start testing.');
