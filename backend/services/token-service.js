const refreshModel = require("../models/refresh-model");

const jwt = require("jsonwebtoken");
const accessTokenJwt = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenJwt = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenJwt, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, refreshTokenJwt, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  verifyAccessToken(token) {
    return jwt.verify(token, accessTokenJwt);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenJwt);
  }

  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({
      userId: userId,
      token: refreshToken,
    });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }

  async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
    
  }
}

module.exports = new TokenService();
