const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/'http:\/\/127\.0\.0\.1:8000/g, "(import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '");
    newContent = newContent.replace(/`http:\/\/127\.0\.0\.1:8000/g, "`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}");
    newContent = newContent.replace(/"http:\/\/127\.0\.0\.1:8000/g, "(import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + \"");
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
