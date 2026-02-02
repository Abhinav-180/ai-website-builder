import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
export const protect = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        req.userId = session.user.id;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ message: error.message });
        }
        return res.status(401).json({ message: "Unauthorized user" });
    }
};
