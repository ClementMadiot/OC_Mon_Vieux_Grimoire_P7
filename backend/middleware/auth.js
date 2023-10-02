const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');



module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.RANDOM_TOKEN_SECRET}`);
    // console.log(decodedToken.userId);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId
    };
    next();
  } catch(error) {
    res.status(401).json({ error })
  }
};