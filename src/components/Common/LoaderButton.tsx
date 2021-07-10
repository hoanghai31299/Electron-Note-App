import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoaderButton({
  disabled = false,
  loading,
  children,
  btnClass,
  onClick,
}: {
  disabled?: boolean;
  loading: boolean;
  children: any;
  btnClass?: string;
  onClick: () => void;
}) {
  return (
    <div className="loader-button">
      <button
        onClick={onClick}
        className={`btn btn-primary ${btnClass}`}
        disabled={disabled}
      >
        {loading ? <Spinner animation="border" size="sm" /> : children}
      </button>
    </div>
  );
}

export default LoaderButton;
