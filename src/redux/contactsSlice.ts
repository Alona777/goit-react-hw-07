import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { ContactsState, Contact } from "./types/contacts";
import { RootState } from "./store";
import { SerializedError } from "@reduxjs/toolkit";
import { selectNameFilter } from "./filtersSlice";


const initialState: ContactsState = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = (state: ContactsState) => {
  state.loading = true;
};


const handleRejected = (
  state: ContactsState,
  action: PayloadAction<SerializedError | undefined>
) => {
  state.loading = false;
  state.error = action.payload?.message || "Unknown error";
};


const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
 
      .addCase(fetchContacts.pending, handlePending)
      .addCase(
        fetchContacts.fulfilled,
        (state: ContactsState, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.error = null;
          state.items = action.payload;
        }
      )
      .addCase(
        fetchContacts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Unknown error";
        }
      )
      

      .addCase(addContact.pending, handlePending)
      .addCase(
        addContact.fulfilled,
        (state: ContactsState, action: PayloadAction<Contact>) => {
          state.loading = false;
          state.error = null;
          state.items.push(action.payload);
        }
      )
      .addCase(
        addContact.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Unknown error";
        }
      )
      

      .addCase(deleteContact.pending, handlePending)
      .addCase(
        deleteContact.fulfilled,
        (state: ContactsState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = null;
          state.items = state.items.filter(
            (contact) => contact.id !== action.payload
          );
        }
      )
      .addCase(
        deleteContact.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Unknown error";
        }
      );
  },
});

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectContactsLoading = (state: RootState) => state.contacts.loading;
export const selectContactsError = (state: RootState) => state.contacts.error;


export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, contactName) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(contactName.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;


// import { createSlice, PayloadAction, createSelector, isRejectedWithValue } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./contactsOps";
// import { ContactsState, Contact } from "./types/contacts";
// import { RootState } from "./store";
// import { SerializedError } from "@reduxjs/toolkit";
// import { selectNameFilter } from "./filtersSlice";

// // Начальное состояние контактов
// const initialState: ContactsState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // Обработчик для pending (ожидание загрузки)
// const handlePending = (state: ContactsState) => {
//   state.loading = true;
// };

// // Обработчик для rejected (ошибка при выполнении запроса)
// const handleRejected = (
//   state: ContactsState,
//   action: ReturnType<typeof fetchContacts.rejected> // Используем тип rejected для корректной типизации
// ) => {
//   state.loading = false;

//   // Проверка на наличие свойства message в ошибке
//   if (action.error && typeof action.error.message === "string") {
//     state.error = action.error.message; // Присваиваем сообщение об ошибке
//   } else {
//     state.error = "Unknown error";
//   }
// };

// // Slice контактов
// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, handlePending) // Обработка ожидания загрузки
//       .addCase(
//         fetchContacts.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact[]>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = action.payload; // Сохранение списка контактов
//         }
//       )
//       .addCase(fetchContacts.rejected, handleRejected) // Обработка ошибки
//       .addCase(addContact.pending, handlePending) // Ожидание добавления контакта
//       .addCase(
//         addContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact>) => {
//           state.loading = false;
//           state.error = null;
//           state.items.push(action.payload); // Добавление контакта
//         }
//       )
//       .addCase(addContact.rejected, handleRejected) // Обработка ошибки
//       .addCase(deleteContact.pending, handlePending) // Ожидание удаления контакта
//       .addCase(
//         deleteContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<string>) => {
//           state.loading = false;
//           state.error = null;
//           // Фильтрация контактов для удаления
//           state.items = state.items.filter(
//             (contact) => contact.id !== action.payload
//           );
//         }
//       )
//       .addCase(deleteContact.rejected, handleRejected); // Обработка ошибки
//   },
// });

// // Селекторы для получения контактов, статуса загрузки и ошибок
// export const selectContacts = (state: RootState) => state.contacts.items;
// export const selectContactsLoading = (state: RootState) => state.contacts.loading;
// export const selectContactsError = (state: RootState) => state.contacts.error;

// // Селектор для фильтрации контактов по имени
// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, contactName) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(contactName.toLowerCase())
//     );
//   }
// );

// export default contactsSlice.reducer;





// import { createSlice, PayloadAction, createSelector, isRejectedWithValue } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./contactsOps";
// import { ContactsState, Contact } from "./types/contacts";
// import { RootState } from "./store";
// import { SerializedError } from "@reduxjs/toolkit";
// import { selectNameFilter } from "./filtersSlice";

// // Начальное состояние контактов
// const initialState: ContactsState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // Обработчик для pending (ожидание загрузки)
// const handlePending = (state: ContactsState) => {
//   state.loading = true;
// };

// // Обработчик для rejected (ошибка при выполнении запроса)
// const handleRejected = (
//   state: ContactsState,
//   action: PayloadAction<any> // Для отладки можно временно использовать any, чтобы понять, что возвращается
// ) => {
//   state.loading = false;

//   // Проверяем, если экшен был отклонён с значением
//   if (isRejectedWithValue(action)) {
//     state.error = action.payload?.message || "Unknown error";
//   } else {
//     // Если экшен содержит стандартную ошибку
//     state.error = action.error?.message || "Unknown error";
//   }
// };

// // Slice контактов
// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, handlePending) // Обработка ожидания загрузки
//       .addCase(
//         fetchContacts.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact[]>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = action.payload; // Сохранение списка контактов
//         }
//       )
//       .addCase(fetchContacts.rejected, handleRejected) // Обработка ошибки
//       .addCase(addContact.pending, handlePending) // Ожидание добавления контакта
//       .addCase(
//         addContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact>) => {
//           state.loading = false;
//           state.error = null;
//           state.items.push(action.payload); // Добавление контакта
//         }
//       )
//       .addCase(addContact.rejected, handleRejected) // Обработка ошибки
//       .addCase(deleteContact.pending, handlePending) // Ожидание удаления контакта
//       .addCase(
//         deleteContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<string>) => {
//           state.loading = false;
//           state.error = null;
//           // Фильтрация контактов для удаления
//           state.items = state.items.filter(
//             (contact) => contact.id !== action.payload
//           );
//         }
//       )
//       .addCase(deleteContact.rejected, handleRejected); // Обработка ошибки
//   },
// });

// // Селекторы для получения контактов, статуса загрузки и ошибок
// export const selectContacts = (state: RootState) => state.contacts.items;
// export const selectContactsLoading = (state: RootState) => state.contacts.loading;
// export const selectContactsError = (state: RootState) => state.contacts.error;

// // Селектор для фильтрации контактов по имени
// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, contactName) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(contactName.toLowerCase())
//     );
//   }
// );

// export default contactsSlice.reducer;

//====================================//


// import { createSlice, PayloadAction, createSelector, isRejectedWithValue } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./contactsOps";
// import { ContactsState, Contact } from "./types/contacts";
// import { RootState } from "./store";
// import { SerializedError } from "@reduxjs/toolkit";
// import { selectNameFilter } from "./filtersSlice";

// const initialState: ContactsState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// const handlePending = (state: ContactsState) => {
//   state.loading = true;
// };

// const handleRejected = (
//   state: ContactsState,
//   action: ReturnType<typeof fetchContacts.rejected> // Уточненный тип для rejected экшена
// ) => {
//   state.loading = false;

//   // Проверка, был ли экшен отклонён с дополнительными данными
//   if (isRejectedWithValue(action)) {
//     state.error = action.payload?.message || "Unknown error";
//   } else {
//     state.error = action.error.message || "Unknown error";
//   }
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, handlePending)
//       .addCase(
//         fetchContacts.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact[]>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = action.payload;
//         }
//       )
//       .addCase(fetchContacts.rejected, handleRejected)
//       .addCase(addContact.pending, handlePending)
//       .addCase(
//         addContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact>) => {
//           state.loading = false;
//           state.error = null;
//           state.items.push(action.payload);
//         }
//       )
//       .addCase(addContact.rejected, handleRejected)
//       .addCase(deleteContact.pending, handlePending)
//       .addCase(
//         deleteContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<string>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = state.items.filter(
//             (contact) => contact.id !== action.payload
//           );
//         }
//       )
//       .addCase(deleteContact.rejected, handleRejected);
//   },
// });

// // Селекторы для получения контактов, статуса загрузки и ошибок
// export const selectContacts = (state: RootState) => state.contacts.items;
// export const selectContactsLoading = (state: RootState) => state.contacts.loading;
// export const selectContactsError = (state: RootState) => state.contacts.error;

// // Селектор для фильтрации контактов по имени
// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, contactName) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(contactName.toLowerCase())
//     );
//   }
// );

// export default contactsSlice.reducer;


//======================================//

// import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./contactsOps";
// import { ContactsState, Contact } from "./types/contacts";
// import { RootState } from "./store";
// import { SerializedError } from "@reduxjs/toolkit";
// import { selectNameFilter } from "./filtersSlice";

// const initialState: ContactsState = {
//   items: [],
//   loading: false,
//   error: null,
// };


// const handlePending = (state: ContactsState) => {
//   state.loading = true;
// };

// const handleRejected = (
//   state: ContactsState,
//   action: PayloadAction<SerializedError | undefined>
// ) => {
//   state.loading = false;
//   state.error = action.payload?.message || "Unknown error";
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, handlePending)
//       .addCase(
//         fetchContacts.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact[]>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = action.payload;
//         }
//       )
//       .addCase(fetchContacts.rejected, handleRejected) 
//       .addCase(addContact.pending, handlePending)
//       .addCase(
//         addContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact>) => {
//           state.loading = false;
//           state.error = null;
//           state.items.push(action.payload);
//         }
//       )
//       .addCase(addContact.rejected, handleRejected) 
//       .addCase(deleteContact.pending, handlePending)
//       .addCase(
//         deleteContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<string>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = state.items.filter(
//             (contact) => contact.id !== action.payload
//           );
//         }
//       )
//       .addCase(deleteContact.rejected, handleRejected); 
//   },
// });

// export const selectContacts = (state: RootState) => state.contacts.items;
// export const selectContactsLoading = (state: RootState) => state.contacts.loading;
// export const selectContactsError = (state: RootState) => state.contacts.error;


// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, contactName) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(contactName.toLowerCase())
//     );
//   }
// );

// export default contactsSlice.reducer;




