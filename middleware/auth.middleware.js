const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const {token} = req.headers
    if(token){
       try {
            const decode = jwt.verify(token,'solo_project')
            if(decode){
                // req.body.autherID=decode.autherID
                // req.body.auther=decode.auther
                next();
            }
            else{
                res.send({"msg":"Please Login !!!"})
            }
        } catch (error) {
            res.send({"err":error})
        }
    }
    else{        res.send({"msg":"Please Login !!!"})    }}

    module.exports = {
        auth
    }