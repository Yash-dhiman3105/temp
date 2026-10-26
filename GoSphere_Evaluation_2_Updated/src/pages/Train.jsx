import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchContext } from "../context/SearchContext.jsx";
import { selectFavourites, toggleFavourite } from "../features/booking/bookingSlice.js";
import {
  Train as TrainIcon,
  MapPin,
  Calendar,
  ArrowLeftRight,
  Search,
  Wallet,
  Smile,
  Leaf,
  Clock,
  Star,
  Heart,
  X,
  Users,
  CheckCircle,
  ShieldCheck,
  Utensils,
  Zap,
} from "lucide-react";
import "../styles/Train.css";

// ============================================
// EXPANDED DUMMY TRAIN DATA (Multiple Routes)
// ============================================
const trainsData = [
  // ─── Delhi → Chandigarh ───────────────────────────────
  {
    id: 1,
    name: "Vande Bharat Express",
    number: "22439",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "06:00 AM",
    arrTime: "09:20 AM",
    durationLabel: "3h 20m",
    durationMinutes: 200,
    price: 850,
    classes: ["Executive Chair Car", "AC Chair Car"],
    score: { overall: 94, speed: 96, value: 82, comfort: 95, eco: 90 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "06:00 AM", gap: null },
      { station: "Ambala Cantt", time: "07:10 AM", gap: "1h 10m" },
      { station: "Chandigarh", time: "09:20 AM", gap: "2h 10m" },
    ],
  },
  {
    id: 2,
    name: "Shatabdi Express",
    number: "12005",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "07:40 AM",
    arrTime: "10:45 AM",
    durationLabel: "3h 05m",
    durationMinutes: 185,
    price: 720,
    classes: ["AC Chair Car", "Executive Chair Car"],
    score: { overall: 89, speed: 88, value: 85, comfort: 88, eco: 84 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food"],
    stops: [
      { station: "Delhi", time: "07:40 AM", gap: null },
      { station: "Ambala Cantt", time: "08:55 AM", gap: "1h 15m" },
      { station: "Chandigarh", time: "10:45 AM", gap: "1h 50m" },
    ],
  },
  {
    id: 3,
    name: "Kalka Shatabdi",
    number: "12011",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "07:20 AM",
    arrTime: "10:35 AM",
    durationLabel: "3h 15m",
    durationMinutes: 195,
    price: 690,
    classes: ["AC Chair Car", "Executive Chair Car"],
    score: { overall: 86, speed: 85, value: 80, comfort: 87, eco: 85 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food"],
    stops: [
      { station: "Delhi", time: "07:20 AM", gap: null },
      { station: "Ambala Cantt", time: "08:40 AM", gap: "1h 20m" },
      { station: "Chandigarh", time: "10:35 AM", gap: "1h 55m" },
    ],
  },
  {
    id: 4,
    name: "Shan-e-Punjab Express",
    number: "12497",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "06:50 AM",
    arrTime: "10:30 AM",
    durationLabel: "3h 40m",
    durationMinutes: 220,
    price: 480,
    classes: ["AC 2 Tier", "AC 3 Tier", "Sleeper"],
    score: { overall: 78, speed: 80, value: 88, comfort: 75, eco: 82 },
    facilities: ["❄️ AC", "🔌 Charging", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "06:50 AM", gap: null },
      { station: "Ambala Cantt", time: "08:30 AM", gap: "1h 40m" },
      { station: "Chandigarh", time: "10:30 AM", gap: "2h 00m" },
    ],
  },
  {
    id: 5,
    name: "Jan Shatabdi Express",
    number: "12046",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "05:15 AM",
    arrTime: "08:50 AM",
    durationLabel: "3h 35m",
    durationMinutes: 215,
    price: 410,
    classes: ["AC Chair Car", "Second Sitting"],
    score: { overall: 74, speed: 78, value: 90, comfort: 68, eco: 80 },
    facilities: ["🔌 Charging", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "05:15 AM", gap: null },
      { station: "Ambala Cantt", time: "06:45 AM", gap: "1h 30m" },
      { station: "Chandigarh", time: "08:50 AM", gap: "2h 05m" },
    ],
  },
  {
    id: 6,
    name: "Himalayan Queen",
    number: "14095",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "05:55 AM",
    arrTime: "12:15 PM",
    durationLabel: "6h 20m",
    durationMinutes: 380,
    price: 320,
    classes: ["AC 3 Tier", "Sleeper", "General"],
    score: { overall: 68, speed: 55, value: 92, comfort: 60, eco: 88 },
    facilities: ["🔌 Charging", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "05:55 AM", gap: null },
      { station: "Ambala Cantt", time: "08:20 AM", gap: "2h 25m" },
      { station: "Chandigarh", time: "12:15 PM", gap: "3h 55m" },
    ],
  },

  // ─── Mumbai → Pune ─────────────────────────────────────
  {
    id: 7,
    name: "Deccan Queen",
    number: "12123",
    from: "Mumbai",
    to: "Pune",
    depTime: "07:15 AM",
    arrTime: "10:25 AM",
    durationLabel: "3h 10m",
    durationMinutes: 190,
    price: 520,
    classes: ["AC Chair Car", "First Class"],
    score: { overall: 91, speed: 87, value: 86, comfort: 92, eco: 88 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food", "🪑 Comfortable Seating"],
    stops: [
      { station: "Mumbai CST", time: "07:15 AM", gap: null },
      { station: "Lonavala", time: "09:00 AM", gap: "1h 45m" },
      { station: "Pune", time: "10:25 AM", gap: "1h 25m" },
    ],
  },
  {
    id: 8,
    name: "Intercity Express",
    number: "12127",
    from: "Mumbai",
    to: "Pune",
    depTime: "06:05 AM",
    arrTime: "09:00 AM",
    durationLabel: "2h 55m",
    durationMinutes: 175,
    price: 390,
    classes: ["AC Chair Car", "Second Sitting"],
    score: { overall: 82, speed: 90, value: 88, comfort: 78, eco: 85 },
    facilities: ["❄️ AC", "🔌 Charging"],
    stops: [
      { station: "Mumbai CST", time: "06:05 AM", gap: null },
      { station: "Karjat", time: "07:40 AM", gap: "1h 35m" },
      { station: "Pune", time: "09:00 AM", gap: "1h 20m" },
    ],
  },
  {
    id: 9,
    name: "Pragati Express",
    number: "12129",
    from: "Mumbai",
    to: "Pune",
    depTime: "05:05 PM",
    arrTime: "07:50 PM",
    durationLabel: "2h 45m",
    durationMinutes: 165,
    price: 310,
    classes: ["AC Chair Car", "Second Sitting"],
    score: { overall: 79, speed: 88, value: 91, comfort: 72, eco: 83 },
    facilities: ["🔌 Charging", "🪑 Comfortable Seating"],
    stops: [
      { station: "Mumbai CST", time: "05:05 PM", gap: null },
      { station: "Karjat", time: "06:30 PM", gap: "1h 25m" },
      { station: "Pune", time: "07:50 PM", gap: "1h 20m" },
    ],
  },

  // ─── Delhi → Mumbai ─────────────────────────────────────
  {
    id: 10,
    name: "Rajdhani Express",
    number: "12951",
    from: "Delhi",
    to: "Mumbai",
    depTime: "04:55 PM",
    arrTime: "08:35 AM",
    durationLabel: "15h 40m",
    durationMinutes: 940,
    price: 3250,
    classes: ["AC 1 Tier", "AC 2 Tier", "AC 3 Tier"],
    score: { overall: 96, speed: 92, value: 78, comfort: 98, eco: 86 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food", "🛏️ Bedding"],
    stops: [
      { station: "Delhi", time: "04:55 PM", gap: null },
      { station: "Vadodara", time: "04:00 AM", gap: "11h 05m" },
      { station: "Surat", time: "06:05 AM", gap: "2h 05m" },
      { station: "Mumbai Central", time: "08:35 AM", gap: "2h 30m" },
    ],
  },
  {
    id: 11,
    name: "August Kranti Rajdhani",
    number: "12953",
    from: "Delhi",
    to: "Mumbai",
    depTime: "05:25 PM",
    arrTime: "09:25 AM",
    durationLabel: "16h 00m",
    durationMinutes: 960,
    price: 2950,
    classes: ["AC 2 Tier", "AC 3 Tier"],
    score: { overall: 88, speed: 85, value: 82, comfort: 90, eco: 84 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food", "🛏️ Bedding"],
    stops: [
      { station: "Delhi Hazrat Nizamuddin", time: "05:25 PM", gap: null },
      { station: "Kota", time: "10:50 PM", gap: "5h 25m" },
      { station: "Vadodara", time: "05:40 AM", gap: "6h 50m" },
      { station: "Mumbai Central", time: "09:25 AM", gap: "3h 45m" },
    ],
  },

  // ─── Bangalore → Chennai ─────────────────────────────────
  {
    id: 12,
    name: "Shatabdi Express",
    number: "12007",
    from: "Bangalore",
    to: "Chennai",
    depTime: "06:00 AM",
    arrTime: "11:00 AM",
    durationLabel: "5h 00m",
    durationMinutes: 300,
    price: 890,
    classes: ["Executive Chair Car", "AC Chair Car"],
    score: { overall: 90, speed: 88, value: 84, comfort: 91, eco: 87 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food", "🪑 Comfortable Seating"],
    stops: [
      { station: "Bangalore City", time: "06:00 AM", gap: null },
      { station: "Katpadi", time: "09:20 AM", gap: "3h 20m" },
      { station: "Chennai Central", time: "11:00 AM", gap: "1h 40m" },
    ],
  },
  {
    id: 13,
    name: "Brindavan Express",
    number: "12639",
    from: "Bangalore",
    to: "Chennai",
    depTime: "07:30 AM",
    arrTime: "12:55 PM",
    durationLabel: "5h 25m",
    durationMinutes: 325,
    price: 610,
    classes: ["AC Chair Car", "Second Sitting"],
    score: { overall: 80, speed: 78, value: 87, comfort: 76, eco: 83 },
    facilities: ["❄️ AC", "🔌 Charging"],
    stops: [
      { station: "Bangalore City", time: "07:30 AM", gap: null },
      { station: "Jolarpettai", time: "10:25 AM", gap: "2h 55m" },
      { station: "Chennai Central", time: "12:55 PM", gap: "2h 30m" },
    ],
  },

  // ─── Hyderabad → Vijayawada ──────────────────────────────
  {
    id: 14,
    name: "Godavari Express",
    number: "12727",
    from: "Hyderabad",
    to: "Vijayawada",
    depTime: "06:50 AM",
    arrTime: "11:30 AM",
    durationLabel: "4h 40m",
    durationMinutes: 280,
    price: 540,
    classes: ["AC 2 Tier", "AC 3 Tier", "Sleeper"],
    score: { overall: 83, speed: 80, value: 86, comfort: 82, eco: 84 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food"],
    stops: [
      { station: "Hyderabad", time: "06:50 AM", gap: null },
      { station: "Nalgonda", time: "08:45 AM", gap: "1h 55m" },
      { station: "Vijayawada", time: "11:30 AM", gap: "2h 45m" },
    ],
  },
  {
    id: 15,
    name: "Vande Bharat Express",
    number: "20701",
    from: "Hyderabad",
    to: "Vijayawada",
    depTime: "05:45 AM",
    arrTime: "09:25 AM",
    durationLabel: "3h 40m",
    durationMinutes: 220,
    price: 920,
    classes: ["Executive Chair Car", "AC Chair Car"],
    score: { overall: 93, speed: 94, value: 80, comfort: 95, eco: 91 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food", "📶 WiFi"],
    stops: [
      { station: "Hyderabad", time: "05:45 AM", gap: null },
      { station: "Khammam", time: "07:50 AM", gap: "2h 05m" },
      { station: "Vijayawada", time: "09:25 AM", gap: "1h 35m" },
    ],
  },

  // ─── Kolkata → Patna ─────────────────────────────────────
  {
    id: 16,
    name: "Vikramshila Express",
    number: "12367",
    from: "Kolkata",
    to: "Patna",
    depTime: "08:10 PM",
    arrTime: "08:00 AM",
    durationLabel: "11h 50m",
    durationMinutes: 710,
    price: 1180,
    classes: ["AC 2 Tier", "AC 3 Tier", "Sleeper"],
    score: { overall: 82, speed: 76, value: 84, comfort: 82, eco: 80 },
    facilities: ["❄️ AC", "🔌 Charging", "🛏️ Bedding"],
    stops: [
      { station: "Kolkata Howrah", time: "08:10 PM", gap: null },
      { station: "Asansol", time: "10:30 PM", gap: "2h 20m" },
      { station: "Dhanbad", time: "11:45 PM", gap: "1h 15m" },
      { station: "Patna", time: "08:00 AM", gap: "8h 15m" },
    ],
  },
];

// ============================================
// CLASS PRICES MAP
// ============================================
const classPriceMultiplier = {
  "Executive Chair Car": 1.5,
  "AC Chair Car": 1.2,
  "First Class": 1.8,
  "AC 1 Tier": 2.5,
  "AC 2 Tier": 1.8,
  "AC 3 Tier": 1.3,
  Sleeper: 1.0,
  "Second Sitting": 0.6,
  General: 0.4,
  "📶 WiFi": 0,
};

// ============================================
// BOOK TRAIN MODAL
// ============================================

function BookTrainModal({ train, onClose }) {
  const [passengers, setPassengers] = useState(1);
  const [selectedClass, setSelectedClass] = useState(train.classes[0]);
  const [addOns, setAddOns] = useState({ meals: false, insurance: false, priority: false });
  const [step, setStep] = useState(1); // 1 = form, 2 = confirmation
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const multiplier = classPriceMultiplier[selectedClass] ?? 1.0;
  const basePrice = Math.round(train.price * multiplier);
  const mealsPrice = addOns.meals ? 150 * passengers : 0;
  const insurancePrice = addOns.insurance ? 99 : 0;
  const priorityPrice = addOns.priority ? 50 * passengers : 0;
  const totalPrice = basePrice * passengers + mealsPrice + insurancePrice + priorityPrice;

  function toggleAddOn(key) {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    setStep(2);
  }

  return (
    <div className="book-modal-overlay" onClick={onClose}>
      <div className="book-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="book-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        {step === 1 ? (
          <>
            <div className="book-modal-header">
              <span className="book-modal-eyebrow">🚆 Book Your Ticket</span>
              <h2 className="book-modal-title">{train.name}</h2>
              <p className="book-modal-sub">
                {train.from} → {train.to} &nbsp;·&nbsp; {train.depTime} – {train.arrTime}
              </p>
            </div>
            <form className="book-modal-form" onSubmit={handleConfirm} noValidate>
              {/* Passenger Details */}
              <div className="book-section-label">Passenger Details</div>
              <div className="book-fields-grid">
                <div className="book-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="book-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="book-field book-field-full">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="rahul@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Passengers Count */}
              <div className="book-section-label">
                <Users size={14} /> Number of Passengers
              </div>
              <div className="book-passenger-row">
                <button
                  type="button"
                  className="book-count-btn"
                  onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                  disabled={passengers <= 1}
                >−</button>
                <span className="book-count-num">{passengers}</span>
                <button
                  type="button"
                  className="book-count-btn"
                  onClick={() => setPassengers((p) => Math.min(6, p + 1))}
                  disabled={passengers >= 6}
                >+</button>
                <span className="book-count-hint">Max 6 passengers</span>
              </div>

              {/* Class Selection */}
              <div className="book-section-label">Travel Class</div>
              <div className="book-class-options">
                {train.classes.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    className={`book-class-btn ${selectedClass === cls ? "active" : ""}`}
                    onClick={() => setSelectedClass(cls)}
                  >
                    <span className="book-class-name">{cls}</span>
                    <span className="book-class-price">
                      ₹{Math.round(train.price * (classPriceMultiplier[cls] ?? 1))}
                    </span>
                  </button>
                ))}
              </div>
              {/* Add-ons */}
              <div className="book-section-label">Add-ons (Optional)</div>
              <div className="book-addons">
                <label className={`addon-card ${addOns.meals ? "selected" : ""}`}>
                  <input
                    type="checkbox"
                    checked={addOns.meals}
                    onChange={() => toggleAddOn("meals")}
                  />
                  <Utensils size={18} />
                  <span>
                    <strong>Meals on Board</strong>
                    <small>+₹150/person</small>
                  </span>
                </label>
                <label className={`addon-card ${addOns.insurance ? "selected" : ""}`}>
                  <input
                    type="checkbox"
                    checked={addOns.insurance}
                    onChange={() => toggleAddOn("insurance")}
                  />
                  <ShieldCheck size={18} />
                  <span>
                    <strong>Travel Insurance</strong>
                    <small>+₹99 flat</small>
                  </span>
                </label>
                <label className={`addon-card ${addOns.priority ? "selected" : ""}`}>
                  <input
                    type="checkbox"
                    checked={addOns.priority}
                    onChange={() => toggleAddOn("priority")}
                  />
                  <Zap size={18} />
                  <span>
                    <strong>Priority Boarding</strong>
                    <small>+₹50/person</small>
                  </span>
                </label>
              </div>

              {/* Fare Summary */}
              <div className="book-fare-summary">
                <div className="book-fare-row">
                  <span>Base Fare ({passengers} × ₹{basePrice})</span>
                  <span>₹{basePrice * passengers}</span>
                </div>
                {addOns.meals && (
                  <div className="book-fare-row">
                    <span>Meals ({passengers} × ₹150)</span>
                    <span>₹{mealsPrice}</span>
                  </div>
                )}
                {addOns.insurance && (
                  <div className="book-fare-row">
                    <span>Travel Insurance</span>
                    <span>₹{insurancePrice}</span>
                  </div>
                )}
                {addOns.priority && (
                  <div className="book-fare-row">
                    <span>Priority Boarding ({passengers} × ₹50)</span>
                    <span>₹{priorityPrice}</span>
                  </div>
                )}
                <div className="book-fare-row book-fare-total">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="submit"
                className="book-confirm-btn"
                disabled={!name.trim() || !phone.trim() || !email.trim()}
              >
                Confirm Booking → ₹{totalPrice.toLocaleString("en-IN")}
              </button>
            </form>
          </>
        ) : (
          <div className="book-success">
            <div className="book-success-icon">
              <CheckCircle size={54} />
            </div>
            <h2>Booking Confirmed! 🎉</h2>
            <p>
              Your ticket for <strong>{train.name}</strong> has been booked successfully.
            </p>
            <div className="book-success-details">
              <div className="success-detail-row">
                <span>Route</span>
                <strong>{train.from} → {train.to}</strong>
              </div>
              <div className="success-detail-row">
                <span>Passengers</span>
                <strong>{passengers}</strong>
              </div>
              <div className="success-detail-row">
                <span>Class</span>
                <strong>{selectedClass}</strong>
              </div>
              <div className="success-detail-row">
                <span>Name</span>
                <strong>{name}</strong>
              </div>
              <div className="success-detail-row">
                <span>Total Paid</span>
                <strong className="success-price">₹{totalPrice.toLocaleString("en-IN")}</strong>
              </div>
            </div>
            <p className="book-success-note">
              A confirmation will be sent to <strong>{email}</strong>
            </p>
            <button className="book-confirm-btn" onClick={onClose}>
              Done ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ============================================
// COMPONENT PARTS
// ============================================

function TrainHero() {
  return (
    <section className="hero">
      <div className="hero-rail-art" aria-hidden="true">
        <div className="rail-track" />
        <div className="rail-track rail-track-2" />
        <span className="station-dot dot-1" />
        <span className="station-dot dot-2" />
        <span className="station-dot dot-3" />
        <span className="station-dot dot-4" />
        <div className="moving-train">
          <TrainIcon size={22} />
        </div>
      </div>

      <div className="hero-content">
        <span className="eyebrow">
          <TrainIcon size={14} style={{ display: 'inline', marginRight: 4, transform: 'translateY(1px)' }} /> GOSPHERE &middot; TRAIN TRAVEL
        </span>
        <h1>Your Journey Begins on the Right Track.</h1>
        <p>
          Explore train journeys across India, compare travel options and find the route
          that fits you best.
        </p>
      </div>
    </section>
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function sortTrains(list, sortBy) {
  const copy = [...list];
  if (sortBy === "fastest") {
    copy.sort((a, b) => a.durationMinutes - b.durationMinutes);
  } else if (sortBy === "cheapest") {
    copy.sort((a, b) => a.price - b.price);
  } else {
    copy.sort((a, b) => b.score.overall - a.score.overall);
  }
  return copy;
}

function TrainSearch({ onSearch, initialSearch }) {
  const [from, setFrom] = useState(initialSearch?.from || "Delhi");
  const [to, setTo] = useState(initialSearch?.to || "Chandigarh");
  const [date, setDate] = useState(initialSearch?.date || "");
  const [error, setError] = useState("");
  const today = new Date().toLocaleDateString("en-CA");

  function handleSwap() {
    setFrom(to);
    setTo(from);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const cleanFrom = from.trim();
    const cleanTo = to.trim();

    if (!cleanFrom || !cleanTo || !date) {
      setError("Please enter both stations and choose a journey date.");
      return;
    }
    if (cleanFrom.toLowerCase() === cleanTo.toLowerCase()) {
      setError("Departure and destination must be different.");
      return;
    }
    if (date < today) {
      setError("Journey date cannot be in the past.");
      return;
    }

    setError("");
    onSearch({ from: cleanFrom, to: cleanTo, date });
  }

  return (
    <section className="search-section">
      <form className="search-card" onSubmit={handleSubmit} noValidate>
        <div className="ticket-strip">
          <span>BOARDING PASS</span>
          <span>GOSPHERE RAIL</span>
        </div>

        <div className="search-body">
          <div className="search-fields">
            <div className="field">
              <label htmlFor="train-from">From</label>
              <div className="field-input">
                <MapPin size={16} />
                <input id="train-from" type="text" placeholder="Delhi" value={from}
                  onChange={(e) => { setFrom(e.target.value); setError(""); }} />
              </div>
            </div>

            <button type="button" className="swap-btn train-swap-btn" onClick={handleSwap}
              title="Swap stations" aria-label="Swap stations">
              <ArrowLeftRight size={18} color="#ffffff" />
            </button>

            <div className="field">
              <label htmlFor="train-to">To</label>
              <div className="field-input">
                <MapPin size={16} />
                <input id="train-to" type="text" placeholder="Chandigarh" value={to}
                  onChange={(e) => { setTo(e.target.value); setError(""); }} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="train-date">Journey Date</label>
              <div className="field-input">
                <Calendar size={16} />
                <input id="train-date" type="date" min={today} value={date}
                  onChange={(e) => { setDate(e.target.value); setError(""); }} />
              </div>
            </div>
          </div>

          {error && <p className="train-form-error" role="alert">{error}</p>}
          <div className="search-action-row">
            <button type="submit" className="search-btn train-search-btn">
              <Search size={18} color="#ffffff" /> <span>Search Trains 🚆</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function TravelScore({ score }) {
  const factors = [
    { key: "speed", label: "⚡ Speed", value: score.speed },
    { key: "value", label: "💰 Value", value: score.value },
    { key: "comfort", label: "😌 Comfort", value: score.comfort },
    { key: "eco", label: "🌱 Eco-Friendly", value: score.eco },
  ];

  return (
    <div className="travel-score">
      <div className="score-circle">
        <span className="score-number">{score.overall}</span>
        <span className="score-max">/100</span>
      </div>
      <div className="score-bars">
        {factors.map((factor) => (
          <div className="score-row" key={factor.key}>
            <span className="score-label">{factor.label}</span>
            <div className="score-track">
              <div
                className="score-fill"
                style={{ width: factor.value + "%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainCard({ train, onBook }) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);
  const isFavourite = favourites.some((item) => item.id === train.id);

  return (
    <div className="train-card">
      <div className="train-card-top">
        <div>
          <h3>{train.name}</h3>
          <span className="train-number">Train No. {train.number}</span>
        </div>
        <div className="train-card-badges">
          <span className="score-pill"><Star size={14} /> {train.score.overall}/100</span>
          <button type="button" className={`favourite-btn ${isFavourite ? "is-favourite" : ""}`}
            onClick={() => dispatch(toggleFavourite(train))}
            aria-pressed={isFavourite}
            aria-label={isFavourite ? `Remove ${train.name} from favourites` : `Save ${train.name} to favourites`}>
            <Heart size={16} fill={isFavourite ? "currentColor" : "none"} />
            {isFavourite ? "Saved" : "Save train"}
          </button>
        </div>
      </div>

      <div className="route-row">
        <div className="route-point">
          <span className="time">{train.depTime}</span>
          <span className="station">{train.from}</span>
        </div>
        <div className="route-line-mini">
          <Clock size={14} />
          <span>{train.durationLabel}</span>
        </div>
        <div className="route-point align-right">
          <span className="time">{train.arrTime}</span>
          <span className="station">{train.to}</span>
        </div>
      </div>

      <div className="train-card-bottom">
        <div className="price-classes">
          <span className="price">💰 Starting ₹{train.price}</span>
          <span className="classes">{train.classes.join(" · ")}</span>
        </div>
        <TravelScore score={train.score} />
      </div>

      <div className="train-card-facilities">
        {train.facilities.map((f) => (
          <span key={f} className="facility-pill">{f}</span>
        ))}
      </div>

      <button
        type="button"
        className="book-train-btn"
        onClick={() => onBook(train)}
      >
        🎫 Book Train
      </button>
    </div>
  );
}

function SortBar({ sortBy, onSortChange }) {
  const options = [
    { key: "best", label: "⭐ Best Overall" },
    { key: "fastest", label: "⚡ Fastest" },
    { key: "cheapest", label: "💰 Cheapest" },
  ];

  return (
    <div className="sort-bar">
      {options.map((option) => (
        <button
          key={option.key}
          className={sortBy === option.key ? "sort-btn active" : "sort-btn"}
          onClick={() => onSortChange(option.key)}
          >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function TrainResults({ trains, sortBy, onSortChange, search, onBook }) {
  const sortedTrains = sortTrains(trains, sortBy);
  const favourites = useSelector(selectFavourites);

  return (
    <section className="results-section">
      <div className="results-header">
        <div>
          <h2>Trains from {search.from} to {search.to}</h2>
          <p className="results-meta">
            {sortedTrains.length} {sortedTrains.length === 1 ? "train" : "trains"} found · Journey date: {search.date}
          </p>
        </div>
        <SortBar sortBy={sortBy} onSortChange={onSortChange} />
      </div>

      {sortedTrains.length > 0 ? (
        <div className="train-list">
          {sortedTrains.map((train) => <TrainCard key={train.id} train={train} onBook={onBook} />)}
        </div>
      ) : (
        <div className="train-empty-state">
          <TrainIcon size={30} />
          <h3>No trains found for this route</h3>
          <p>Try routes like Delhi→Chandigarh, Mumbai→Pune, Delhi→Mumbai, Bangalore→Chennai, Hyderabad→Vijayawada, or Kolkata→Patna.</p>
        </div>
      )}
      {favourites.length > 0 && (
        <p className="favourites-hint">♥ You have saved {favourites.length} {favourites.length === 1 ? "train" : "trains"} to your favourites.</p>
      )}
      <p className="sample-data-note">Demo project: train names, times and fares are sample data and are not live railway availability.</p>
    </section>
  );
}

function TrainBenefits() {
  const benefits = [
    {
      icon: <Leaf size={22} />,
      title: "🌱 Eco-Friendly",
      text: "A more sustainable way to travel.",
    },
    {
      icon: <Smile size={22} />,
      title: "🛋️ Comfortable",
      text: "Relax and enjoy the journey.",
    },
    {
      icon: <Wallet size={22} />,
      title: "💰 Great Value",
      text: "A balanced combination of cost and convenience.",
    },
  ];
  return (
    
    <section className="benefits-section">
      <h2>Why Travel by Train?</h2>
      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// EXPORTED COMPONENT
// ============================================

export default function Train() {
  const [search, setSearch] = useState(null);
  const [sortBy, setSortBy] = useState("best");
  const [bookingTrain, setBookingTrain] = useState(null);
  const { latestSearch, setLatestSearch } = useSearchContext();

  const initialSearch = search || latestSearch;
  const filteredTrains = search
    ? trainsData.filter((train) =>
        train.from.toLowerCase() === search.from.toLowerCase() &&
        train.to.toLowerCase() === search.to.toLowerCase()
      )
    : [];

  function handleSearch(criteria) {
    setSearch(criteria);
    setLatestSearch(criteria);
    setSortBy("best");
  }

  return (
    <div className="train-page">
      <TrainHero />
      <TrainSearch onSearch={handleSearch} initialSearch={initialSearch} />
      {search && (
        <TrainResults
          trains={filteredTrains}
          sortBy={sortBy}
          onSortChange={setSortBy}
          search={search}
          onBook={setBookingTrain}
        />
      )}
      <TrainBenefits />
      {bookingTrain && (
        <BookTrainModal
          train={bookingTrain}
          onClose={() => setBookingTrain(null)}
        />
      )}
    </div>
  );
}