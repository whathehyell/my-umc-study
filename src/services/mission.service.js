import { addMissionRepo, checkStoreExists, checkMissionExists, checkAlreadyChallenged, addUserMissionRepo } from "../repositories/mission.repository.js";

export const addMissionService = async (storeId, title, description, point, deadline) => {
    const exists = await checkStoreExists(storeId);
    if (!exists) throw new Error("존재하지 않는 가게입니다.");
    
    const missionId = await addMissionRepo(storeId, title, description, point, deadline);
    return missionId;
};

export const challengeMissionService = async (missionId, userId) => {
    const missionExists = await checkMissionExists(missionId);
    if (!missionExists) throw new Error("존재하지 않는 미션입니다.");
    
    const alreadyChallenged = await checkAlreadyChallenged(userId, missionId);
    if (alreadyChallenged) throw new Error("이미 도전 중인 미션입니다.");
    
    const challengeId = await addUserMissionRepo(userId, missionId);
    return challengeId;
};

