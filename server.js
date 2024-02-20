const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
	const { name, email, message } = req.body;
	// const name = req.body.firstName;
	// const email = req.body.email;
	// const message = req.body.message; 

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'abul.hudul@gmail.com',
			pass: 'qmen mxsa slby ckra'
		}
	});

	const mailOptions = {
		from: email,
		to: 'abul.hudul@gmail.com',
		subject: 'New contact form submission',
		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.send('error');
		} else {
			console.log('Email sent: ' + info.response);
			res.send('success');
		}
	});
});

app.listen(3000, () => console.log('Server running on port 3000'));