import Head from "next/head";
import { useState } from "react";
import { Car, Plane, Phone, CreditCard } from "lucide-react";

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
    <>
      {/* SEO Head */}
      <Head>
        <title>SkyLink Transfers | Airport Taxi & Minibus Service Manchester</title>
        <meta
          name="description"
          content="SkyLink Transfers offers reliable airport taxi and minibus transfers to Manchester, Liverpool, Leeds, and East Midlands Airport. Professional drivers, flight tracking, and card payments accepted."
        />
        <meta
          name="keywords"
          content="Manchester airport transfer, Liverpool airport taxi, Leeds airport taxi, East Midlands airport transfers, Mercedes minibus Manchester"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero with Background Image */}
        <section
          className="relative h-[70vh] flex items-center justify-center text-center text-white"
          style={{
            backgroundImage: "url('https://source.unsplash.com/1600x900/?aircraft,airport')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              SkyLink Transfers
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              Professional Airport Taxi & Minibus Transfers
            </p>
            <a
              href="#quote"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium hover:opacity-90 transition"
            >
              Get a Quote
            </a>
          </div>
        </section>

        {/* Instant Quote */}
        <section id="quote" className="bg-white py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Get an Instant Quote</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const pickup = e.target.pickup.value;
                const dest = e.target.destination.value;
                const price = prices[dest];
                if (price) setQuote({ pickup, dest, price });
              }}
              className="grid gap-4 bg-gray-50 p-6 rounded-2xl shadow-xl"
            >
              <input
                type="text"
                name="pickup"
                placeholder="Enter your pickup address"
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
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Get Quote
              </button>
            </form>

            {quote && (
              <div className="mt-6 bg-blue-100 p-6 rounded-xl text-center shadow-md">
                <p className="text-lg font-semibold">
                  Price to {quote.dest}:{" "}
                  <span className="text-blue-700 font-bold">£{quote.price}</span>
                </p>
                <button
                  onClick={() =>
                    setForm({ ...form, pickup: quote.pickup, dropoff: quote.dest })
                  }
                  className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg font-semibold"
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
            <h2 className="text-3xl font-bold text-center mb-8">Book Your Transfer</h2>
            <form
              onSubmit={handleBooking}
              className="grid gap-4 bg-white p-6 rounded-2xl shadow-xl"
            >
              <input
                type="text"
                placeholder="Full Name"
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
                placeholder="Phone Number"
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
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Confirm Booking
              </button>
            </form>
            {message && <p className="mt-4 text-center font-medium">{message}</p>}
          </div>
        </section>

        {/* Fleet Showcase */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <img
              src="https://source.unsplash.com/800x500/?mercedes,minibus"
              alt="Luxury Mercedes Minibus for airport transfers"
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">Travel in Comfort</h2>
              <p className="mb-4">
                Our modern fleet includes spacious Mercedes minibuses and executive cars, ensuring
                a smooth and relaxing ride to your destination.
              </p>
              <ul className="space-y-2">
                <li>✔️ Professional drivers</li>
                <li>✔️ Flight tracking</li>
                <li>✔️ Card payments accepted</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <Car className="mx-auto h-10 w-10 text-blue-600 mb-2" />
              <h3 className="font-semibold">Door-to-Door Service</h3>
              <p>Reliable pickup and dropoff at your home, office, or airport.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <Plane className="mx-auto h-10 w-10 text-blue-600 mb-2" />
              <h3 className="font-semibold">Flight Tracking</h3>
              <p>We monitor your flight and adjust for delays.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <Phone className="mx-auto h-10 w-10 text-blue-600 mb-2" />
              <h3 className="font-semibold">24/7 Support</h3>
              <p>Book anytime, day or night, with friendly support.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <CreditCard className="mx-auto h-10 w-10 text-blue-600 mb-2" />
              <h3 className="font-semibold">Card Payments</h3>
              <p>Pay securely with debit or credit cards.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p>© {new Date().getFullYear()} SkyLink Transfers. All rights reserved.</p>
          <p className="text-sm">Manchester | Liverpool | Leeds | East Midlands</p>
        </footer>
      </main>
    </>
  );
}
