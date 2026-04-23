import userService from "../services/userService.js";

class UserController{
    async index(req, res){
        try{
            const result = await userService.index();
            res.status(200).json({
                message: 'data fetched',
                data: result
            });
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
        
    }

    async show(req,res){
        try{
            const id = req.params.id;
            const result = await userService.show(id);
            res.status(200).json({
                message: 'data fetched',
                data: result
            });
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
        
    }

    async create(req,res){
        try{
            const data = req.body;
            const result = await userService.create(data);
            res.status(200).json({
                message: 'data created sucessfuly',
                data: result
            });
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
        
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const data = req.body;

            const result = await userService.update(id, data);
            res.status(200).json({
                message: 'data updated sucesfully',
                data: result
            });
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
        
    }

    async delete(req, res){
        try{
            const id = req.params.id;

            const result = await userService.delete(id);
            res.status(200).json({
                message: 'data deleted sucesfully',
                data: result
            });
        }catch(err){

            if (err.name === 'SequelizeForeignKeyConstraintError' || err.message.includes('foreign key constraint')) {
                return res.status(400).json({ 
                message: "Operator ini tidak bisa dihapus karena sudah memiliki riwayat transaksi" 
             });
            }
        
            res.status(500).json({
                message: err.message
            });
        }
        
    }
}

export default new UserController();