const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const selectiomEmailTemplate = require('../template/selcetionemail');
const rejectionEmail = require('../template/rejectionEmail');

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendEmail(to, subject, htmlContent, cc = '') {
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            cc,
            subject,
            html: htmlContent
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending booking confirmation email:', error);
            throw new Error('Email sending failed');
        }
    }
    async sendRejectionEmail(applicationsToBeRejected) {
        for (const application of applicationsToBeRejected) {
            console.log("APPLICATION",application)
            const htmlContent = rejectionEmail({name:application.name,appliedRole:application.jobId.title});
            
            await this.sendEmail(application.email, 'Application Updates', htmlContent);
            await new Promise((resolve) => setTimeout(resolve, 2000)); 
        }
    }

    async sendSelectionEmail(name,appliedRole,email) {
        const htmlContent = selectiomEmailTemplate({name,appliedRole})
        this.sendEmail(email, 'Application Updates', htmlContent);
    }
}

module.exports = new EmailService();
