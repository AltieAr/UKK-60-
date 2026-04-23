import userRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';

class UserService{
    async index(){
        return await userRepository.findAll();
    }

    async show(id){
        const result = await userRepository.findById(id);
        if (result.role === 'owner'){
            throw new error('you can`t view this user')
        }

        return result
    }

    async create(data){
        const email = await userRepository.findEmail(data.email);
        const NPWP = await userRepository.findNPWP(data.NPWP);
        const username = await userRepository.findByName(data.username);
        const findPhone = await userRepository.findPhone(data.phone_number);

        if(email){
            throw new error('email already exist')
        }else if(NPWP){
            throw new error('NPWP already exist')
        } else if(username){
            throw new error('username already exist')
        }else if(findPhone){
            throw new error('Phone number already exist')
        }else{}
        
        const pass = data.password 

        const hashedpassword = await bcrypt.hash('owner123',10);


        const payload = {
            ...data,
            role: 'operator',
            password: hashedpassword

        }
        return await userRepository.create(payload);
    }

    async update(id,data){
        // const email = await userRepository.findEmail(data.email);
        // const NPWP = await userRepository.findNPWP(data.NPWP);
        // const username = await userRepository.findByName(data.username);
        // const findPhone = await userRepository.findPhone(data.phone_number);

        // if(email){
        //     throw new error('email already exist')
        // }else if(NPWP){
        //     throw new error('NPWP already exist')
        // } else if(username){
        //     throw new error('username already exist')
        // }else if(findPhone){
        //     throw new error('Phone number already exist')
        // }else{}

        const payload = {
            ...data,
            role: 'operator'
        }
        return await userRepository.update(id,payload);
    }

    async delete(id){
        return await userRepository.delete(id);
    }
}

export default new UserService();