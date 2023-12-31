const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const TokenService = require("../services/token-service");
const userDto = require("../dtos/user-dto");
const tokenService = require("../services/token-service");

class AuthController {
  async sendOtp(req, res) {
    let { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }

    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60 * 2; // 2 minutes;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // send otp verification
    try {
      // await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Otp sending failed" });
    }

    //res.json({ hash: hash });
  }

  async verifyOtp(req, res) {
    const { phone, otp, hash } = req.body;

    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields are required" });
    }

    const [hashOtp, expires] = hash.split(".");
    if (Date.now > +expires) {
      res.status(400).json({ message: "Otp expried" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashOtp, data);
    if (!isValid) {
      res.status(400).json({ message: "Invalid otp" });
    }

    let user;

    try {
      user = await userService.findUserByPhone({ phone });
      if (!user) {
        user = await userService.creatUser({ phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Db error" });
    }

    // token

    const { accessToken, refreshToken } = TokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    TokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const userdataDto = new userDto(user);
    res.json({ user: userdataDto, auth: true });
  }

  async refresh(req, res) {
    // get refresh token from cookie
    const { refreshToken: refreshtokenfromcookie } = req.cookies;

    let userData;
    //check token is valid
    try {
      userData = await tokenService.verifyRefreshToken(refreshtokenfromcookie);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid Token from verifytoken" });
    }

    // check if token is db
    //  console.log(refreshtokenfromcookie)
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshtokenfromcookie
      );
      // console.log(token);
      if (!token) {
        return res.status(401).json({ message: "Invalid token from check db" });
      }
    } catch (error) {
      return res.status(500).json({ messgae: "internal error " });
    }

    //check if valid user
    const user = await userService.findUserByPhone({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate new tokens
    const { refreshToken, accessToken } = TokenService.generateTokens({
      _id: userData._id,
    });

    // refresh token update
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ messgae: "internal error " });
    }
    // put in cookies
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const userdataDto = new userDto(user);
    res.json({ user: userdataDto, auth: true });

    // response
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
        // delete refresh token from db
        await tokenService.removeToken(refreshToken);
        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false });
  }
}

module.exports = new AuthController();
