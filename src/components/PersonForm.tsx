import { ChangeEvent, FormEvent } from 'react';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  name: string;
  number: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PersonForm = ({
  onSubmit,
  name,
  number,
  onNameChange,
  onNumberChange,
}: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input name="name" value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input name="number" value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
