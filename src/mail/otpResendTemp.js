const otpResendTemp = (data) => `
    <html>
    <head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.5;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
    <body>
    <div class="container">
        <h1>Hello, ${data.user}</h1>
        <p>Your new code is: <strong>${data.code}</strong></p>
         <p>This code will be valid for the next ${data.expiresIn} minutes.</p>
        <p>Please use this code to activate your account. If you did not request this, please ignore this email.</p>
        <p>Thank you!</p>
    </div>
    </body>
    </html>
 `;

module.exports = otpResendTemp;
