import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ err: "Unauthorized: Missing or invalid authentication token" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Check if the user's role is in the list of allowed roles
        const allowedRoles = req.allowedRoles || [];
        if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ err: "Forbidden: Access denied. User role does not have permission to access this route." });
        }

        next();
    } catch (error) {
        return res.status(401).json({ err: "Unauthorized: Invalid authentication token" });
    }
};

export default protectRoute;
