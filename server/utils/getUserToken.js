import jwt from 'jsonwebtoken';
import ms from 'ms';

const SECRET = process.env.SECRET;
export default (user) => {
    const { email, username } = user;
    const duration = ms('1 day');
    const token = jwt.sign({ email, username }, SECRET, {
        expiresIn: duration
    });
    return token;
}