import { useReducer } from "react";
import { nanoid } from 'nanoid';
import css from "../ContactForm/ContactForm.module.css";
import PropTypes from 'prop-types';

const initialState = {
  name: '',
  number: '',
}

const ACTION_TYPES = {
  name: 'name',
  number: 'number',
  reset: 'reset'
}

const contactReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.name:
      return { ...state, name: payload };
    
    case ACTION_TYPES.number:
      return { ...state, number: payload };
    
    case ACTION_TYPES.reset:
      return initialState;
  
    default:
      return state;
  }
}

const ContactForm = ({ onSubmit }) => {
  const [contact, dispatch] = useReducer(contactReducer, initialState)
  const { name, number } = contact;

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch({type: name, payload: value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(contact);
    dispatch({type: ACTION_TYPES.reset})
  }


  return (
    <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor={nameInputId} className={css.formName}>Name</label>
          <input
            id={nameInputId}
            type="text"
            name={ACTION_TYPES.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleChange}
            className={css.formInput}
            required
          />
        <label htmlFor={numberInputId} className={css.formName}>Number </label>
          <input
            id={numberInputId}
            type="tel"
            name={ACTION_TYPES.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleChange}
            className={css.formInput}
            required
          />
        <button type="submit" className={css.formButton}>Add contact</button>
      </form>
  )
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;