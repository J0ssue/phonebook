import { useState, ChangeEvent, FormEvent, useMemo, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsApi from './persons.api';
import Notification from './components/Notification';
import { AxiosError } from 'axios';

export interface TPerson {
  name: string;
  number: string;
  id?: number;
}

const App = () => {
  const [persons, setPersons] = useState<TPerson[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    personsApi.getAll().then((personsData) => {
      setPersons(personsData);
    });
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewName(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (newName === '') {
      return alert('Name is required');
    }

    if (persons.find((p) => p.name === newName)) {
      const person = persons.find((p) => p.name === newName);
      const confirm = window.confirm(
        `${newName} is already added to phonebook, Would you like to replace it?`
      );
      if (confirm) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
        };

        personsApi.update(person?.id as number, updatedPerson).then((p) => {
          setPersons(
            persons.map((p) => (p.id === person?.id ? updatedPerson : p))
          );

          setNotificationMessage(`Person updated`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
      }
      return;
    }

    personsApi.create(newPerson).then((responseData) => {
      setPersons(persons.concat(responseData));
      setNewName('');
      setNewNumber('');

      setNotificationMessage(`New person created`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm(
      `Are you sure you want to delete user with id ${id}?`
    );
    if (confirm) {
      personsApi
        .destroy(id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== res.id));
        })
        .catch((err) => {
          const typedError = err as AxiosError;
          setErrorMessage(`Error: ${typedError.message}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewNumber(value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={notificationMessage} type="success" />

      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} onDelete={handleDelete} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
