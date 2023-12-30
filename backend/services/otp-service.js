const crypto = require("crypto");
const hashService = require("./hash-service");
const SMS_SID = process.env.SMS_SID;
const SMS_AUTH_TOKEN = process.env.SMS_AUTH_TOKEN;
const SMS_FROM_NUMBER = process.env.SMS_FROM_NUMBER;
const twilio = require("twilio")(SMS_SID, SMS_AUTH_TOKEN, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }
  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your codershouse otp is ${otp}`,
    });
  }

  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);

    if (computedHash == hashedOtp) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new OtpService();
