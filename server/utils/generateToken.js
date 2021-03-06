import jwt from 'jsonwebtoken';
import ms from 'ms';

const SECRET = process.env.SECRET;

export default (user, duration) => {
    const { email, username } = user;
    const token = jwt.sign({ email, username }, SECRET, {
        expiresIn: duration
    });
    return token;
}