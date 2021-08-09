const services = require('./allServices');

module.exports = () => {
    return (req,res)=>{
            const user = {
                name : req.body.name,
                email : req.body.email,
                mobile: req.body.mobile,
                profile: req.file.filename
            }
            const result = services.updateUser(user);
            if (typeof(result) == "string"){
                res.status(401).json({success:false, message: result});
            }
            else{
                res.status(200).json(result);
               console.log("Result is 200");
            }
        }
        
    }
    