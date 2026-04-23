import parkAreaRepository from "../repositories/parkAreaRepository.js";
import logService from "./logService.js";
import { Transaction } from "../models/index.js";

class ParkAreaService{
    async index(){
        return await parkAreaRepository.findAll();
    }

    async show(id){
        return await parkAreaRepository.findById(id);
    }

    async create(data, responder){
        const area = await parkAreaRepository.findByName(data.area_name)
        if(area) throw new error('area name already exist')

        //     // console.log('id',responder);
        const deskripsi = 'Admin added new park area';
        await logService.createLog(responder, deskripsi)

        return await parkAreaRepository.create(data);
    }

    async update(id, data){
        const area = await parkAreaRepository.findByName(data.area_name)
        if(area) throw new error('area name already exist')

        return await parkAreaRepository.update(id, data);
    }

    async delete(id) {
        const checkArea = await parkAreaRepository.findById(id);
        if (!checkArea) {
            throw new Error('Lot parkir tidak ditemukan!');
        }
        if (checkArea.filled > 0) {
            throw new Error('Masih ada kendaraan yang sedang parkir disini!');
        }

        const checkHistory = await Transaction.findOne({ where: { id_area: id } });
        
        if (checkHistory) {
            throw new Error('Gagal Menghapus: Lot parkir ini sudah memiliki riwayat transaksi permanen.');
        }

        return await parkAreaRepository.delete(id);
    }
}

export default new ParkAreaService();