import { addStoreToRegionRepo } from "../repositories/region.repository.js";

export const addStoreService = async (regionId, name, address) => {
    const storeId = await addStoreToRegionRepo(regionId, name, address);
    return storeId;
};
