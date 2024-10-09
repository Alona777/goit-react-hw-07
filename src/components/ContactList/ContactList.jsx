import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectVisibleContacts } from "../../redux/selectors";

export default function ContactList() {
  const visibleNumbers = useSelector(selectVisibleContacts);

  return (
    <ul className={css.list}>
      {visibleNumbers.length > 0 ? (
        visibleNumbers.map((contact) => {
          return (
            <li className={css.item} key={contact.id}>
              <Contact contacts={contact} />
            </li>
          );
        })
      ) : (
        <p className={css.message}>
          Sorry, there are no contacts on your request
        </p>
      )}
    </ul>
  );
}
