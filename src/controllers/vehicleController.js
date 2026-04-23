import vehicleservice from "../services/vehicleservice.js";

class VehicleController{
    async index(req,res){
        try{
            const result = await vehicleservice.index();
            res.status(200).json({
                message: 'Vehicles fetched succ'
            })
        }catch(err){

        }
    }

    async show(req,res){
        try{

        }catch(err){

        }
    }

    async create(req,res){
        try{

        }catch(err){

        }
    }

    async update(req,res){
        try{

        }catch(err){

        }
    }

    async delete(req,res){
        try{

        }catch(err){

        }
    }
}
export default new VehicleController();