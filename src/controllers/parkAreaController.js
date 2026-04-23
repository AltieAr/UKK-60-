import parkAreaService from "../services/parkAreaService.js";

class ParkAreaController{
    async index(req,res){
        try{
            const result = await parkAreaService.index();

            res.status(200).json({
                message: 'data ParkArea',
                data: result
            })
        }catch(err){
            res.status(500).json({
                message: err.message
            })
        }
    }

    async show(req,res){
        try{
            const id = req.params.id;
            const result = await parkAreaService.show(id);

            res.status(200).json({
                message: 'data parkArea',
                data: result
            })
        }catch(err){
            res.status(500).json({
                message: err.message
            })
        }
    }

    async create(req,res){
        try{
      
            const data = req.body;
            const responder = req.user;

            console.log(responder);

            const result = await parkAreaService.create(data, responder);
            res.status(200).json({
                message: 'new parkArea registered',
                data : result
            })
        }catch(err){
             res.status(500).json({
                message: err.message
            })
        }
    }

    async update(req,res){
        try{
            const id = req.params.id;
            const data = req.body;

            const result = await parkAreaService.update(id,data)
             res.status(200).json({
                message: 'parkArea updated sucesfully',
                data : result
            })
        }catch(err){
             res.status(500).json({
                message: err.message
            })
        }
    }
    async delete(req,res){
        try{
            const id = req.params.id;

            const result = await parkAreaService.delete(id)
            res.status(200).json({
                message: 'parkArea updated sucesfully',
                data : result
            })
        }catch(err){
             res.status(500).json({
                message: err.message
            })
        }
    }
}

export default new ParkAreaController();