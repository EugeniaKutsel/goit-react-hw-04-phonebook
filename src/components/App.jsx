import { nanoid } from "nanoid";
import {useState, useEffect} from "react";
import Container from "./Container/Container";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts' ?? ''))}
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prev=>[contact, ...prev]);
  }

  const deleteContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId),
    )
  }

  const changeFilter = e => {
    setFilter( e.currentTarget.value );
  }

  const getFilteredContacts = () => {
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter));
  }

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length === 0 ?
          <p>Sorry, there are no contacts in the phonebook yet.</p> :
          <ContactList contacts={getFilteredContacts()} onDeleteContact={deleteContact} />}
      </Container>
    </>
  );
}

export default App;