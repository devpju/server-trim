const VERIFICATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác Thực Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #777;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Xác Thực Email</h1>
    </div>
    <div class="content">
        <p>Xin chào,</p>
        <p>Cảm ơn bạn đã đăng ký! Vui lòng sử dụng mã sau để xác thực địa chỉ email của bạn:</p>
        <div class="code">{verificationToken}</div>
        <p>Mã này sẽ hết hạn trong 10 phút. Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.</p>
    </div>
    <div class="footer">
        <p>&copy; 2024 - Trim. Bảo lưu mọi quyền.</p>
    </div>
</div>

</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt Lại Mật Khẩu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #777;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Đặt Lại Mật Khẩu</h1>
    </div>
    <div class="content">
        <p>Xin chào,</p>
        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng nhấn vào nút dưới đây để đặt lại mật khẩu của bạn:</p>
        <a href="LINK_RESET_PASSWORD" class="button">Đặt Lại Mật Khẩu</a>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
    </div>
    <div class="footer">
        <p>&copy; 2024 - Trim. Bảo lưu mọi quyền.</p>
    </div>
</div>

</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt Lại Mật Khẩu Thành Công</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #28a745;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .footer {
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #777;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Đặt Lại Mật Khẩu Thành Công</h1>
    </div>
    <div class="content">
        <p>Xin chào,</p>
        <p>Mật khẩu của bạn đã được thay đổi thành công. Bạn có thể đăng nhập vào tài khoản của mình bằng mật khẩu mới.</p>
        <p>Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với bộ phận hỗ trợ ngay lập tức.</p>
    </div>
    <div class="footer">
        <p>&copy; 2024 - Trim. Bảo lưu mọi quyền.</p>
    </div>
</div>

</body>
</html>
`;

export {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
};
