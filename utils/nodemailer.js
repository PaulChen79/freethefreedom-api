const nodemailer = require('nodemailer')

const sendMail = async (mailTo, subject, verificationURL, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: mailTo,
      subject: subject,
      text: `Please click this url to verify your email: ${verificationURL}`
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { sendMail }
