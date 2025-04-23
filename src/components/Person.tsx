interface Props {
  name: string;
  number: string;
}

const Person = ({ name, number }: Props) => {
  return (
    <>
      <p>
        <b>{name}: </b> <span>{number}</span>
      </p>
    </>
  );
};

export default Person;
