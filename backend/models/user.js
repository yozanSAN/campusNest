const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: { 
    type: String,
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('validate', function(next) {
  console.log('Before validation - Password:', this.password);
  next();
});

userSchema.post('validate', function(doc, next) {
  console.log('After validation - Password:', this.password);
  next();
});

// Add a pre-save hook to catch changes before the hashing hook
userSchema.pre('save', function(next) {
  console.log('Pre-save (before hashing) - Password:', this.password);
  next();
});

userSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered for:', this.email);
  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hash');
    return next();
  }
  console.log('Original password:', this.password);
  this.password = await bcrypt.hash(this.password, 12);
  console.log('Hashed password:', this.password);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);