import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import themeSlice from './theme.store';
import authSlice from './auth.store';
import sideBarSlice from './sidebar.store';
import langSlice from './lang.store';
import usersSlice from './users.store';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

const persistConfig = {
  key: 'storeName',
  storage,
  whitelist: ['authSlice'],
};

const combinedReducers = persistReducer(
  persistConfig,
  combineReducers({
    themeSlice,
    authSlice,
    sideBarSlice,
    langSlice,
    usersSlice,
  })
);

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});
export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
