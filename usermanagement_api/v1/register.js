const services = require('./allServices');
require('dotenv').config();



module.exports = () => {
    return (req,res)=>{
        const id = services.allUsers().length+1;
        if (typeof(req.body.name) == 'undefined' ||
            typeof(req.body.email) == 'undefined' ||
            typeof(req.body.password) == 'undefined' ||
            typeof(req.body.mobile) == 'undefined' ||
            typeof(req.file.filename) == 'undefined'){
                res.status(404).json({success:false, message: "Incomplete Data"});

            }
        else{
            const user={
                id : id,
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                mobile:req.body.mobile,
                profile:req.file.filename

            };
            const result = services.registerUser(user);
            if (typeof(result) == "string"){
                res.status(401).json({success:false, message: result});
            }
            else{
                res.status(200).json(result);
               console.log("Result is 200");
            }


        }
        
    }
    
}