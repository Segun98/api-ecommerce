const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_KEY);

async function acknowledge(name, email, role) {
    const content = {
        to: email,
        from: "shegunolanitori@gmail.com",
        subject: "Welcome To PartyStore",
        html: ""
    }
    if (role === "vendor") {
        content.html = `We Are Thrilled To have You Vendor`
    } else {
        content.html = `We Are Thrilled To have You Customer`
    }

    try {
        await sgMail.send(content)
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message not sent.')
    }

}

module.exports = acknowledge