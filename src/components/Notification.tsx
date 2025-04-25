interface Props {
  message: string | null;
  type: 'error' | 'success';
}

const Notification = ({ message, type }: Props) => {
  if (message === null) {
    return null;
  }

  return <div className={`${type}`}>{message}</div>;
};

export default Notification;
