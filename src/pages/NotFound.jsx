import { SignpostBig } from "lucide-react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";

const BRAND_COLOR = "#0a4a8e";
const NAVBAR_HEIGHT = 48; // px, keep in sync with Navbar.jsx
const FOOTER_HEIGHT = 44; // px, keep in sync with Footer.jsx

function NotFound() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#ffffff",
      }}
    >
      <Navbar />

      <div
        style={{
          position: "absolute",
          top: `${NAVBAR_HEIGHT}px`,
          bottom: `${FOOTER_HEIGHT}px`,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <SignpostBig size={72} color={BRAND_COLOR} strokeWidth={1.5} />

        <h1
          style={{
            margin: "24px 0 8px",
            fontSize: "64px",
            fontWeight: 700,
            color: BRAND_COLOR,
            lineHeight: 1,
          }}
        >
          404
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 400,
            color: "#4a4a4a",
          }}
        >
          Page Not Found
        </p>

        <a
          href="/"
          style={{
            marginTop: "28px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
            background: BRAND_COLOR,
            padding: "10px 24px",
            borderRadius: "20px",
            textDecoration: "none",
          }}
        >
          Back to Home
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;
