import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useState } from 'react';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        throw new Error(`Unsuported name ${name} `); //
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    onSubmit(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const {
    phonebookBox,
    phonebookForm,
    phoneBookInput,
    phoneBookSubmitBtn,
    formLabel,
    phoneBookInputNumber,
  } = css;

  return (
    <div className={phonebookBox}>
      <form className={phonebookForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={formLabel}>
            Name
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              className={phoneBookInput}
              placeholder="Name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces (for example: Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan)"
              aria-label="Name"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="number" className={formLabel}>
            Number
            <input
              id="number"
              type="tel"
              name="number"
              value={number}
              className={phoneBookInputNumber}
              placeholder="123-45-67"
              pattern="\d{3}[\-]\d{2}[\-]\d{2}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with + (for example: 123-45-67)"
              aria-label="Phone number"
              required
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={phoneBookSubmitBtn}>
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
