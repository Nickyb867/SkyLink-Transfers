import { useState } from "react";
import { Car, Plane, Phone, Mail } from "lucide-react";

const prices = {
  Manchester: 60,
  Liverpool: 55,
  Leeds: 90,
  "East Midlands": 120,
};

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", pickup: "", dropoff: "" });
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Booking confirmed! Check your email & SMS.");
      setForm({ name: "", email: "", phone: "", pickup: "", dropoff: "" });
      setQuote(null);
    } else {
      setMessage("There was an error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-600 text-white text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">SkyLink Transfers</h1>
        <p className="text-lg md:text-2xl">Reliable airport transfers made simple</p>
      </section>

      {/* Instant Quote */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Get an Instant Quote</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const pickup = e.target.pickup.value;
              const dest = e.target.destination.value;
              const price = prices[dest];
              if (price) setQuote({ pickup, dest, price });
            }}
            className="grid gap-4 bg-gray-50 p-6 rounded-2xl shadow-md"
          >
            <input
              type="text"
              name="pickup"
              placeholder="Enter your address"
              className="border p-3 rounded-lg w-full"
              required
            />
            <select name="destination" className="border p-3 rounded-lg w-full" required>
              <option value="">Select destination</option>
              <option value="Manchester">Manchester</option>
              <option value="Liverpool">Liverpool</option>
              <option value="Leeds">Leeds</option>
              <option value="East Midlands">East Midlands</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Get Quote
            </button>
          </form>

          {quote && (
            <div className="mt-6 bg-blue-100 p-6 rounded-xl text-center">
              <p className="text-lg font-semibold">
                Price to {quote.dest}: <span className="text-blue-700">£{quote.price}</span>
              </p>
              <button
                onClick={() =>
                  setForm({ ...form, pickup: quote.pickup, dropoff: quote.dest })
                }
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Proceed to Booking
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Booking Form */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Book Your Transfer</h2>
          <form onSubmit={handleBooking} className="grid gap-4 bg-white p-6 rounded-2xl shadow-md">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border p-3 rounded-lg w-full"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Pickup Address"
              className="border p-3 rounded-lg w-full"
              value={form.pickup}
              onChange={(e) => setForm({ ...form, pickup: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Dropoff Destination"
              className="border p-3 rounded-lg w-full"
              value={form.dropoff}
              onChange={(e) => setForm({ ...form, dropoff: e.target.value })}
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Confirm Booking
            </button>
          </form>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <Car className="mx-auto h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">Door-to-Door Service</h3>
          </div>
          <div>
            <Plane className="mx-auto h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">Flight Tracking</h3>
          </div>
          <div>
            <Phone className="mx-auto h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">24/7 Support</h3>
          </div>
          <div>
            <Mail className="mx-auto h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold">Card Payments Accepted</h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© {new Date().getFullYear()} SkyLink Transfers. All rights reserved.</p>
      </footer>
    </main>
  );
}
