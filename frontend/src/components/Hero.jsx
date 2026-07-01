import { Link } from "react-router-dom";

function Hero() {
return ( <section className="bg-[#F8F6F2] overflow-hidden"> <div className="max-w-7xl mx-auto px-6 py-24">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT CONTENT */}
      <div>

        <p className="uppercase tracking-[5px] text-green-700 font-semibold text-sm mb-6">
          Sunrise · Sourced · Subscribed
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-green-950 leading-tight">
          Freshness,
          <br />
          <span className="italic font-light">
            delivered at dawn.
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
          Premium fruit baskets and cold-pressed juices,
          hand-picked every morning and delivered directly
          to your home across India.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">

          <Link
            to="/plans"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-medium shadow-lg"
          >
            Choose your Plan
          </Link>

          <Link
            to="/products"
            className="border border-gray-300 hover:bg-white px-8 py-4 rounded-full font-medium"
          >
            View Products
          </Link>

        </div>

        <div className="flex flex-wrap gap-8 mt-12 text-gray-600 text-sm">
          <span>⭐ 4.9 Rating</span>
          <span>10,000+ Customers</span>
          <span>100+ Cities</span>
        </div>

      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">

        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="Fresh Fruits"
          className="w-full h-[550px] object-cover rounded-[32px] shadow-2xl"
        />

        {/* Floating Card */}
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl">

          <p className="text-green-700 text-sm font-bold uppercase">
            Today's Pick
          </p>

          <h3 className="text-2xl font-bold mt-2">
            Seasonal Fruit Box
          </h3>

          <p className="text-gray-500 mt-2">
            Freshly packed this morning
          </p>

        </div>

      </div>

    </div>

  </div>
</section>


);
}

export default Hero;
