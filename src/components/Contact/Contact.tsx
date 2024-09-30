import React from "react";
import { FC } from "react";
import { Contact as ContactType } from "../../redux/types/contacts";
import { IoPersonOutline, IoPhonePortraitOutline } from "react-icons/io5";
import styles from "./Contact.module.css";

interface ContactProps {
  contact: ContactType;
  onDelete: (id: string) => void;
}

const Contact: FC<ContactProps> = ({ contact, onDelete }) => {

  return (
    <div className={styles.contactContainer}>
      <ul className={styles.contactList}>
        <li className={styles.contactItem}>
          <IoPersonOutline />
          {contact.name}
        </li>
        <li className={styles.contactItem}>
          <IoPhonePortraitOutline />
          {contact.number}
        </li>
      </ul>
      <button className={styles.button} onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  );
};

export default Contact;
