const UserModel = require('../models/user-model');

class UserService {
     async findUserByPhone(filter){
        //console.log(filter);
        const user = await UserModel.findOne(filter);
        return user;
     }

     async creatUser(data){
        const user = await UserModel.create(data);
        return user;
     }
}


module.exports = new UserService();