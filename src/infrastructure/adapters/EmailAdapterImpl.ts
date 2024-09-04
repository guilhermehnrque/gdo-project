import nodemailer from 'nodemailer';
import { EmailAdapterInterface } from "../../application/interfaces/email/EmailAdapterInterface";
import { EmailAttributesInterface } from '../../application/interfaces/email/EmailAttributesInterface';
import logger from '../../application/utils/LoggerConfig';

export class EmailAdapterImpl implements EmailAdapterInterface {

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = this.createTransporter();
    }

    async sendEmail(email: EmailAttributesInterface): Promise<void> {
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

    private createTransporter() {
        return nodemailer.createTransport({
            host: process.env.PROJECT_GDO_EMAIL_HOST,
            port: Number(process.env.PROJECT_GDO_EMAIL_PORT),
            auth: {
                user: process.env.PROJECT_GDO_EMAIL_USER,
                pass: process.env.PROJECT_GDO_EMAIL_PASSWORD,
            },
        });
    }
}