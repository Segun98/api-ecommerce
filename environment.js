//endpoints
let local = ['http://localhost:3000', 'http://localhost:5000']
let prod = ['https://adminpartystore.vercel.app', 'https://partystore.vercel.app']


module.exports = process.env.NODE_ENV === "production" ? prod : local