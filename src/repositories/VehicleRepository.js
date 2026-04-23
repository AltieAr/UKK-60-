import { Vehicle } from "../models/index.js";

class VehicleRepository{
    async findAll(){
        return await Vehicle.findAll();
    }

    async findById(id){
        return await Vehicle.findByPk(id);
    }

    async create(data){
        return await Vehicle.create(data);
    }

    async findByName(name){
        return await Vehicle.findOne({where: {plate_number: name}});
    }

    async update(id, data){
        return await Vehicle.update(data, {where: {id_vehicle: id}});
    }
    async delete(id){
        return await Vehicle.destroy({where: {id_vehicle: id}})
    }
}

export default new VehicleRepository();
