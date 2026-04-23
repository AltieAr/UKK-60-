import logService from "../services/logService.js";

class LogController {
    async index(req, res) {
        try {
            const logs = await logService.getAllLogs();
            res.status(200).json({
                message: 'Logs retrieved successfully',
                data: logs
            });
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

export default new LogController();