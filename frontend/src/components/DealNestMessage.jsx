import "./DealNestMessage.css";

function DealNestMessage({ message, type = "success" }) {
  if (!message) {
    return null;
  }

  return (
    <div className="dealnest-message">
      <div className={`dealnest-message-box ${type}`}>

        <div className="dealnest-message-title">
          {type === "success" ? "✓" : "✕"} DealNest
        </div>

        <div className="dealnest-message-text">
          {message}
        </div>

      </div>
    </div>
  );
}

export default DealNestMessage;