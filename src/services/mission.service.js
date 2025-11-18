import { addMissionRepo, checkStoreExists, checkMissionExists, checkAlreadyChallenged, addUserMissionRepo } from "../repositories/mission.repository.js";
import { getMissionsByStore } from "../repositories/mission.repository.js";
import { getUserOngoingMissions } from "../repositories/mission.repository.js";
import { NotFoundError, BadRequestError } from "../errors.js";
import { prisma } from "../db.config.js";

export const fetchStoreMissions = async (storeId) => {
    storeId = Number(storeId);
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    
    if (!store) throw new NotFoundError("존재하지 않는 가게입니다.", { storeId });
    
    const missions = await prisma.mission.findMany({
        where: { storeId },
        orderBy: { id: "asc" }
    });
    return missions;
};


export const addMissionService = async (storeId, title, description, point, deadline) => {
    storeId = Number(storeId);
    
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new NotFoundError("존재하지 않는 가게입니다.", { storeId });
    
    const newMission = await prisma.mission.create({
        data: {
            storeId,
            title,
            description,
            point,
            deadline: new Date(deadline),
        },
    });
    return newMission.id;
};

export const challengeMissionService = async (missionId, userId) => {
    const missionExists = await checkMissionExists(missionId);
    if (!missionExists) throw new Error("존재하지 않는 미션입니다.");
    
    const alreadyChallenged = await checkAlreadyChallenged(userId, missionId);
    if (alreadyChallenged) throw new Error("이미 도전 중인 미션입니다.");
    
    const challengeId = await addUserMissionRepo(userId, missionId);
    return challengeId;
};

export const getMissionsForStore = async (storeId) => {
    const missions = await getMissionsByStore(storeId);
    return missions;
};
export const fetchUserOngoingMissions = async (userId) => {
    userId = Number(userId);
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError("존재하지 않는 사용자입니다.", { userId });
    
    return prisma.userMission.findMany({
        where: { userId, status: "ONGOING" },
        include: { mission: true },
    });
};