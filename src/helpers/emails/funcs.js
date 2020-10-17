const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_KEY);

async function welcomeVendor(name, email) {
    const content = {
        to: email,
        from: "shegunolanitori@gmail.com",
        subject: "Welcome To PartyStore",
        html: ""
    }

    try {
        await sgMail.send(content)
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message not sent.')
    }

}

async function welcomeCustomer(name, email) {
    const content = {
        to: email,
        from: "shegunolanitori@gmail.com",
        subject: "Welcome To PartyStore",
        html: ""
    }

    try {
        await sgMail.send(content)
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message not sent.')
    }

}

module.exports = {
    welcomeCustomer,
    welcomeVendor
}