export const template = (email) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background-color:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.05);">

<!-- Header -->
<tr>
<td style="background:#4e8991;padding:25px;text-align:center;color:#ffffff;">
<h1 style="margin:0;font-size:26px;">Welcome!</h1>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;text-align:center;color:#333;font-size:16px;line-height:1.6;">

<h2 style="margin-top:0;">Verify Your Email Address</h2>

<p>
Thank you for creating an account with us.
To complete your registration, please verify your email address by clicking the button below.
</p>

<table align="center" cellpadding="0" cellspacing="0" style="margin:30px auto;">
<tr>
<td style="background:#4e8991;border-radius:6px;">
<a href="http://localhost:3000/verify/${email}"
style="display:inline-block;padding:14px 35px;color:#ffffff;font-weight:bold;text-decoration:none;font-size:16px;">
Verify Email
</a>
</td>
</tr>
</table>

<p style="color:#777;font-size:14px;">
If the button doesn't work, copy and paste this link into your browser:
</p>

<p style="word-break:break-all;color:#4e8991;font-size:14px;">
http://localhost:3000/verify/${email}
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f0f0f0;padding:20px;text-align:center;font-size:13px;color:#888;">
<p style="margin:0;">If you did not create this account, you can safely ignore this email.</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};