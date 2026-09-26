import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FloatingLabelInput from "./FloatingLabelInput";
import { shipment } from "../../lib/mockData";

const BRAND_COLOR = "#0a4a8e";

export default function TrackShipmentsCard() {
  const [hawb, setHawb] = useState("");
  const [tracking, setTracking] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const canTrack = hawb.trim().length > 0 || tracking.trim().length > 0;

  const handleTrack = () => {
    const trackingValue = tracking.trim();
    const hawbValue = hawb.trim();

    // HAWB is just a preface for the tracking number, so both fields check
    // against the same trackingNumbers list. Only whichever field(s) the
    // user actually filled in need to match — if both are filled, both
    // must match.
    const filledValues = [hawbValue, trackingValue].filter((v) => v.length > 0);
    const isMatch = filledValues.every((v) => shipment.trackingNumbers.includes(v));

    if (isMatch) {
      setError("");
      navigate("/tracking");
    } else {
      setError(
        "We couldn't find a shipment matching what you entered. Please double-check it and try again, or contact your sender to confirm."
      );
    }
  };

  return (
    <div
      style={{
        marginTop: "5px", 
        marginRight: "15px",   
        width: "288px",
        minHeight: "300px",
        boxSizing: "border-box",
        background: "#ffffff",
        borderRadius: "0px",
        border: `1px solid ${BRAND_COLOR}`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        padding: "24px",
        fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <h2
        style={{
          margin: "0 0 16px",
          fontSize: "17px",
          fontWeight: 600,
          color: BRAND_COLOR,
          textAlign: "center",
        }}
      >
        Track Shipments
      </h2>

      <FloatingLabelInput
        label="HAWB #"
        height={48}
        value={hawb}
        onChange={(e) => {
          setHawb(e.target.value);
          if (error) setError("");
        }}
        placeholder="Enter up to 25 HAWB numbers."
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "16px 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "#d9d9d9" }} />
        <span style={{ fontSize: "12px", color: "#8a8a8a" }}>OR</span>
        <div style={{ flex: 1, height: "1px", background: "#d9d9d9" }} />
      </div>

      <FloatingLabelInput
        label="Tracking #"
        height={48}
        value={tracking}
        onChange={(e) => {
          setTracking(e.target.value);
          if (error) setError("");
        }}
      />

      {error && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "12px",
            lineHeight: 1.4,
            color: "#c0392b",
          }}
        >
          {error}
        </div>
      )}

      <button
        disabled={!canTrack}
        onClick={handleTrack}
        style={{
          width: "100%",
          marginTop: "18px",
          height: "42px",
          borderRadius: "21px",
          border: "none",
          fontSize: "14px",
          fontWeight: 600,
          color: canTrack ? "#ffffff" : "#9a9a9a",
          background: canTrack ? BRAND_COLOR : "#e0e0e0",
          cursor: canTrack ? "pointer" : "not-allowed",
          transition: "background 0.15s ease",
        }}
      >
        Track
      </button>
    </div>
  );
}