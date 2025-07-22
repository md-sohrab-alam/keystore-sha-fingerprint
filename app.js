const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.urlencoded({ extended: true }));

// Multer setup (file size limit 5MB)
// const upload = multer({
//   dest: path.join(__dirname, 'uploads'),
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (path.extname(file.originalname) !== '.jks') {
//       return cb(new Error('Only .jks files are allowed!'));
//     }
//     cb(null, true);
//   }
// });
// app.use((req, res, next) => {
//   req.upload = upload;
//   next();
// });

// Routes
app.use('/', require('./routes/index'));

// Error handler
app.use((err, req, res, next) => {
  res.status(500);
  res.render('error', { message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 