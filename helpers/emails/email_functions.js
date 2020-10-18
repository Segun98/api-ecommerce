const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_KEY);

async function welcomeVendor(name, email) {
    const content = {
        to: email,
        from: "shegunolanitori@gmail.com",
        subject: "Welcome To PartyStore",
        html: `<div style="color: #02247a">
        <h3>Hello ${name},</h3>
        <h3>You Have Successfully Signed Up On <strong style="color:purple">PartyStore!</strong></h3>
        <h3>We love our vendors and are looking forward to you making sales with us!</h3>
        <br>
        <h3>Please Read Our Privacy Policy <a href="#">Click Here</a></h3>
        <br>
        <p>Regards,</p>
        <h3>Segun</h3>
        </div>`
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
        html: `<div style="color: #02247a">
        <h3>Hello ${name},</h3>
        <h3>You Have Successfully Signed Up On <strong style="color:purple">PartyStore!</strong></h3>
        <h3>Buying your favourite Party Items has never been this easy!</h3>
        <br>
        <h3>Please Read Our Privacy Policy <a href="#">Click Here</a></h3>
        <p>Regards,</p>
        <h3>Segun.</h3>
        </div>`
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