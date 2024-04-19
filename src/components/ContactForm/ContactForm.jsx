import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export const ContactForm = ({addContact, contacts})=> {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const handleNameChange = e => setName(e.target.value);
  const handleNumberChange = e => setNumber(e.target.value);

    const handleSubmit = event => {
      event.preventDefault();
  
      if (name.trim() === '' || number.trim() === '') {
        return;
      }
  
      const existingContact = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );
      if (existingContact) {
        Notify.failure(`${name} is already in your contacts!`, {
          position: 'center-top',
        });
        return;
      } else {
        Notify.success(`${name} is successfully added to your contacts!`, {
          position: 'center-top',
        });
      }
  
      addContact({
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      });
  
      setName('');
      setNumber('');
    };
  
    return (
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.formField}>
          <p className={css.formLabel}>Name</p>
          <input
            type="text"
            name="name"
            // add \ before - in [' \-] to make it work (LMS)
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={handleNameChange}
          />
        </label>

        <label className={css.formField}>
          <p className={css.formLabel}>Number</p>
          <input
            type="tel"
            name="number"
            // add \ before - in [\-.\s] to make it work (LMS)
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleNumberChange}
          />
        </label>
        <button className={css.btnSubmit} type="submit">
          Add Contact
        </button>
      </form>
    );
  }


ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isResquired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
};