const services = require('./allServices');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const key = process.env.KEY;

module.exports = () => {
    return (req,res)=>{
        const user={
            email:req.body.email,
            password:req.body.password
        };

        const result = services.userLogin(user);
        if (typeof(result) == "string"){
            res.status(401).json({success:false, message: result});
        }
        else{
            const name = result.name;
            const email = result.email;
            const loggedinUser = {
                name: name,
                email: email
            }
            const token = jwt.sign(loggedinUser,key);
            res.header("Authorization",token);
            
            result.Authorization = token;
            res.status(200).json(result);

            
        }
    }
    
}