import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import {
  saveContacts,
  getContacts,
} from 'localStorage/contactsLocalStorage.js';

function App() {
  const [contacts, setContacts] = useState(() => {
    return getContacts();
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const formSubmitHandler = newContact => {
    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === newContact.name.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts([...contacts, newContact]); //
  };

  const getFilteredContacts = () => {
    const keyword = filter.trim().toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(keyword)
    );
    return filteredContacts;
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id)); //
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div
        style={{
          width: 680,
          padding: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: 30,
          borderRadius: 20,
          boxShadow:
            'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
        }}
      >
        <div style={{ width: '50%' }}>
          <h1
            style={{
              fontWeight: 500,
              fontSize: 40,
              textAlign: 'center',
              marginTop: 0,
            }}
          >
            Phonebook
          </h1>

          <ContactForm onSubmit={formSubmitHandler} />
        </div>
        <div style={{ width: '50%' }}>
          <h2
            style={{
              fontWeight: 500,
              fontSize: 40,
              textAlign: 'center',
              marginTop: 0,
            }}
          >
            Contacts
          </h2>
          <Filter filterValue={filter} filterChange={handleFilterChange} />
          {filteredContacts.length !== 0 ? (
            <ContactList
              filteredContacts={filteredContacts} //
              onClick={handleDeleteContact}
            />
          ) : (
            <p>There are no contacts {':('}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
