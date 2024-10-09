import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { IoMdPerson } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsOps.js";

export default function Contact({ contacts: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.wrap}>
      <div>
        <div className={css.textPlusIcon}>
          <IoMdPerson />
          <p className={css.text}>{name}</p>
        </div>
        <div className={css.textPlusIcon}>
          <FaPhoneAlt className={css.noMargin} />
          <p className={`${css.noMargin} ${css.text}`}>{number}</p>
        </div>
      </div>

      <button className={css.button} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
