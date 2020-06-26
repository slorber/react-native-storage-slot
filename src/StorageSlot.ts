import AsyncStorage from '@react-native-community/async-storage'

export interface StorageSlot<T> {
    get: () => Promise<T | undefined>
    set: (value: T) => Promise<void>
    del: () => Promise<void>
}

export const createStorageSlot = <T extends {}>(key: string): StorageSlot<T> => {

    const get = () => {
        return AsyncStorage.getItem(key)
            .then(result => JSON.parse(result!))
            .then(result => {
                return result as T;
            });
    };

    const set = (value: T) => {
        return AsyncStorage.setItem(key, JSON.stringify(value))
    };

    const del = () => {
        return AsyncStorage.removeItem(key);
    };

    return {
        get,
        set,
        del,
    };
};
