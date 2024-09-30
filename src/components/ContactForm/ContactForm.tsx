import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Contact } from "../../redux/types/contacts";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  onAdd: (newContact: Omit<Contact, "id">) => void;
}

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Invalid phone number format")
    .required("Required"),
});

const ContactForm: React.FC<ContactFormProps> = ({ onAdd }) => {
  const handleSubmit = (values: Omit<Contact, "id">, { resetForm }: any) => {
    onAdd(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.formContainer}>
        <div className={styles.formWrap}>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div className={styles.formWrap}>
          <label htmlFor="number">Number</label>
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="div" />
        </div>
        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;




