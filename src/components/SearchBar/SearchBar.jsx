import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';
export const SearchBar = ({ onSetQuery }) => {
    const handleSubmit = (values) => {
        if (values.query.length > 0) {
            onSetQuery(values.query);
            console.log(values);
        } else {
            toast.error('Please enter a search query');
        }
    }
  return (
    <section className={css.searchBar}>
        <Formik initialValues={{query: ''}} onSubmit={handleSubmit}>
            <Form>
                <Field
                    className={css.input}
                    name="query"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.button} type="submit">Search</button>
            </Form>
        </Formik>
    </section>
  );
};
