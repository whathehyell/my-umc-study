import { addStoreService } from "../services/region.service.js";

export const addStoreToRegion = async (req, res) => {
    try {
        const regionId = parseInt(req.params.regionId, 10);
        const { name, address } = req.body;
        const storeId = await addStoreService(regionId, name, address);
        
        res.status(201).json({
            message: "가게가 등록되었습니다.",
            storeId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "가게 등록 중 오류 발생", error: err.message });
    }
};


