import {useState, useReducer} from "react";
import { nanoid } from 'nanoid';
import css from "../ContactForm/ContactForm.module.css";

const initialState = {
  name: '',
  number: '',
}

const ContactForm = ({onSubmit}) => {
  const [contact, setContact] = useState(initialState);
  const { name, number } = contact;

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(contact);
    setContact(initialState);
  }


  return (
    <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor={nameInputId} className={css.formName}>Name</label>
          <input
            id={nameInputId}
            type="text"
            name="name"
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
            name="number"
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

// class ContactForm extends React.Component {
//   state = {
//     name: '',
//     number: '',
//   }

//   nameInputId = nanoid();
//   numberInputId = nanoid();

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSumbit(this.state);
//     this.reset();
//   }

//   reset = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit} className={css.form}>
//         <label htmlFor={this.nameInputId} className={css.formName}>Name</label>
//           <input
//             id={this.nameInputId}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             value={this.state.name}
//             onChange={this.handleChange}
//             className={css.formInput}
//             required
//           />
//         <label htmlFor={this.numberInputId} className={css.formName}>Number </label>
//           <input
//             id={this.numberInputId}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             value={this.state.number}
//             onChange={this.handleChange}
//             className={css.formInput}
//             required
//           />
//         <button type="submit" className={css.formButton}>Add contact</button>
//       </form>
//     );
//   }
// }

export default ContactForm;