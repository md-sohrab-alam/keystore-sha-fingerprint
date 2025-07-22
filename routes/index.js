const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const multer = require('multer');

// Multer setup (file size limit 5MB)
const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.jks') {
      return cb(new Error('Only .jks files are allowed!'));
    }
    cb(null, true);
  }
});

// GET / - show form
router.get('/', (req, res) => {
  res.render('index', { result: null, error: null });
});

// POST /upload - handle keystore upload and fingerprint extraction
router.post('/upload', upload.single('keystore'), (req, res) => {
  const { file } = req;
  const { keystorePassword, keyAlias, keyPassword, javaVersion } = req.body;
  if (!file || !keystorePassword || !keyAlias) {
    if (file) fs.unlinkSync(file.path);
    return res.render('index', { result: null, error: 'All required fields must be filled.' });
  }
  // Determine keytool path based on selected Java version
  let keytoolPath;
  switch (javaVersion) {
    case '8':
      keytoolPath = '/usr/lib/jvm/java-8-openjdk-amd64/bin/keytool';
      break;
    case '11':
      keytoolPath = '/usr/lib/jvm/java-11-openjdk-amd64/bin/keytool';
      break;
    case '17':
    default:
      keytoolPath = '/usr/lib/jvm/java-17-openjdk-amd64/bin/keytool';
      break;
  }
  // Build keytool command
  const keytoolCmd = `${keytoolPath} -list -v -keystore "${file.path}" -storepass "${keystorePassword}" -alias "${keyAlias}"${keyPassword ? ` -keypass "${keyPassword}"` : ''}`;
  exec(keytoolCmd, (err, stdout, stderr) => {
    // Clean up file
    fs.unlink(file.path, () => {});
    if (err) {
      return res.render('index', { result: null, error: stderr || err.message });
    }
    // Extract SHA-1 and SHA-256
    const sha1Match = stdout.match(/SHA1:\s*([A-F0-9:]+)/i);
    const sha256Match = stdout.match(/SHA256:\s*([A-F0-9:]+)/i);
    if (!sha1Match || !sha256Match) {
      return res.render('index', { result: null, error: 'Could not extract fingerprints. Check your inputs.' });
    }
    res.render('index', {
      result: {
        sha1: sha1Match[1],
        sha256: sha256Match[1]
      },
      error: null
    });
  });
});

module.exports = router; 