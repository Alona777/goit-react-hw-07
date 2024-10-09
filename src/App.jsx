import ContactList from "./components/ContactList/ContactList";
import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import { fetchContacts } from "./redux/contactsOps";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";


function App() {
  const loading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <h1 className="mainTitle">Phonebook</h1>
        <ContactForm />

        <SearchBox />

        {error && <p>Sorry, something went wrong</p>}
        <ContactList />
      </div>
    </div>
  );
}

export default App;
