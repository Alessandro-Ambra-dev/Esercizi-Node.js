const crypto = require("crypto");

let data = crypto.randomBytes(20);

console.log(`The random bytes genereted are ${data}`);
