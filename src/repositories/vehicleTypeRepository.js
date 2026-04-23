import {VehicleType} from '../models/index.js';

class VehicleTypeRepository{
    async findAll(){
        return await VehicleType.findAll();
    }

    async findById(id){
        return await VehicleType.findByPk(id);
    }

    async create(data){
        return await VehicleType.create(data);
    }

    async findByName(name){
        return await VehicleType.findOne({where: {vehicle_type: name}});
    }

    async update(id, data){
        return await VehicleType.update(data, {where: {id_type: id}});
    }
    async delete(id){
        return await VehicleType.destroy({where: {id_type: id}})
    }
}
export default new VehicleTypeRepository();