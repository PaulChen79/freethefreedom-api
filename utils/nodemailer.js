const nodemailer = require('nodemailer')

const sendMail = async (mailTo, verificationURL) => {
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
      subject: 'Email verification',
      text: `Please click this url to verify your email: ${verificationURL}`
    })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { sendMail }
