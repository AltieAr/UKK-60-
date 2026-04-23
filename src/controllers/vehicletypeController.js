import vehicletypeService from "../services/vehicletypeService.js";

class VehicleTypeController {
    async index(req, res){
        try{
            const VehicleTypes = await vehicletypeService.getAllVehicleTypes();
            res.status(200).json({
                message: 'Vehicle Types fetched successfully', 
                data: VehicleTypes
            })
        }catch(err){
            res.status(500).json({
                error: err.message
            })
        }
    }

    async show(req,res){
        try{
            const id = req.params.id;
            const vehicleType= await vehicletypeService.getVehicleTypeById(id);
            res.status(200).json({
                message: 'vehicle fetched succesfully',
                data: vehicleType
            });

        }catch(err){
            res.status(500).json({
                error: err.message
            })
        }
    }

    async create(req,res){
        try{
            const data = req.body;
            const name = data.vehicle_type;

            const vehicle = await vehicletypeService.createVehicleType(data, name);
            res.status(201).json({
                message: 'Vehicle type created successfully',
                data: vehicle
            });

        }catch(err){
            res.status(500).json({
                error: err.message
            })
        }
    }

    async update(req,res){
        try{
            const id = req.params.id;
            const data = req.body;
            const name = data.vehicle_type;

            const vehicle = await vehicletypeService.updateVehicleType(id, data, name);
            res.status(200).json({
                message: 'Vehicle type updated successfully',
                data: vehicle
            });
        }catch(err){
            res.status(500).json({
                error: err.message
            })
        }
    }

    async delete(req,res){
        try{
            const id = req.params.id;
            await vehicletypeService.deleteVehicleType(id);
            res.status(200).json({
                message: 'Vehicle type deleted succesfully'
            })
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    
    }
}

export default new VehicleTypeController();