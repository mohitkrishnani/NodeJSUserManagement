const jwt = require('jsonwebtoken');
require('dotenv').config();
const services = require('../usermanagement_api/v1/allServices');

const authmiddleware = (req,res,next) =>{
    const authtoken = req.headers['authorization'];
    console.log(authtoken);
    if (typeof(authtoken) == "string"){
        user = jwt.verify(authtoken, process.env.KEY);
        const list = services.allUsers().filter((element) => {
            return element.email === user.email;
        });
        if (list.length>0){
            res.header("Authorization",authtoken);
            next();
        }
        else{

            res.status(401).json({success:false, message: "You need to be logged in to access this url"});
        }
    }
    else{
        res.status(401).json({success:false, message: "You need to be logged in to access this url"});
    }
}

module.exports={
    authmiddleware
}