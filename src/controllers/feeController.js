import feeService from "../services/feeService.js";

class FeeController{
    async index(req, res){
        try{
            const result = await feeService.index();
            res.status(200).json({
                message: 'data Fees fetched',
                data: result
            });
        }catch(err){
            res.status(500).json({
                message: err.message
            })
        }
    }

    async show(req,res){
        try{
            const id = req.params.id;

            const result = await feeService.show(id);
            res.status(200).json({
                message: 'data Fee fetched',
                data: result
            });
        }catch(err){
             res.status(500).json({
                message: err.message
            })
        }
    }

    async create(req,res){
        try{
            const data = req.body;

            const result = await feeService.create(data);
            res.status(200).json({
                message: 'data Created succesfully',
                data: result
            });
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

            const result = await feeService.update(id,data);

            res.status(200).json({
                message: 'data Fees fetched',
                data: result
            });
        }catch(err){
             res.status(500).json({
                message: err.message
            })
        }
    }

    async delete(req,res){
        try{
            const id = req.params.id;
            const result = await feeService.delete(id);
            res.status(200).json({
                message: 'data Fees fetched',
                data: result
            });
        }catch(err){
             res.status(500).json({
                message: err.message
            })
        }
    }

}

export default new FeeController();