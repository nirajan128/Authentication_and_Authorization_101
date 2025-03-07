import { useState } from "react";

interface alertStatusProps {
    state: string,
    message: string
}
function ErrorAlertStatus(props: alertStatusProps) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null; // Do not render the alert if it's not visible
  }
  return (
    <>
      <div
        className={`alert ${props.state} d-flex align-items-center`}
        role="alert"
      >
        <div>{props.message}</div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
    </>
  );
}

export default ErrorAlertStatus;