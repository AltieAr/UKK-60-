import { Log, User }from '../models/index.js';

class LogService{
    async createLog(id_user, activity){
        try{
            return await Log.create({
                id_user: id_user,
                activity: activity
            });

        }catch(err){
            console.error(err.message);
        }
    }

    async getAllLogs(){
        try{
            return await Log.findAll({
                include: [{
                    model: User,
                    attributes: ['role', 'full_name']
                }]
            });
        }catch(err){
            console.error(err.message);
        }
    }


}

export default new LogService();