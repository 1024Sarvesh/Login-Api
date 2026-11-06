import jwt from "jsonwebtoken";
import 'dotenv/config'

export const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token required.",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token required.",
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        console.log("Decoded Token:", decoded);

        req.user = { id: decoded.userId };

        console.log("User ID:", req.user.id);


        next();
    } catch (error) {

        console.error("Authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Authentication failed.",
        });
    }

}
