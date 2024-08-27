import "./spinner.css";

const Spinner = ({ open }) => {
  return (
    // <div className="loader">

    // </div>
    <div className="container">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
      <span>Loading ...</span>
    </div>
  );
};

export default Spinner;
