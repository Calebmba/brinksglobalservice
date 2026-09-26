import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Plus,
  Package,
  RefreshCw,
  CheckCircle,
  FileText,
  UserCheck,
  Plane,
  PlaneLanding,
  ClipboardList,
  PackageCheck,
  PauseCircle,
  AlertTriangle,
} from "lucide-react";
import { shipment } from "../lib/mockData";

const BRAND_COLOR = "#0a4a8e";
const GRAY_BG = "#f5f5f5";
const NAVBAR_HEIGHT = 48; // px, keep in sync with Navbar.jsx
const FOOTER_HEIGHT = 44; // px, keep in sync with Footer.jsx

const HOLD_STATUS = "heldAtCustoms";

const STEPS = [
  { key: "created", label: "Created", icon: Plus },
  { key: "pickedUp", label: "Picked Up", icon: Package },
  { key: "inTransit", label: "In Transit", icon: RefreshCw },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const HOLD_STEP = { key: HOLD_STATUS, label: "Held", icon: PauseCircle };

const MOVEMENT_ICONS = {
  deliveredToCustomer: UserCheck,
  flightArrived: Plane,
  arrivedAtHub: PlaneLanding,
  shipmentCreated: ClipboardList,
  itemPickedUp: PackageCheck,
  heldAtCustoms: PauseCircle,
};

const DESKTOP_QUERY = "(min-width: 900px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia(DESKTOP_QUERY).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function InfoRow({ label, name, addressLines }) {
  return (
    <div style={{ display: "flex", gap: "16px", padding: "16px 0" }}>
      <div
        style={{
          flex: "0 0 110px",
          fontSize: "11px",
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          color: "#8a8a8a",
        }}
      >
        {label}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "17px", color: "#1a1a1a", marginBottom: "4px" }}>
          {name}
        </div>
        {addressLines.map((line, i) => (
          <div key={i} style={{ fontSize: "13px", color: "#8a8a8a", lineHeight: 1.5 }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const isOnHold = shipment.status === HOLD_STATUS;

  // Only insert the "Held" stage into the tracker when this shipment is on hold —
  // it sits between In Transit and Delivered, since that's when a hold occurs.
  const steps = isOnHold
    ? [...STEPS.slice(0, 3), HOLD_STEP, ...STEPS.slice(3)]
    : STEPS;

  const activeStepIndex = steps.findIndex((s) => s.key === shipment.status);

  return (
    <div
      style={{
        position: "fixed",
        top: `${NAVBAR_HEIGHT}px`,
        bottom: `${FOOTER_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        left: 0,
        right: 0,
        overflowY: "auto",
        boxSizing: "border-box",
        background: GRAY_BG,
        fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div
  style={{
    maxWidth: isDesktop ? "none" : "480px",
    margin: isDesktop ? 0 : "0 auto",
    background: "#ffffff",
    minHeight: "100%",
    paddingBottom: "120px", // added — extra breathing room at bottom of scroll
    boxShadow: isDesktop ? "none" : "0 0 24px rgba(0,0,0,0.08)",
    display: isDesktop ? "flex" : "block",
    alignItems: isDesktop ? "stretch" : undefined,
  }}
>
        {/* Blue header / sidebar on desktop */}
        <div
          style={{
            background: BRAND_COLOR,
            padding: isDesktop ? "40px 32px 32px" : "20px 20px 32px",
            flex: isDesktop ? "0 0 360px" : undefined,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                padding: 0,
                color: "#ffffff",
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#ffffff",
                textTransform: "uppercase",
              }}
            >
              Shipment
            </span>
          </div>

          <div style={{ marginTop: "48px" }}>
            <div
              style={{
                fontSize: "22px",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 300,
              }}
            >
              HAWB
            </div>
            <div style={{ fontSize: "36px", color: "#ffffff", fontWeight: 400 }}>
              {shipment.hawb}
            </div>
          </div>

          {isOnHold && shipment.hold && (
            <div
              style={{
                marginTop: "20px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "4px",
                padding: "14px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertTriangle size={16} color="#ffffff" strokeWidth={2} />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "0.02em",
                  }}
                >
                  Shipment On Hold
                </span>
              </div>

              <div style={{ marginTop: "10px", fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>Location: </span>
                  {shipment.hold.location}
                </div>
                <div style={{ marginTop: "4px" }}>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>Reason: </span>
                  {shipment.hold.reason}
                </div>
              </div>
            </div>
          )}

          {/* Status stepper */}
          <div
            style={{
              display: "flex",
              flexDirection: isDesktop ? "column" : "row",
              alignItems: isDesktop ? "flex-start" : "center",
              marginTop: isDesktop ? "40px" : "36px",
              gap: isDesktop ? "4px" : 0,
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStepIndex;
              const isDone = i <= activeStepIndex;
              return (
                <div
                  key={step.key}
                  style={
                    isDesktop
                      ? { display: "flex", flexDirection: "column" }
                      : { display: "contents" }
                  }
                >
                  {i > 0 &&
                    (isDesktop ? (
                      <div
                        style={{
                          width: "1px",
                          height: "20px",
                          background: "rgba(255,255,255,0.35)",
                          marginLeft: "19px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          flex: 1,
                          height: "1px",
                          background: "rgba(255,255,255,0.35)",
                          marginBottom: "22px",
                        }}
                      />
                    ))}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isDesktop ? "row" : "column",
                      alignItems: "center",
                      gap: isDesktop ? "12px" : "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        borderRadius: "50%",
                        border: `1.5px solid ${isDone ? "#ffffff" : "rgba(255,255,255,0.4)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isDone ? "#ffffff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <span
                      style={{
                        fontSize: isDesktop ? "12px" : "10px",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                        color: isDone ? "#ffffff" : "rgba(255,255,255,0.5)",
                        borderBottom: isActive ? "1px solid #ffffff" : "none",
                        paddingBottom: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side / everything below the header on mobile */}
        <div style={{ flex: isDesktop ? 1 : undefined, minWidth: 0 }}>
          {/* White content */}
          <div
            style={{
              padding: isDesktop ? "40px 40px 0" : "0 20px",
              display: isDesktop ? "grid" : "block",
              gridTemplateColumns: isDesktop
                ? "repeat(3, minmax(260px, 1fr))"
                : undefined,
              columnGap: isDesktop ? "48px" : undefined,
              maxWidth: isDesktop ? "1400px" : undefined,
            }}
          >
            <div style={{ borderBottom: isDesktop ? "none" : "1px solid #ececec" }}>
              <InfoRow
                label="Shipper"
                name={shipment.shipper.name}
                addressLines={shipment.shipper.addressLines}
              />
            </div>
            <div style={{ borderBottom: isDesktop ? "none" : "1px solid #ececec" }}>
              <InfoRow
                label="Pickup"
                name={shipment.pickup.name}
                addressLines={shipment.pickup.addressLines}
              />
            </div>
            <div style={{ borderBottom: isDesktop ? "none" : "1px solid #ececec" }}>
              <InfoRow
                label="Consignee / Delivery"
                name={shipment.consignee.name}
                addressLines={shipment.consignee.addressLines}
              />
            </div>
          </div>

          {shipment.proofOfDeliveryUrl && (
            <div style={{ padding: isDesktop ? "0 40px" : "0 20px", maxWidth: isDesktop ? "1400px" : undefined }}>
              <a
                href={shipment.proofOfDeliveryUrl}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 0",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: BRAND_COLOR,
                  textDecoration: "none",
                  borderBottom: "1px solid #ececec",
                }}
              >
                Proof of Delivery
                <FileText size={16} />
              </a>
            </div>
          )}

          {/* Two-column grid: Dates+Tracking on row 1, Movement History+Shipment Details on row 2 */}
          <div
            style={{
              display: isDesktop ? "grid" : "block",
              gridTemplateColumns: isDesktop ? "1fr 400px" : undefined,
              columnGap: isDesktop ? "32px" : 0,
              rowGap: isDesktop ? "32px" : 0,
              padding: isDesktop ? "32px 40px 40px" : 0,
              maxWidth: isDesktop ? "1400px" : undefined,
              alignItems: "start",
            }}
          >
            {/* Pickup/Delivery Dates */}
            <div style={{ background: GRAY_BG, padding: "20px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "16px", color: "#1a1a1a" }}>
                Pickup/Delivery Dates
              </h3>
              <DateRow label="Pickup" value={`${shipment.dates.pickup.label} ${shipment.dates.pickup.value}`} />
              <DateRow label="Delivery" value={`${shipment.dates.delivery.label} ${shipment.dates.delivery.value}`} />
              <DateRow label="Liability" value={shipment.dates.liability} plain />
            </div>

            {/* Tracking numbers */}
            <div style={{ padding: isDesktop ? "20px 20px 20px 0" : "20px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "16px", color: "#1a1a1a" }}>
                Tracking Number(s)
              </h3>
              {shipment.trackingNumbers.map((num) => (
                <div
                  key={num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #ececec",
                    fontSize: "15px",
                    color: "#1a1a1a",
                  }}
                >
                  {num}
                  <Plus size={16} color={BRAND_COLOR} />
                </div>
              ))}
            </div>

            {/* Package Movement History */}
            <div style={{ padding: isDesktop ? "4px 0 0" : "20px" }}>
              <h3
                style={{
                  margin: 0,
                  padding: "12px 0",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Package Movement History
              </h3>

              <div style={{ paddingTop: "8px" }}>
                {shipment.movementHistory.map((event, i) => {
                  const Icon = MOVEMENT_ICONS[event.icon] ?? Package;
                  const isLast = i === shipment.movementHistory.length - 1;
                  return (
                    <div key={event.id} style={{ display: "flex", gap: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            border: `1.5px solid ${BRAND_COLOR}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: BRAND_COLOR,
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} strokeWidth={1.75} />
                        </div>
                        {!isLast && (
                          <div
                            style={{
                              width: "1px",
                              flex: 1,
                              background: "#d9d9d9",
                              minHeight: "28px",
                            }}
                          />
                        )}
                      </div>
                      <div style={{ paddingBottom: "24px" }}>
                        <div style={{ fontSize: "14px", color: "#1a1a1a" }}>{event.title}</div>
                        <div style={{ fontSize: "12px", color: "#8a8a8a", marginTop: "2px" }}>
                          {event.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipment Details — same grid column/width as Tracking Number(s) above it */}
            {isDesktop && shipment.details && (
              <div
                style={{
                  background: GRAY_BG,
                  borderRadius: "4px",
                  padding: "20px",
                }}
              >
                <h3 style={{ margin: "0 0 12px", fontSize: "16px", color: "#1a1a1a" }}>
                  Shipment Details
                </h3>
                <DateRow label="Service Type" value={shipment.details.serviceType} plain />
                <DateRow label="Route Number" value={shipment.details.routeNumber} plain />
                <DateRow label="Weight" value={shipment.details.weight} plain />
                <DateRow label="Dimensions" value={shipment.details.dimensions} plain />

                {shipment.details.specialInstructions && (
                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        color: "#8a8a8a",
                        marginBottom: "6px",
                      }}
                    >
                      Special Instructions
                    </div>
                    <div style={{ fontSize: "13px", color: "#1a1a1a", lineHeight: 1.5 }}>
                      {shipment.details.specialInstructions}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DateRow({ label, value, plain }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        fontSize: "14px",
      }}
    >
      <span style={{ color: "#8a8a8a", textTransform: "uppercase", fontSize: "11px" }}>
        {label}
      </span>
      <span style={{ color: plain ? "#1a1a1a" : "#1f8a5f", fontWeight: 500 }}>{value}</span>
    </div>
  );
}