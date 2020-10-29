import jwt from 'jsonwebtoken';
import ms from 'ms';

const SECRET = process.env.SECRET;
export default (user) => {
    // we generate the token from unique fields
    // notice we don't include the password
    const { email, username } = user;
    const duration = ms('1 day');
    const token = jwt.sign({ email, username }, SECRET, {
        expiresIn: duration
    });
    return token;
}