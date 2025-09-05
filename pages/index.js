import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Phone, Mail, Plane } from "lucide-react";

export default function Home() {
  const prices = {
    Manchester: 60,
    Liverpool: 55,
    Leeds: 90,
    "East Midlands": 120,
  };

  const [quote, setQuote] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickup: "",
    dropoff: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Booking confirmed! Check your email and SMS for confirmation.");
      setForm({ name: "", email: "", phone: "", pickup: "", dropoff: "" });
      setQuote(null);
    } else {
      alert("There was an error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">SkyLink Transfers</h1>
        <p className="text-lg md:text-xl mb-6">
          Reliable airport transfers with instant quotes, email & SMS booking confirmation.
        </p>
        <Button className="bg-white text-blue-600 font-semibold rounded-xl shadow-lg">
          Book Your Ride
        </Button>
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
              if (price) {
                setQuote({ pickup, dest, price });
              }
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
            <Button type="submit" className="bg-blue-600 text-white">
              Get Quote
            </Button>
          </form>

          {quote && (
            <div className="mt-6 bg-blue-100 p-6 rounded-xl text-center">
              <p className="text-lg font-semibold">
                Price to {quote.dest}: <span className="text-blue-700">£{quote.price}</span>
              </p>
              <Button
                onClick={() =>
                  setForm({ ...form, pickup: quote.pickup, dropoff: quote.dest })
                }
                className="mt-4 bg-blue-600 text-white"
              >
                Proceed to Booking
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Booking Form */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Book Your Transfer</h2>
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 bg-white p-6 rounded-2xl shadow-md"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (e.g., +447... )"
              pattern="^\\+?[0-9\\s-]{7,15}$"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              placeholder="Pickup Address"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="dropoff"
              value={form.dropoff}
              onChange={handleChange}
              placeholder="Dropoff Location"
              className="border p-3 rounded-lg w-full"
              required
            />
            <Button type="submit" className="bg-blue-600 text-white">
              Confirm Booking
            </Button>
          </form>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <Car className="mx-auto mb-4 text-blue-600" size={40} />
            <h3 className="font-bold text-lg mb-2">Modern Vehicles</h3>
            <p>Comfortable, reliable, and well-maintained cars for your journey.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <Plane className="mx-auto mb-4 text-blue-600" size={40} />
            <h3 className="font-bold text-lg mb-2">Flight Tracking</h3>
            <p>We monitor your flight to ensure on-time pickups every time.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <Mail className="mx-auto mb-4 text-blue-600" size={40} />
            <h3 className="font-bold text-lg mb-2">Easy Payments</h3>
            <p>We accept secure card payments for your convenience.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="mb-6">Have questions? Contact us today.</p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <p className="flex items-center gap-2 justify-center">
            <Phone size={20} /> +44 1234 567890
          </p>
          <p className="flex items-center gap-2 justify-center">
            <Mail size={20} /> info@skylinktransfers.com
          </p>
        </div>
      </section>
    </div>
  );
}

