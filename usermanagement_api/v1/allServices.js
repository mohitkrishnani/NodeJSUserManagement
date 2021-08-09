var bcrypt = require('bcryptjs');
    
const allUsersArray = [{id: 1, name: 'Mohit', mobile:'1234567890',email:'mohit@mail.com',password:'Hello'},{id: 2, name: 'Rohit',mobile:'2345678901', email:'rohit@mail.com',password:'World'}];


const encryptPassword = (pass) =>{
   var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
}

const comparePassword = (storedpass,hash) =>{
    console.log(storedpass,hash);
    return bcrypt.compareSync(storedpass, hash);
}
const allUsers = () =>{
    return getAllUsers();
}
const getAllUsers = () => {
    return allUsersArray;
}

const getUserById = (id) => {
    const user = allUsersArray.filter((EachElement) => {
        return EachElement.id == id;
    });
    if(user.length > 0){
        return user[0];
    }
    else{
        return "ID not found";
    }
    
}
const registerUser = (user) =>{
    const duplicateEmail = allUsersArray.filter((EachElement) => {
        return EachElement.email == user.email;
    });

    if (duplicateEmail.length > 0){
        return "Email already Exists";
    }
    else{
        user.password = encryptPassword(user.password);
        allUsersArray.push(user);
        console.log(allUsersArray);
        return user;
    }

}

const userLogin = (user) =>{
    
    const email = user.email;
    const pass = user.password;
    const loginUser = allUsersArray.filter((EachElement) => {
        return EachElement.email == email;
    });
    console.log(loginUser);
    if (loginUser.length>0){
        if ( comparePassword(pass,loginUser[0].password)){
            return loginUser[0];
        }
        else{
            return "Incorrect Password";
        }

    }
    else{
        return "Email not Registered";
    }
}

const updateUser = (newUser) => {
    if (typeof(newUser.name) == 'undefined' ||
            typeof(newUser.email) == 'undefined' ||
            typeof(newUser.mobile) == 'undefined' ||
            typeof(newUser.profile) == 'undefined'){
                console.log(newUser)
                return "Incomplete Data";
            }
        else{
            const updateUser = allUsersArray.filter((EachElement) => {
                return EachElement.email == newUser.email;
            });
            if(updateUser.length>0){
                let user = updateUser[0];
                let index = allUsersArray.indexOf(updateUser[0]);
                allUsersArray.splice(index,1)
                user.name = newUser.name;
                user.mobile = newUser.mobile;
                user.profile = newUser.profile;
                
                allUsersArray.push(user);
                console.log(allUsersArray);
                return user;
                
                
            }
            else{
                return "Email not found";
            }
        }
}


const updatePass = (passObject) => {
    if (
            typeof(passObject.email) == 'undefined' ||
            typeof(passObject.oldPassword) == 'undefined' ||
            typeof(passObject.newPassword) == 'undefined'){
                console.log(passObject)
                return "Incomplete Data";
        }
        else{
            const updateUser = allUsersArray.filter((EachElement) => {
                return EachElement.email == passObject.email;
            });
            if(updateUser.length>0){
                let user = updateUser[0];
                console.log(user);
                console.log(encryptPassword("bishdi"));
                if(comparePassword(passObject.oldPassword,user.password)){
                    let index = allUsersArray.indexOf(updateUser[0]);
                    allUsersArray.splice(index,1)
                    user.password = encryptPassword(passObject.newPassword);
                    allUsersArray.push(user);
                    console.log(allUsersArray);
                    return user;

                }
                else{
                    return "Incorrect Password"
                }
                
            }
            else{
                return "Email not found";
            }
        }

}

module.exports = {
    allUsers,
    getUserById,
    registerUser,
    userLogin,
    updateUser,
    updatePass
    
}