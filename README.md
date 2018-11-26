# react-native-storage-slot

A tiny wrapper around AsyncStorage, particularly suited for typed interactions with AsyncStorage, shipping with TS defs

```tsx
interface FormState {
  input: string
  toggle: boolean
}

const FormStateStorage = createStorageSlot<FormState>('form') 

const test = async () => {

  // Store some data
  await FormStateStorage.set({input: "", toggle: true})

  // Read some data
  const formState = await FormStateStorage.get()!
  
  // Clear stored data
  await FormStateStorage.del();
  
}


```


# API:

```tsx 
export interface StorageSlot<T> {
    get: () => Promise<T | undefined>;
    set: (value: T) => Promise<void>;
    del: () => Promise<void>;
}
export declare const createStorageSlot: <T extends {}>(key: string) => StorageSlot<T>;
```

# DEV

To run example app in Expo, replace in package.json:   "main": "node_modules/expo/AppEntry.js",`
