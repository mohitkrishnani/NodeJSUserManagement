const users = require('./getAllUsers')();

const middleware = require('../../middleware/authmiddleware');
const multer = require('multer');

const DIR = './uploads/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

const getU = () =>{
    return users.allUsers1;
}

module.exports = () => {
    const router = require('express').Router();

    router.post('/register',upload.single('avatar'),require('./register')());
    router.get('/user',require('./getAllUsers')());
    router.get('/user/:id',require('./getByID')());
    router.post('/login',require('./login')());
    router.post('/update',middleware.authmiddleware,upload.single('avatar'),require('./update')());
    router.post('/updatePassword',middleware.authmiddleware,require('./updatepass')());
    router.get('/ownInfo',middleware.authmiddleware,require('./owninfo')());
    
    return router;
    
};