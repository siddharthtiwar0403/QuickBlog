import jwt from 'jsonwebtoken'

const auth = async(req, res, next) =>{
    const token = req.headers.authorization;

    try {
       await jwt.verify(token, process.env.JWT_SECRET)
        console.log(process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.json({success: false, message: "Invalid token"})
    }
}

export default auth;