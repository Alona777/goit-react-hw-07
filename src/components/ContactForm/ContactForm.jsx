import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
const UserScheme = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short! Not less than 3 symbols.")
    .max(50, "Too many! No more than 50 symbols.")
    .required("You have to write a name!"),
    number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      "Неправильний формат номера телефону. Введіть у форматі 123-45-67"
    )
});
export default function ContactForm() {
  const id = useId();
  const dispatch = useDispatch();
  const handleAddContact = (contactInfo) => {
    dispatch(addContact({ ...contactInfo }));
  };
  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={UserScheme}
      validateOnChange={false}
      onSubmit={(values, actions) => {
        handleAddContact(values);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <label className={css.text} htmlFor={`${id}-name`}>
          Name
        </label>
        <Field
          className={`${css.input} ${css.text}`}
          type="text"
          id={`${id}-name`}
          name="name"
        />
        <ErrorMessage name="name" component="span" className={css.errText} />
        <label className={css.text} htmlFor={`${id}-number`}>
          Number
        </label>
        <Field
          className={`${css.input} ${css.text}`}
          type="text"
          id={`${id}-number`}
          name="number"
        />
        <ErrorMessage name="number" component="span" className={css.errText} />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
