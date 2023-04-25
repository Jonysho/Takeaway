const nodemailer = require("nodemailer");

module.exports = async(email, subject, text ) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: "jonathanysho@gmail.com",
                pass: "dstjlsditutvdesa"
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log("Email sent Sucessfully")
    } catch (err) {
        console.log(err)
        throw Error("Email not sent");
    }
}