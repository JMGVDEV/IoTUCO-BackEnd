// Configurations for api server
process.env.PORT = process.env.PORT || 3000;
process.env.IP = process.env.IP || "127.0.0.1";
process.env.JWT_KEY = process.env.JWT_KEY || "JWT_KEY";

module.exports = {
    salt_rounds_bcrypt : 10,
    token_exp_time : '15 days'
    }

