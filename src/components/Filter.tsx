import { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({ value, onChange }: Props) => {
  return (
    <div>
      <p>
        Filter shown with{' '}
        <input type="text" value={value} onChange={onChange} />
      </p>
    </div>
  );
};

export default Filter;
