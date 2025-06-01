const express = require('express');
const svgCaptcha = require('svg-captcha');
const path = require('path');

const app = express();
const PORT = 3000;

let currentCaptcha = ''; // ذخیره مقدار کپچا برای مقایسه ساده (تست)

app.use(express.static('public')); // سرو فایل‌های فرانت

app.use(express.urlencoded({ extended: true })); // برای پارس کردن فرم

// مسیر تولید کپچا
app.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 2,
      ignoreChars: '0o1i',
      color: true,
      background: 'blue'
    });
  
    const svg = captcha.data;
  
    // گرفتن عرض و ارتفاع از SVG برای ساخت rect
    const widthMatch = svg.match(/width="(\d+)"/);
    const heightMatch = svg.match(/height="(\d+)"/);
    const width = widthMatch ? widthMatch[1] : 150;
    const height = heightMatch ? heightMatch[1] : 50;
  
    const styledSvg = svg.replace(
      '>',
      `>
      <style>
        text {
          font-family: "Courier New", monospace;
          font-size: 50px;
        }
      </style>
      <rect x="0" y="0" width="${width}" height="${height}" rx="12" ry="12" fill="blue" stroke="#888" stroke-width="2"/>
    `
    );
  
    res.type('svg');
    res.send(styledSvg);
  });

// مسیر بررسی کپچا
app.post('/verify', (req, res) => {
  const userInput = req.body.captcha;
  const result = userInput === currentCaptcha;

  res.send(result ? '✅ CAPTCHA درست بود!' : '❌ CAPTCHA اشتباه بود!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
