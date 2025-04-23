import { useMemo } from 'react';
import { TPerson } from '../App';
import Person from './Person';

interface Props {
  filter: string;
  persons: TPerson[];
}

const Persons = ({ filter, persons }: Props) => {
  const FilteredNames = useMemo(() => {
    if (filter === '')
      return persons.map((p) => (
        <Person key={p.name} name={p.name} number={p.number} />
      ));

    return persons
      .filter((p) => p.name.toLowerCase().includes(filter))
      .map((p) => <Person key={p.name} name={p.name} number={p.number} />);
  }, [filter, persons]);

  return <>{FilteredNames}</>;
};

export default Persons;
