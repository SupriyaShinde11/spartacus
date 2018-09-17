export enum StorageSyncType {
  NO_STORAGE = 'NO_STORAGE',
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  SESSION_STORAGE = 'SESSION_STORAGE'
}

export interface RoutingModuleConfig {
  storageSyncType?: StorageSyncType;
}

export const defaultRoutingModuleConfig: RoutingModuleConfig = {
  storageSyncType: StorageSyncType.SESSION_STORAGE
};
