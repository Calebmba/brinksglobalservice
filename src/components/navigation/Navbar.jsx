import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import defaultLogo from "../../assets/logo.svg";
import defaultShield from "../../assets/shield.svg";

const BRAND_COLOR = "#0a4a8e";
const NAVBAR_HEIGHT = 48; // px

const NAV_ITEMS = [
  {
    label: "Shipping",
    links: ["Please sign in to create shipments."],
  },
  {
    label: "Billing",
    links: ["Please sign in to view bills and aging reports."],
  },
  {
    label: "Storage",
    links: ["Please sign in to view storage summary."],
  },
  {
    label: "Address Book",
    links: ["Please sign in to view your Address Book."],
  },
  {
    label: "Users",
    links: ["Please sign in to access User Management."],
  },
];

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: 100,
          cursor: "pointer",
          height: `${NAVBAR_HEIGHT}px`,
          padding: "0 4px",
        }}
      >
        {item.label}
        <ChevronDown
          size={16}
          style={{
            transition: "transform 0.15s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            minWidth: "200px",
            background: "#ffffff",
            borderRadius: "4px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            overflow: "hidden",
            zIndex: 50,
          }}
        >
          {item.links.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                display: "block",
                padding: "8px 17px",
                fontSize: "14px",
                color: "#1a1a1a",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4f8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ logoSrc = defaultLogo, shieldSrc = defaultShield }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: `${NAVBAR_HEIGHT}px`,
        background: BRAND_COLOR,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 23px",
        fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .navbar-links {
            display: none !important;
          }
        }
      `}</style>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <img
          src={logoSrc}
          alt="Company logo"
          style={{
            display: "block",
            height: "24px",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Nav links */}
      <div 
      className="navbar-links"
      style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "20px" }}>
        {NAV_ITEMS.map((item) => (
          <NavDropdown key={item.label} item={item} />
        ))}
      </div>

      {/* Right-side shield / account badge */}
      <button
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          marginLeft: "auto",
        }}
        aria-label="Account menu"
      >
        <img
          src={shieldSrc}
          alt="Account"
          style={{
            display: "block",
            width: "auto",
            height: "28px",
            objectFit: "contain",
          }}
        />
      </button>
    </nav>
  );
}