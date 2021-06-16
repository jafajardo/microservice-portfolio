const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');
const scryptAsync = promisify(scrypt);

class Password {
  static async toHash(password) {
    const salt = randomBytes(8).toString('hex');
    const buf = await scryptAsync(password, salt, 64);
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(savedPassword, suppliedPassword) {
    const [hashed, salt] = savedPassword.split('.');
    const buf = await scryptAsync(suppliedPassword, salt, 64);
    return buf.toString('hex') === hashed;
  }
}

module.exports = Password;
