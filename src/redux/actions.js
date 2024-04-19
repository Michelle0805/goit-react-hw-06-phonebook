// src/redux/actions.js
import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// Action Types
// export const ADD_CONTACT = 'contacts/addContact';
// export const DELETE_CONTACT = 'contacts/deleteContact';
// export const SET_FILTER = 'filters/setFilter';

// Action Creators

// Adds a new contact
// createAction takes a type and an optional payload creator function. For addContact, we're using
// a payload creator function to include the ID generation logic.
export const addContact = createAction(
  'contacts/addContact',
  ({ name, number }) => ({
    payload: {
      id: nanoid(), // Generate a unique ID for each contact
      name,
      number,
    },
  })
);

// Deletes a contact by id
// For simple actions where the payload is directly passed, you can just pass the type.
export const deleteContact = createAction('contacts/deleteContact');

// Sets the current filter
export const setFilter = createAction('filter/setFilter');

// Now, each of these actions can be dispatched directly, and they will follow the {type, payload} format.
// Redux Toolkit's createAction simplifies the process of creating actions and ensures consistency.