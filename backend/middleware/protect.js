import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ err: "Unauthorized: Missing or invalid authentication token" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the JWT token with the provided secret (JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded data (user information) to the request object for further processing if needed
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ err: "Unauthorized: Invalid authentication token" });
    }
};

export default protectRoute;
