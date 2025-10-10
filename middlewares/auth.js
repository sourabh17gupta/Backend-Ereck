const jwt = require("jsonwebtoken");
// Authentication Middleware

exports.AuthN = async (req, res, next) => {
  try {
    const token = req.cookies.token;
      
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No JWT token found",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
    try{
        const role = req.decoded.role;

        if(role !== "admin"){
            return res.status(401).json({
                success: false,
                message:"You are not Permitted in Admin Section!!"
            })
        }

        next();

    } catch(err){
        res.status(500).json({
            success: false,
            message:"Something went wrong while authorizing Attendee"
        })
    }
}

exports.isUser = async (req, res, next) => {
    try{
        const role = req.decoded.role;

        if(role !== "user"){
            return res.status(401).json({
                success: false,
                message:"You are not Permitted in User Section !!"
            })
        }

        next();

    } catch(err){
        res.status(500).json({
            success: false,
            message:"Something went wrong while authorizing Organiser"
        })
    }
}


