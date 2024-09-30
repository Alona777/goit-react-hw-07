import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import contactsReducer from "./contactsSlice";
import filterReducer from "./filtersSlice";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filterReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "contacts/fetchAll/rejected",
          "contacts/addContact/rejected",
          "contacts/deleteContact/rejected",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
