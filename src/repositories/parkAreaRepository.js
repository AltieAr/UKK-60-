import { ParkArea } from "../models/index.js";

class ParkAreaRepository{
    async findAll(){
        return await ParkArea.findAll();
    }

    async findById(id){
        return await ParkArea.findByPk(id);
    }

    async create(data){
        return await ParkArea.create(data);
    }

    async findByName(name){
        return await ParkArea.findOne({where: {area_name: name}});
    }

    async update(id, data){
        return await ParkArea.update(data, {where: {id_area: id}});
    }
    async delete(id){
        return await ParkArea.destroy({where: {id_area: id}})
    }
}

export default new ParkAreaRepository();