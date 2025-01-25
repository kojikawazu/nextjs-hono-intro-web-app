import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from '@/features/dialog/dialogSlice';
import loadLimitReducer from '@/features/loadlimit/loadLimitSlice';
import contactReducer from '@/features/contact/contactSlice';

/** store */
export const store = configureStore({
    reducer: {
        dialog: dialogReducer,
        loadLimit: loadLimitReducer,
        contact: contactReducer,
    },
});

// storeの型
export type RootState = ReturnType<typeof store.getState>;
