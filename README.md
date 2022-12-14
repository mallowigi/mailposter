# express-smtp-mailer

***

| Status | Usage | Tooling | Security | Support |
| :----: | :---: | :-----: | :------: | :-----: |
| [![Build Status](https://travis-ci.com/killshot13/express-smtp-mailer.svg?branch=main)](https://travis-ci.com/killshot13/express-smtp-mailer) | [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) | [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) | [![Known Vulnerabilities](https://snyk.io/test/github/killshot13/express-smtp-mailer/badge.svg)](https://snyk.io/test/github/killshot13/express-smtp-mailer) | [![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/killshot13/express-smtp-mailer/graphs/traffic) |

>ATTENTION: VERSION 2.0.0 HAS BEEN RELEASED. THIS IS A MAJOR SERMVER VERSIONING UPDATE AKA INCLUDES BREAKING CHANGES. PLEASE BE AWARE AND DON'T HESITATE TO REACH OUT IF YOU ARE EXPERIENCING NEGATIVE SIDE-EFFECTS FROM THE LATEST UPDATE.

## [VIEW PROJECT CHANGELOG](https://github.com/killshot13/express-smtp-mailer/wiki/Version-Release-Notes)
## [READ STEP-BY-STEP WALKTHROUGH](https://daily.dev/posts/how-to-build-an-smtp-mail-server-with-express-node-and-gmail)

### Installation

`git clone` this repository

`cd express-smtp-mailer` to enter root directory

`npm install` to acquire the `node_modules`

`code .` to open VS Code (or your favorite editor)

### Configuration

create a new `.env` file in the root directory

use the `process.env` variables defined in the `.env.example` and `./routes/mailrouter.js` files to setup authentication

for development and testing, create an [Ethereal account](https://ethereal.email/create) and enter the credentials of the testing account (if desired)

_`process.env.SMTP_DEV_EMAIL=''`_

_`process.env.SMTP_DEV_PASSWORD=''`_

for production, you need to create a project on Google Cloud Platform, create an internal project, authorize the Gmail API, and then establish a connection with your Google account. You can [authenticate using OAuth 2.0](https://cloud.google.com/docs/authentication) via the Google API Playground, and once you perform the initial authentication and accept the request permissions, Nodemailer will take over and automatically renew your login so it doesn't actually expire in production.

			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: process.env.ACCESS_TOKEN,

### Testing

go back to the terminal and run `npm run dev`

it should print out the following lines

`Node dev server: listening on port 5000`

`Ready to send mail!`

verify full functionality by replacing `'./frontend/frontend.js'` with your own API routes and linking them to the endpoints defined in `./routes/mailrouter.js` and `./server.js`

### Success

and there you have it!

a deployment-ready express smtp mail server
