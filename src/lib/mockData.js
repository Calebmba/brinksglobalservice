// Mock data for the shipment tracking page.
// Swap this out for a real API response later — the shape is what TrackingPage.jsx expects.

export const shipment = {
  hawb: "000582914",
  status: "heldAtCustoms", // one of: "created" | "pickedUp" | "inTransit" | "delivered"

  shipper: {
    name: "DAVID BRIAN",
    addressLines: ["3071 Briarwood Drive", "Camden, NJ 08102", "US"],
  },

  pickup: {
    name: "Brink's Global Services",
    addressLines: ["580 5th Ave Ste 400", "New York, NY 10036", "US"],
  },

  consignee: {
    name: "REMORIE SABINE",
    addressLines: [
      "Zinniastraat 1",
      "BRESKENS, 4511 GR",
      "NL",
    ],
  },

  dates: {
    pickup: { label: "Actual", value: "2026-09-22 00:00" },
    delivery: { label: "Actual", value: "2026-09-22 12:30" },
    liability: "100.00 USD",
  },

  trackingNumbers: ["000582914"],

  // Only used/shown when status === "heldAtCustoms"
  hold: {
    location: "Netherlands Customs - Schiphol, NL",
    reason: "Awaiting customs clearance documentation.",
  },

  details: {
    serviceType: "WORLDWIDE DIPLOMATIC PACKAGE",
    routeNumber: "0801A/1990",
    weight: "65.8 kg",
    dimensions: "NOT APPLICABLE",
    specialInstructions: "Signature required on delivery.",
  },

  proofOfDeliveryUrl: "#",

  movementHistory: [
    {
      id: "m1",
      icon: "heldAtCustoms",
      title: "Held at Customs - Netherlands",
      timestamp: "2026-09-22 12:30",
    },
    {
      id: "m2",
      icon: "flightArrived",
      title: "Flight Arrived at EWR - Netherlands",
      timestamp: "2026-09-22 09:15",
    },
    {
      id: "m3",
      icon: "arrivedAtHub",
      title: "Arrived at Brink's Louisville HUB",
      timestamp: "2026-09-22 22:40",
    },
    {
      id: "m4",
      icon: "shipmentCreated",
      title: "Shipment Created",
      timestamp: "2026-08-28 08:12",
    },
    {
      id: "m5",
      icon: "itemPickedUp",
      title: "Item 000582914 Picked Up",
      timestamp: "2026-08-28 00:00",
    },
  ],
};