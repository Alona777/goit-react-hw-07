import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact } from "./types/contacts";
import myContactList from "../components/Data/myContactList.json"; 

axios.defaults.baseURL = "https://66f9b29cafc569e13a997d47.mockapi.io/";

export const fetchContacts = createAsyncThunk<Contact[], void>(
  "contacts/fetchAll",
  async () => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
  
      console.warn("Using local data, server unreachable.");
      return myContactList; 
    }
  }
);

export const addContact = createAsyncThunk<Contact, Contact>(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return rejectWithValue("Unable to add contact.");
    }
  }
);

export const deleteContact = createAsyncThunk<string, string>(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue("Unable to delete contact.");
    }
  }
);



