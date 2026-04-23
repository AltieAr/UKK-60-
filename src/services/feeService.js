import { Fee } from "../models/index.js";
import feeRepository from "../repositories/feeRepository.js";

class FeeService{
    async index(){
        return await feeRepository.findAll();
    }

  async show(id){
        return await feeRepository.findById(id);
    }

    async create(data){
        const id = data.id_type;
        const check = await feeRepository.findType(id);

        // console.log(check);
        if(check)throw new error('this vehicle type already have fee')
        

        return await feeRepository.create(data);
    }

    async update(id, data){
        // const test = data.id_type;
        // const check = await feeRepository.findType(test);

        // if(check)throw new error('this vehicle type already have fee')

        return await feeRepository.update(id, data);
    }

    async delete(id){  
        
        return await feeRepository.delete(id);
    }
}

export default new FeeService();