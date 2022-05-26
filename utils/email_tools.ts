import * as nodemailer from 'nodemailer'

interface SendEmailType {
  to_name: string;
  to: string;
  subject: string;
  message: string;
}

export function getCertificationContents(cert_number: number, link: string) {
  const contents = `<div style='width: 500px; height: 150px; 
  display: flex; flex-direction: column; align-items: center;
   justify-content: space-around; margin: 0 auto'
   >
    <h2 style='text-align: center'>[어디어디]입니다.<br/>아래 링크로 접속하여 인증번호를 입력해주세요.</h2>
    <p style='text-align: center; font-size: 1.15rem'>인증번호는 <b>${cert_number}</b>입니다.<br/>링크 : <a href='${link}' target='_blank'>${link}</a></p>
  </div>`

  return contents;
}

export async function sendEmail(data: SendEmailType) {
  return new Promise((resolve, reject) => {
    const { to_name, to, subject, message } = data
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail=.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOption = {
      from: {
        name: '[어디어디]', // 보내는 사람 이름
        address: `${process.env.EMAIL_ADDRESS}` // 보내는 사람 이메일 주소
      },
      to: {
        name: to_name, // 받는 사람 아름
        address: to // 받는 사람 이메일 주소
      },
      subject, // 메일 제목
      html: message // 메일 메시지
    };
    smtpTransport.sendMail(mailOption, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  })
}