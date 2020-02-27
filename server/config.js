require('dotenv').config();

const {
  ADMINPW
} = process.env;

module.exports = {
  adminpw: ADMINPW,
}