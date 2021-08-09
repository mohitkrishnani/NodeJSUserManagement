const services = require('./allServices');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = () => {
    return (req,res) => {
        const user = jwt.verify(req.headers['authorization'],process.env.KEY);
        const finduser = services.allUsers().filter((element) => {
            return element.email == user.email;
        });
        let id = 0;
        if(finduser.length > 0){
            id = finduser[0].id;
            const result = services.getUserById(id);
            if (typeof(result) == "string"){
                res.status(404).json({success:false, message: result});
            }
            else{
                res.status(200).json(result);    
            }
        
        }

        
        
    }
    
}