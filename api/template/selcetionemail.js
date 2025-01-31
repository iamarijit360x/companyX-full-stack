const selectiomEmailTemplate = (applicantData) => {
    const { name, appliedRole } = applicantData;
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Update</title>
    <style>
        :root {
            color-scheme: light;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #fafafa;
            margin: 0;
            padding: 20px;
            color: #09090b;
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 32px;
            border-radius: 12px;
            border: 1px solid #e2e2e2;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 
                        0 1px 2px rgba(0, 0, 0, 0.09);
        }
        
        .header {
            text-align: center;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid #f3f3f3;
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            color: #09090b;
            margin: 0;
            letter-spacing: -0.025em;
        }
        
        .content {
            color: #4b5563;
            font-size: 15px;
            padding: 0 8px;
        }
        
        .content p {
            margin: 0 0 20px;
        }
        
        .content strong {
            color: #09090b;
            font-weight: 600;
        }
        
        .message-box {
            background-color: #f9fafb;
            border: 1px solid #f3f3f3;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
        }
        
        .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #f3f3f3;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
        }
        
        .footer p {
            margin: 4px 0;
        }
        
        .button-group {
            margin-top: 24px;
            text-align: center;
        }
        
        .button {
            display: inline-block;
            padding: 8px 16px;
            margin: 0 8px;
            background-color: #ffffff;
            color: #09090b;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid #e2e2e2;
            border-radius: 6px;
            transition: all 0.2s ease;
        }
        
        .button:hover {
            background-color: #f9fafb;
            border-color: #d4d4d4;
        }
        
        .company-name {
            color: #09090b;
            font-weight: 600;
            font-size: 15px;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 16px;
            }
            
            .container {
                padding: 24px;
            }
            
            .button-group {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .button {
                margin: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Congratulations!</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We are thrilled to inform you that after a thorough review of all candidates, you have been selected for the <strong>${appliedRole}</strong> position at [Your Company]!</p>
            <p>Your skills, experience, and enthusiasm stood out during the interview process, and we are excited to welcome you to our team.</p>
            <div class="message-box">
                <p>Next steps:</p>
                <ul>
                    <li>You will receive an official offer letter shortly.</li>
                    <li>Feel free to reach out to us at comapnx@exmaple.com if you have any questions.</li>
                </ul>
            </div>
            <p>We look forward to having you on board and contributing to the success of CompanyX.</p>
        </div>
        <div class="footer">
            <p>Best regards,</p>
            <p class="company-name">CompanyX</p>
            <div class="button-group">
                <a href="[Your Website URL]" class="button">Visit our website</a>
                <a href="[Careers Page URL]" class="button">View onboarding resources</a>
            </div>
        </div>
    </div>
</body>
</html>`;
  };
  
  module.exports = selectiomEmailTemplate;