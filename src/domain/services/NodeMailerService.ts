import nodemailer from 'nodemailer';
import 'dotenv/config';
import logger from '../../infrastructure/configs/LoggerConfig';
import EmailInterface from './interfaces/EmailInterface';

class NodeMailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.PROJECT_GDO_EMAIL_HOST,
            port: Number(process.env.PROJECT_GDO_EMAIL_PORT),
            auth: {
                user: process.env.PROJECT_GDO_EMAIL_USER,
                pass: process.env.PROJECT_GDO_EMAIL_PASSWORD,
            },
        });
    }

    async sendEmail(email: EmailInterface): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.PROJECT_GDO_EMAIL_FROM,
                to: email.to,
                subject: email.subject,
                text: email.text
            });
            logger.info(`[NodeMailerService] Email foi enviado com sucesso -> ${email.to}, assunto -> ${email.subject}`);
        } catch (error) {
            logger.error(`[NodeMailerService] Falha no envio de email: ${error}, para -> ${email.to}, assunto -> ${email.subject}`);
        }
    }
}

export default NodeMailerService;