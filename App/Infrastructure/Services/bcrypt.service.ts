const bcrypt = require('bcrypt');
async function hashIt(password: string) {
  try {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (err) {
    throw err;
  }
}
async function compareIt(password: string, hashedPassword: string) {
  try {
    await bcrypt.compare(password, hashedPassword);
    return true;
  } catch (err) {
    return false;
  }
}
export { hashIt, compareIt };
