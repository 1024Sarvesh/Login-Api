
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token required."
            });
        }

        const token = authHeader.slice(7).trim();


        if (!token || token.split(".").length !== 3) {
            return res.status(401).json({
                success: false,
                message: "Malformed JWT token."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );

        req.user = {
            id: decoded.userId
        };

        console.log("User ID:", req.user.id);

        next();

    } catch (error) {
        console.error("JWT Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};
