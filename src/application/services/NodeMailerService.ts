import nodemailer from 'nodemailer';
import 'dotenv/config';
import logger from '../configs/LoggerConfig';
import EmailInterface from './interfaces/EmailInterface';

class NodeMailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.PROJECT_GDO_EMAIL_SERVICE_NAME,
            auth: {
                user: process.env.PROJECT_GDO_EMAIL_USER,
                pass: process.env.PROJECT_GDO_EMAIL_PASSWORD,
            },
        });
    }

    async sendEmail(email: EmailInterface): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.PROJECT_GDO_EMAIL_USER,
                to: email.to,
                subject: email.subject,
                text: email.text
            });
            logger.info(`Email sent successfully to ${email.to}, subject: ${email.subject}`);
        } catch (error) {
            logger.error(`Error sending email: ${error}, to: ${email.to}, subject: ${email.subject}`);
        }
    }
}

export default NodeMailerService;