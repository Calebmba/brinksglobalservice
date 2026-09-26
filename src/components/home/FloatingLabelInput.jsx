import { useState, useId } from "react";

const BRAND_COLOR = "#0a4a8e";

export default function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  rightElement,
  height = 52,
}) {
  const [focused, setFocused] = useState(false);
  const id = useId();

  const isFloating = focused || (value && value.length > 0);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={isFloating ? placeholder : ""}
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          height: `${height}px`,
          padding: rightElement ? "0 36px 0 12px" : "0 12px",
          fontSize: "14px",
          fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
          border: `1px solid ${focused ? BRAND_COLOR : "#c4c4c4"}`,
          borderRadius: "4px",
          outline: "none",
          color: "#1a1a1a",
        }}
      />

      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "12px",
          top: isFloating ? "0" : "50%",
          transform: isFloating ? "translateY(-50%)" : "translateY(-50%)",
          background: isFloating ? "#ffffff" : "transparent",
          padding: isFloating ? "0 4px" : "0",
          fontSize: isFloating ? "12px" : "16px",
          color: focused ? BRAND_COLOR : required ? "#c0392b" : "#5a5a5a",
          fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
          transition: "all 0.15s ease",
          pointerEvents: "none",
        }}
      >
        {label}
        {required && <span style={{ color: "#c0392b" }}>*</span>}
      </label>

      {rightElement && (
        <div
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {rightElement}
        </div>
      )}
    </div>
  );
}
