const services = require('./allServices');

module.exports = () => {
    return (req,res)=>{
            const user = {
                email : req.body.email,
                oldPassword: req.body.oldPassword,
                newPassword: req.body.newPassword
            }
            console.log(user)
            const result = services.updatePass(user);
            if (typeof(result) == "string"){
                res.status(401).json({success:false, message: result});
            }
            else{
                res.status(200).json(result);
               console.log("Result is 200");
            }
        }
        
    }
    