import React from "react";
import ReactDOM from "react-dom";
//event propagation means if we trigger an event on child element
//and the child element does not handle the event, it will bubble up to parent element
//stopPropagation stops the above from happening
const Modal = ({ title, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};
//we use portals to put a component underneath a higher up component instead
//of having it very deeply nested, the above puts a modal right underneath the
//div modal that is right beside the root div so modal will not be deeply nested
//and hence wont struggle with z index problems/stacking order

//basically modal wont show up as a direct child of its direct parent component but instead
//as a child of #modal div

//portals are usually used with modals and other backend
export default Modal;
