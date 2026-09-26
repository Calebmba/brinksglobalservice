import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Eye, EyeOff } from "lucide-react";
import FloatingLabelInput from "./FloatingLabelInput";
import defaultAppStoreBadge from "../../assets/appstore.png";
import defaultGooglePlayBadge from "../../assets/googleplay.png";

const BRAND_COLOR = "#0a4a8e";

export default function LoginCard({
  appStoreSrc = defaultAppStoreBadge,
  googlePlaySrc = defaultGooglePlayBadge,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const canSignIn = username.trim().length > 0 && password.trim().length > 0;

  return (
    <div
      style={{
        marginBottom: "10px",
        width: "288px",
        height: "330px",
        boxSizing: "border-box",
        background: "#ffffff",
        borderRadius: "6px",
        border: "1px solid #c0392b",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        padding: "16px",
        fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <h2
        style={{
          margin: "0 0 10px",
          fontSize: "13px",
          fontWeight: 600,
          color: BRAND_COLOR,
          textAlign: "center",
        }}
      >
        Login to Brink&apos;s Online
      </h2>

      <div style={{ marginBottom: "8px" }}>
        <FloatingLabelInput
          label="Username"
          required
          height={34}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          rightElement={<User size={14} color="#5a5a5a" />}
        />
      </div>

      <FloatingLabelInput
        label="Password"
        required
        height={34}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: 0,
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={14} color={BRAND_COLOR} />
            ) : (
              <Eye size={14} color={BRAND_COLOR} />
            )}
          </button>
        }
      />

      <button
        disabled={!canSignIn}
        onClick={() => navigate("/404")}
        style={{
          width: "100%",
          marginTop: "10px",
          height: "32px",
          borderRadius: "16px",
          border: "none",
          fontSize: "13px",
          fontWeight: 600,
          color: canSignIn ? "#ffffff" : "#9a9a9a",
          background: canSignIn ? BRAND_COLOR : "#e0e0e0",
          cursor: canSignIn ? "pointer" : "not-allowed",
          transition: "background 0.15s ease",
        }}
      >
        Sign In
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          margin: "8px 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "#d9d9d9" }} />
        <span style={{ fontSize: "11px", color: "#8a8a8a" }}>OR</span>
        <div style={{ flex: 1, height: "1px", background: "#d9d9d9" }} />
      </div>

      <button
        onClick={() => navigate("/404")}
        style={{
          width: "100%",
          height: "32px",
          borderRadius: "16px",
          border: `1px solid ${BRAND_COLOR}`,
          fontSize: "13px",
          fontWeight: 600,
          color: BRAND_COLOR,
          background: "#ffffff",
          cursor: "pointer",
        }}
      >
        Register
      </button>

      <div style={{ textAlign: "center", margin: "8px 0" }}>
        <Link
          to="/404"
          style={{
            fontSize: "11px",
            color: "#1a1a1a",
            textDecoration: "none",
          }}
        >
          Forgot Password?
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <img src={appStoreSrc} alt="Download on the App Store" style={{ display: "block", height: "28px", width: "auto" }} />
        <img src={googlePlaySrc} alt="Get it on Google Play" style={{ display: "block", height: "28px", width: "auto" }} />
      </div>
    </div>
  );
}