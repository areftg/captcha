const express = require('express');
const svgCaptcha = require('svg-captcha');

const app = express();
const PORT = 3000;

app.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    size: 5,
    noise: 2,
    ignoreChars: '0o1i',
    color: true,
    background: '#ccf'
  });

  console.log('CAPTCHA value:', captcha.text);

  res.type('svg');
  res.status(200).send(captcha.data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
