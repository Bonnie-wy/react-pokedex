const Button = ({ label, onClick }) => {
  return (
    <button className="btn btn-secondary" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
