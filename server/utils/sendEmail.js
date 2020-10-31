import nodemailer from 'nodemailer';

const { EMAIL_ACCOUNT, EMAIL_ACCOUNT_PASS, EMAIL_SERVICE } = process.env;


// ethereal testing credentials
const security = 'STARTTLS'
const testingCredentials = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'gussie.raynor@ethereal.email',
        pass: 'yv6afya2MV1Shwr6dp'
    }
}

// Gmail credentials
const credentials = {
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_ACCOUNT_PASS
    }
}
let transporter = nodemailer.createTransport(credentials);



//destructure any object passed to capture keys: to, subject, html
export const sendEmail = ({ to, subject, html }) => {
    const mailOPtions = { from: EMAIL_ACCOUNT, to, subject, html }
    console.log(`Email sent to ${to}`);

    transporter.sendMail(mailOPtions).then((response) => {
        console.log(`Email sent to ${to}`);
        console.log(response);
    }).catch(err => console.error(err));
}