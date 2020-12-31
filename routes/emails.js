const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_KEY);

router.post("/sendmails", async (req, res) => {
    const {
        to,
        email,
        body,
        subject
    } = req.body

    const content = {
        to,
        from: email,
        subject,
        html: body
    }

    try {
        await sgMail.send(content)
        return res.status(200).send('Message sent successfully.')
    } catch (error) {
        // console.log('ERROR', error.message)
        return res.status(400).send('Message not sent.')
    }

})

router.post("/contact", async (req, res) => {

    const {
        email,
        body,
        subject
    } = req.body

    const content = {
        to: "shegunolanitori@gmail.com",
        from: email,
        subject,
        text: body
    }

    try {
        await sgMail.send(content)
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        // console.log('ERROR', error.message)
        res.status(400).send('Message not sent.')
    }
});

module.exports = router