import {
    addMissionService,
    challengeMissionService,
    fetchStoreMissions,
    fetchUserOngoingMissions,
} from "../services/mission.service.js";

export const addMissionToStore = async (req, res, next) => {
    try {
        const storeId = Number(req.params.storeId);
        const { title, description, point, deadline } = req.body;
        
        const missionId = await addMissionService(storeId, title, description, point, deadline);
        
        return res.success({
            message: "미션이 등록되었습니다.",
            missionId,
        });
    } catch (err) {
        next(err);
    }
};

export const challengeMission = async (req, res, next) => {
    try {
        const missionId = Number(req.params.missionId);
        const { userId } = req.body;
        
        const result = await challengeMissionService(userId, missionId);
        
        return res.success({
            message: "미션 도전에 성공했습니다.",
            challengeId: result.id,
        });
    } catch (err) {
        next(err);
    }
};

export const handleGetMissionsByStore = async (req, res, next) => {
    try {
        const storeId = Number(req.params.storeId);
        const missions = await fetchStoreMissions(storeId);
        
        return res.success({
            storeId,
            missions,
        });
    } catch (err) {
        next(err);
    }
};

export const handleGetUserOngoingMissions = async (req, res, next) => {
    try {
        const userId = Number(req.params.userId);
        const missions = await fetchUserOngoingMissions(userId);
        
        return res.success({
            userId,
            ongoingMissions: missions,
        });
    } catch (err) {
        next(err);
    }
};

