const bcrypt = require("bcryptjs"),
    crypto = require("crypto");

const email = 'customer@gmail.com';
const passwd = 'password';

let salt = bcrypt.genSaltSync(10);

let emailhash = crypto.createHash('sha256').update(email).digest('hex');
let passwdhash = crypto.createHash('sha256').update(passwd).digest('hex');
let tobehashed = [emailhash, passwdhash].join('+');

let hash = bcrypt.hashSync(tobehashed, salt);

console.log(hash);