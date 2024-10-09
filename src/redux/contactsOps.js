import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "https://66f9b29cafc569e13a997d47.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "contacts/getContact",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactID, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactID}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
