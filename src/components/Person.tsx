interface Props {
  name: string;
  number: string;
  id: number;
  onDelete: (id: number) => void;
}

const Person = ({ name, number, id, onDelete }: Props) => {
  return (
    <>
      <p>
        <b>{name}: </b> <span>{number}</span>
        <button onClick={() => onDelete(id)}>Delete</button>
      </p>
    </>
  );
};

export default Person;
