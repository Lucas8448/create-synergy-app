const fs = require('fs');
const path = require('path');

function scaffoldProject(projectDirectory) {
  const basePath = path.join(process.cwd(), projectDirectory);
  fs.mkdirSync(basePath, { recursive: true });
  ['src', 'src/components', 'dist', 'styles'].forEach(dir => {
    fs.mkdirSync(path.join(basePath, dir), { recursive: true });
  });
  fs.writeFileSync(path.join(basePath, 'src', 'index.js'), '// Your main JS file');
  fs.writeFileSync(path.join(basePath, 'styles', 'main.css'), '/* Your main stylesheet */');
  fs.writeFileSync(path.join(basePath, 'dist', 'index.html'), generateHtmlContent());
  console.log(`Project scaffolded successfully in ${basePath}`);
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

module.exports = { scaffoldProject };