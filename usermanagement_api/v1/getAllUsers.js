const services = require('./allServices');

module.exports = () => {
    return (req,res)=>{
        console.log("reachedusers");
        res.status(200).json(services.allUsers());
    }
}