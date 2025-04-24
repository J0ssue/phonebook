import { useMemo } from 'react';
import { TPerson } from '../App';
import Person from './Person';

interface Props {
  filter: string;
  persons: TPerson[];
  onDelete: (id: number) => void;
}

const Persons = ({ filter, persons, onDelete }: Props) => {
  const FilteredNames = useMemo(() => {
    if (filter === '')
      return persons.map((p) => (
        <Person
          key={p.name}
          id={p.id as number}
          onDelete={onDelete}
          name={p.name}
          number={p.number}
        />
      ));

    return persons
      .filter((p) => p.name.toLowerCase().includes(filter))
      .map((p) => (
        <Person
          key={p.name}
          id={p.id as number}
          name={p.name}
          number={p.number}
          onDelete={onDelete}
        />
      ));
  }, [filter, persons]);

  return <>{FilteredNames}</>;
};

export default Persons;
