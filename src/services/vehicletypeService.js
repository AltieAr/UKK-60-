import vehicleTypeRepository from "../repositories/vehicleTypeRepository.js";

class VehicleTypeService{
    async getAllVehicleTypes(){
        return await vehicleTypeRepository.findAll();
    }

    async getVehicleTypeById(id){
        return await vehicleTypeRepository.findById(id);
    }

    async createVehicleType(data,name){
        const vehicle = await vehicleTypeRepository.findByName(name);

        if(vehicle) {
            throw new Error('Vehicle type with this name already exists');
        }

        return await vehicleTypeRepository.create(data);
    }

    async updateVehicleType(id, data, name){

        const vehicle = await vehicleTypeRepository.findByName(name);
        const vehicleid = await vehicleTypeRepository.findById(id);

        if(vehicle) {
            throw new Error('Vehicle type with this name already exists');
        }
        if(!vehicleid) {
            throw new Error('Vehicle type with this name aren`t exists');
        }

        return await vehicleTypeRepository.update(id, data);
    }

    async deleteVehicleType(id){
        return await vehicleTypeRepository.delete(id);
    }
}

export default new VehicleTypeService();