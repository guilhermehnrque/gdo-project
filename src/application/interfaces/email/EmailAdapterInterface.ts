import EmailAttributesInterface from "./EmailAttributesInterface";

export interface EmailAdapterInterface {
    sendEmail(email: EmailAttributesInterface): Promise<void>;
  }