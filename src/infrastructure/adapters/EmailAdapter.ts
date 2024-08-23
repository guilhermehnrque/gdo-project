import nodemailer from 'nodemailer';
import LoggerUtils from '../../application/utils/LoggerUtils';
import { EmailAdapterInterface } from "../../application/interfaces/email/EmailAdapterInterface";
import EmailAttributesInterface from '../../application/interfaces/email/EmailAttributesInterface';

export class EmailAdapter implements EmailAdapterInterface {

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
            LoggerUtils.log(`[NodeMailerService] Email foi enviado com sucesso -> ${email.to}, assunto -> ${email.subject}`);
        } catch (error) {
            LoggerUtils.log(`[NodeMailerService] Falha no envio de email: ${error}, para -> ${email.to}, assunto -> ${email.subject}`);
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