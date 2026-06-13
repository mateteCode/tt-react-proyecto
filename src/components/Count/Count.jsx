import { useState } from "react";
import "./Count.css";

export const Count = ({
  initial = 1,
  min = 1,
  max,
  onCountChange,
  children,
}) => {
  const [count, setCount] = useState(initial);

  const updateCount = (newCount) => {
    setCount(newCount);
    if (onCountChange) {
      onCountChange(newCount);
    }
  };

  const increment = () => {
    if (max !== undefined && count >= max) return;
    updateCount(count + 1);
  };

  const decrement = () => {
    if (count > min) updateCount(count - 1);
  };

  return (
    <div className="count-container">
      <div className="counter-controls">
        <button className="btn-icon" onClick={decrement}>
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className="count-display">{count}</span>
        <button
          className="btn-icon"
          onClick={increment}
          disabled={count >= max}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {children && (
        <div className="count-children">
          {typeof children === "function" ? children(count) : children}
        </div>
      )}
    </div>
  );
};
