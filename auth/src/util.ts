import jwt from "jsonwebtoken";
import 'dotenv/config';
import bcrypt from "bcryptjs";

export const encryptPassword = (password: string) => new Promise((resolve, reject) => {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			reject(err)
			return false
		}
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) {
				reject(err)
				return false
			}
			resolve(hash)
			return true
		})
	})
})

export const comparePassword = (password: string, hash: string) => new Promise(async (resolve, reject) => {
	try {
		const isMatch = await bcrypt.compare(password, hash)
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})

export const getToken = (payload: string | object | Buffer) => {
    const token = jwt.sign({payload}, `${process.env.SECRET_TOKEN}`, {
        expiresIn: 604800, // 1 Week
    })
    return token
}

export const getPayload = (token: string) => {
    try {
		// Verify JWT Token
        const payload = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
        return { loggedIn: true, payload };
    } catch (err) {
		// Failed Login Status
        // Add Err Message
        return { loggedIn: false }
    }
}
