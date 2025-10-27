const bcrypt = require('bcryptjs');

const password = 'Admin123!';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }

  console.log('Password:', password);
  console.log('Hash:', hash);

  // Test the hash
  bcrypt.compare(password, hash, function(err, result) {
    if (err) {
      console.error('Error comparing:', err);
      return;
    }
    console.log('Verification:', result ? 'SUCCESS' : 'FAILED');
  });

  // Test against the existing hash in database
  const existingHash = '$2b$10$YQmXnJvFZEH8O3rRZ/qHVOXxGLW8jYZXqKj5F9XvV5mYvP0KwYVYm';
  bcrypt.compare(password, existingHash, function(err, result) {
    if (err) {
      console.error('Error comparing with existing hash:', err);
      return;
    }
    console.log('Existing hash verification:', result ? 'SUCCESS' : 'FAILED');
  });
});
