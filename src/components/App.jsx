import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../redux/actions';
import { getContacts, getFilter } from '../redux/selectors';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };
    

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };
 
  const handleSetFilter = newFilter => {
    // Placeholder for future Redux dispatch to update filter
    dispatch(setFilter(newFilter));
  };

  // Calculate filtered contacts directly within the App component
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
 
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={handleAddContact} contacts={filteredContacts}/>

        <h2>Contacts</h2>
        <Filter filter={filter} setFilter={handleSetFilter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={handleDeleteContact}
        />
      </div>
    );
  };

