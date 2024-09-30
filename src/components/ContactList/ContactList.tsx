import React from "react";
import { FC } from "react";
import Contact from "../Contact/Contact";
import { Contact as ContactType } from "../../redux/types/contacts"; 

interface ContactListProps {
  contacts: ContactType[]; 
  onDelete: (id: string) => void; 
}

const ContactList: FC<ContactListProps> = ({ contacts, onDelete }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ContactList;

