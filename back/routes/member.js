var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// localhost:3003/member/login
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const userPwd = req.body.userPwd;

  //동일 이메일주소 사용자 조회
  // const loginUser = await Member.findOne({ where: { email: email } });
  const loginUser = { email: '1004@aaa.aaa', userPwd: '1234' };

  if (loginUser) {
    //전달 받은 사용자 암호와 DB에 저장된 암호가 같은지 비교
    // const result = await bcrypt.compare(userPwd, loginUser.userPwd);
    const result = true;

    if (result) {
      //JWT 토큰에 담을 JSON 데이터
      var memberData = {
        email: loginUser.email,
        userName: loginUser.username,
      };

      //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
      const token = jwt.sign(memberData, process.env.JWT_SECRET, {
        expiresIn: '24h', // 60m,10s,24h 60분,10초,24시간
        issuer: 'travelary',
      });

      return res.json({
        code: '200',
        data: { token: token, member: memberData },
        msg: 'Ok',
      });
    } else {
      return res.json({
        code: '400',
        data: {},
        msg: '입력한 암호가 다릅니다.',
      });
    }
  } else {
    return res.json({
      code: '400',
      data: {},
      msg: '아이디가 존재하지 않습니다.',
    });
  }
});

module.exports = router;
