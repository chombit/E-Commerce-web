const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(401).json({
                    message: "Token is not valid.",
                });
            }

            req.user = {
                userId: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            };

            next();
        } catch (error) {
            return res.status(401).json({
                message: "Token is not valid.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error during authentication",
        });
    }
};

// Authorize specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role '${req.user.role}' is not authorized to access this route`,
            });
        }
        next();
    };
};

// Optional authentication (for routes that work with or without auth)
exports.optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.userId);

                if (user) {
                    req.user = {
                        userId: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    };
                }
            } catch (error) {
                // Token is invalid, but continue without user
            }
        }

        next();
    } catch (error) {
        next();
    }
};