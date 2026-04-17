import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId, role) => {
	const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	res.cookie("token", token, {
		httpOnly: true, // prevent xss(cross site scripting) attacks
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 1 * 24 * 60 * 60 * 1000, //1 days
	});

	return token;
};