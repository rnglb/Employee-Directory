const jwt = require('jsonwebtoken');
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.firstName,
      email: user.email,
    },
    'JWT_SECRET',
    {
      expiresIn: '180000',
    }
  );
};


module.exports={ getToken };
