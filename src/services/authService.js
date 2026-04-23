import userRepository from '../repositories/userRepository.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import LogService from './logService.js';

class AuthService{
    async login(username, password){
        const user = await userRepository.findByName(username)

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch)throw new error('user not found');

        const payload = {
            id: user.id_user,
            role: user.role
        };

        // console.log(user);

        const responder = user.id_user; 

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '4h'});

        if(user.role === 'admin'){
            await LogService.createLog(responder, 'Admin logged in');
        } else if(user.role === 'operator'){
            await LogService.createLog(responder, 'operator logged in');
        }else{

        }

        return {
            token: token,
            userData: {
                id_user: user.id_user,
                username: user.username,
                fullname: user.full_name,
                role: user.role
            }
        }
    }


}

export default new AuthService();