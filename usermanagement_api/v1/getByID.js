const services = require('./allServices');

module.exports = () => {
    return (req,res) => {
        const result = services.getUserById(req.params.id);
        if (typeof(result) == "string"){
            res.status(404).json({success:false, message: result});
        }
        else{
            res.status(200).json(result);    
        }
        
    }
    
}