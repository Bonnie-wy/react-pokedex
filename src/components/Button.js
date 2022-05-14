import { Button as Btn } from "react-bootstrap";

const Button = ({ label, onClick }) => {
  return (
    <Btn className="btn btn-secondary" onClick={onClick}>
      {label}
    </Btn>
  );
};

export default Button;
