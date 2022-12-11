// @ts-nocheck
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const router = require('express').Router()
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const isDev = process.env.NODE_ENV !== 'production'

//this is the authentication for sending email.
let transport
if (!isDev) {
	transport = {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // use TLS
		//create a .env file and define the process.env variables with your credentials.
		auth: {
			type: 'OAuth2',
			user: process.env.SMTP_FROM_EMAIL,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: process.env.ACCESS_TOKEN,
		},
	}
} else {
	transport = {
		host: 'localhost',
		port: 1025,
		//create a Ethereal test account @https://ethereal.email/create
		// auth: {
		// 	user: process.env.SMTP_DEV_EMAIL,
		// 	pass: process.env.SMTP_DEV_PASSWORD,
		// },
	}
}

// call the transport function
const transporter = nodemailer.createTransport(transport)
transporter.verify((err, res) => {
	if (err) {
		//if error happened code ends here
		console.error(err)
	} else {
		//this means success
		console.log('Ready to send mail!')
	}
})

// Set app to use proper methods to parse our data
// parse application/json
router.use(bodyParser.json())
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }))

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-reqed-With, Content-Type, Accept',
	)
	next()
})
router.get('/mailrouter', (req, res) => {
	res.status(200).json({ msg: 'Working' })
})

router.post('/mailrouter', (req, res) => {
	//make mailable object
	const mailOptions = {
		from: `My company <localhost@mailhog.local>`, // sender address
		to: ['heliosaian@gmail.com'], // list of receivers
		replyTo: req.body.email,
		subject: 'NEW FORM SUBMISSION! ✔', // Subject line
		text: req.body.message,
		html: `
<h4>Information</h4>
<hr><br>
<code>${JSON.stringify(req.body, null, 2)}</code>`,
		dsn: {
			id: 'smtp-dsn-report',
			return: 'full',
			notify: ['success', 'failure', 'delay'],
			recipient: 'heliosaian@gmail.com',
		},
	}

	//send mail to recipient
	transporter.sendMail(mailOptions, (err, res) => {
		if (err) {
			console.log(err)
		} else {
			console.log(res)
		}
	})
	res.set('Content-Type', 'application/json')
	res.send('{"status":"200"}')
})

module.exports = router
