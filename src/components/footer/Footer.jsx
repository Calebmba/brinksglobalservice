const BRAND_COLOR = "#0a4a8e";
const FOOTER_HEIGHT = 40; // px

export default function Footer({
  version = "5.0.4",
  companyName = "Brink's Inc",
  year = new Date().getFullYear(),
}) {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: `${FOOTER_HEIGHT}px`,
        background: BRAND_COLOR,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 11px",
        fontFamily:
          "'IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >

      <style>{`
        @media (max-width: 768px) {
          .footer-copyright,
          .footer-contact {
            display: none !important;
          }
        }
      `}</style>

      {/* Left: version link */}
      <a
        href="#"
        style={{
          color: "#ffffff",
          textDecoration: "underline",
        }}
      >
        Version {version}
      </a>

      {/* Center: copyright */}
      <span className="footer-copyright">
        © {year}, {companyName}. All rights reserved.
      </span>

      {/* Right: contact / terms */}
      <div 
      className="footer-contact"
      style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <a href="#" style={{ color: "#ffffff", textDecoration: "none" }}>
          Contact Us
        </a>
        <span style={{ opacity: 0.6 }}>|</span>
        <a href="#" style={{ color: "#ffffff", textDecoration: "underline" }}>
          Terms of Use
        </a>
        </div>
    </footer>
  );
}
