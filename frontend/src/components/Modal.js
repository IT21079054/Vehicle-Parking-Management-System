import React from 'react';

function Modal({ title, onClose, onSubmit, children, submitLabel = 'Save' }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h5>{title}</h5>
          <button className="modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <i className="bi bi-check-lg"></i> {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
