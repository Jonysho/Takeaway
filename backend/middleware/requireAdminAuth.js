const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

// Middleware for admin authentication
const requireAdminAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;
  
    if (!authorization){
      return res.status(401).json({error: 'Authentication token required.'});
    }
  
    const token = authorization.split(' ')[1];
    try {
        const { _id, isAdmin } = jwt.verify(token, process.env.SECRET);
        if (!isAdmin) {
            return res.status(401).json({ error: 'Admin authentication failed. User is not an admin.'});
        }
        req.user = await User.findById(_id).select('_id');
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({error: 'Admin authentication failed. Request is not authorized.'});
    }
}

module.exports = requireAdminAuth