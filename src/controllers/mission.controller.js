import { addMissionService, challengeMissionService } from "../services/mission.service.js";

export const addMissionToStore = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId, 10);
        const { title, description, point, deadline } = req.body;
        
        const missionId = await addMissionService(storeId, title, description, point, deadline);
        
        res.status(201).json({
            message: "미션이 등록되었습니다.",
            missionId,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message || "미션 등록 중 오류 발생" });
    }
};

export const challengeMission = async (req, res) => {
    try {
        const missionId = parseInt(req.params.missionId, 10);
        const { userId } = req.body;
        
        const challengeId = await challengeMissionService(missionId, userId);
        
        res.status(201).json({
            message: "미션 도전에 성공했습니다.",
            challengeId,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message || "미션 도전 중 오류 발생",
        });
    }
};

