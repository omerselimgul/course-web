const BaseText = ({ header, content }) => {
  return (
    <div>
      <div style={{ fontSize: "1.2rem", fontWeight: "bold", padding: "10px" }}>
        {header}
      </div>
      <div style={{ padding: "10px", fontSize: "0.9rem", color: "gray" }}>
        {content}
      </div>
    </div>
  );
};

export default BaseText;
