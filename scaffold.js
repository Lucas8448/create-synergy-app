const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function scaffoldProject(projectDirectory) {
  const basePath = path.join(process.cwd(), projectDirectory);
  fs.mkdirSync(basePath, { recursive: true });
  ['src', 'src/components', 'dist', 'styles'].forEach(dir => {
    fs.mkdirSync(path.join(basePath, dir), { recursive: true });
  });
  fs.writeFileSync(path.join(basePath, 'src', 'index.js'), '// Your main JS file');
  fs.writeFileSync(path.join(basePath, 'styles', 'main.css'), '/* Your main stylesheet */');
  // get webpack.config.js from our folder, and add it to scaffold
  fs.copyFileSync(path.join(__dirname, 'webpack.config.js'), path.join(basePath, 'webpack.config.js'));
  fs.writeFileSync(path.join(basePath, 'index.html'), generateHtmlContent());
  console.log(`Project scaffolded successfully in ${basePath}`);
  initializeNpmAndInstallPackages(basePath);
  addNpmScripts(basePath);
}

function generateHtmlContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Synergy App</title>
  <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
  <div id="app"></div>
  <script src="../src/index.js"></script>
</body>
</html>`;
}


function initializeNpmAndInstallPackages(basePath) {
  console.log('Initializing npm and installing packages...');
  process.chdir(basePath);
  execSync('npm init -y', { stdio: 'inherit' });
  const packagesToInstall = [
    'synergy-js',
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    'html-webpack-plugin',
    'babel-loader',
    '@babel/core',
    '@babel/preset-env',
    'style-loader',
    'css-loader',
    'clean-webpack-plugin'
  ].join(' ');
  
  execSync(`npm install ${packagesToInstall}`, { stdio: 'inherit' });
}

function addNpmScripts(basePath) {
  const packageJsonPath = path.join(basePath, 'package.json');
  const packageJson = require(packageJsonPath);

  packageJson.scripts = {
    "start": "webpack serve --open --mode development",
    "build": "webpack --mode production"
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

module.exports = { scaffoldProject };