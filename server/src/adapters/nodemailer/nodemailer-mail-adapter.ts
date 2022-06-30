import nodemailer from 'nodemailer'
import { MailAdapter, MailAdapterData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d7a3906a70b209",
    pass: "94386f0e566cbb"
  }
});


export class NodemailerMailAdapter implements MailAdapter {

  async sendMail ({ subject, body }: MailAdapterData) {

    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: 'Lucas Diniz <almeidalucas820@gmail.com>',
      subject,
      html: body
    })
  }
}