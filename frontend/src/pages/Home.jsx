import Hero from "../components/Hero";

function Home() {
  return (
    <div className="bg-gray-50">

      <Hero />

      <div className="max-w-7xl mx-auto px-6">

        {/* Features */}
    {/* Features */}
<section className="py-20 bg-white rounded-2xl mt-10">

  <div className="text-center mb-12">

    <span className="text-green-600 text-sm font-bold uppercase tracking-widest">
      Why Bushel
    </span>

    <h2 className="text-5xl font-bold mt-4">
      Everything You Need For
      <span className="text-green-600"> Healthy Living</span>
    </h2>

    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
      Fresh fruits, cold-pressed juices, and healthy meal plans delivered
      directly to your doorstep with flexible subscriptions.
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-8">
    {/* cards same */}
  </div>

</section>

{/* Plans */}
<section className="py-20 bg-green-50 rounded-2xl mt-10">

  <div className="text-center mb-12">

    <span className="text-green-600 text-sm font-bold uppercase tracking-widest">
      Membership Plans
    </span>

    <h2 className="text-5xl font-bold mt-4">
      Flexible Plans For
      <span className="text-green-600"> Every Lifestyle</span>
    </h2>

    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
      Choose a subscription that matches your health goals, schedule,
      and daily nutrition needs.
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-8">
    {/* cards same */}
  </div>

</section>

      </div>

    </div>
  );
}

export default Home;