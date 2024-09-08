import { EmailAdapterImpl } from "../../infrastructure/adapters/EmailAdapterImpl";
import { EmailAttributesInterface } from "../interfaces/email/EmailAttributesInterface";

export class EmailService {

    private emailAdapter: EmailAdapterImpl;

    constructor() {
        this.emailAdapter = new EmailAdapterImpl();
    }

    async sendEmailForgotPassword(email: string, token: string): Promise<void> {
        const mailOptions: EmailAttributesInterface = {
            to: email,
            subject: '[GDO] Recuperação de senha',
            text: `Você está recebendo esta mensagem porque você (ou outra pessoa) solicitou a redefinição da senha da sua conta.\n\n
                    Por favor, clique no link a seguir ou cole-o no seu navegador para concluir o processo:\n\n
                    http://localhost:3000/api/v1/auth/reset-password/${token}\n\n
                    Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá inalterada.\n`,
        };

        this.emailAdapter.sendEmail(mailOptions);
    }

}