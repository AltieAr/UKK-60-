import VehicleRepository from "../repositories/VehicleRepository.js";

class VehicleService{
    async index(){
        return await VehicleRepository.findAll();
    }

    async show(id){
        return await VehicleRepository.findById(id);
    }

    async create(data){

        const vehicle = await VehicleRepository.findByName(data.plate_number);

        if (vehicle) {
            throw new Error("Vehicle with this plate number already exists");
        }

        return await VehicleRepository.create(data);
    }

    async update(id, data){
        const vehicle = await VehicleRepository.findByName(data.plate_number);

        if (vehicle) {
            throw new Error("Vehicle with this plate number already exists");
        }

        return await VehicleRepository.update(id,data);
    }

    async delete(id){
        return await VehicleRepository.delete(id);
    }
}

export default new VehicleService();