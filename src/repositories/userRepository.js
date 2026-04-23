// import User from '../models/User.js';
import {User} from '../models/index.js'

class UserRepository {
    async findByName(username){
        return await User.findOne({where: {username: username}});
    }

    async findAll(){
        return await User.findAll({where: {role: 'operator'}});
    }

    async findById(id){
        return await User.findByPk(id);
    }

    async create(data){
        return await User.create(data);
    }

    

    async update(id, data){
        return await User.update(data, {where: {id_user: id}});
    }
    async delete(id){
        return await User.destroy({where: {id_user: id}})
    }


    async findEmail(email){
        return await User.findOne({where: {email: email}});
    }

    async findNPWP(NPWP){
        return await User.findOne({where: {NPWP: NPWP}});
    }

    async findPhone(number){
        return await User.findOne({where: {phone_number: number}});
    }

}

export default new UserRepository();