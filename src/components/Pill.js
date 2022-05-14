import React from "react";

function Pill({ label, onClick }) {
  console.log = label;
  return (
    <div onClick={onClick}>
      <p>{label}</p>
    </div>
  );
}

export default Pill;
