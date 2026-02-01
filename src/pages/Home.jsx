import { useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const [topPartners, setTopPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImg = "https://i.ibb.co/2kRZ7q/default-user.png";

  useEffect(() => {
    const loadTopPartners = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/partners-top?limit=3");
        setTopPartners(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("Top partners load error:", err);
        setTopPartners([]);
      } finally {
        setLoading(false);
      }
    };

    loadTopPartners();
  }, []);

  return (
    <div className="p-4 md:p-6">
      {/* ✅ Banner / Carousel */}
      <Banner />

      {/* ✅ Top Rated Partners */}
      <div className="mt-10">
        <div className="flex items-end justify-between gap-3 mb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              🔥 Top Rated Partners
            </h2>
            <p className="text-gray-600 mt-1">
              Explore the best study partners based on rating
            </p>
          </div>

          <Link
            to="/app/find-partners"
            className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:opacity-90"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <p className="text-center mt-6">Loading top partners...</p>
        ) : topPartners.length === 0 ? (
          <p className="text-center mt-6">No top partners found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {topPartners.map((p) => (
              <div
                key={p._id}
                className="bg-white border rounded-2xl p-5 shadow-sm flex flex-col h-full"
              >
                <img
                  src={p.profileimage || fallbackImg}
                  alt={p.name}
                  onError={(e) => (e.currentTarget.src = fallbackImg)}
                  className="w-full h-44 object-cover rounded-xl"
                />

                <div className="mt-4 flex-1">
                  <h3 className="text-xl font-semibold">{p.name}</h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                      📚 {p.subject || "N/A"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                      💻 {p.studyMode || "N/A"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                      ⭐ {p.rating ? `${p.rating}/5` : "Not rated"}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/app/partner/${p._id}`}
                  className="mt-5 text-center px-4 py-2 rounded-xl bg-black text-white font-semibold hover:opacity-90"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ How It Works */}
      <div className="mt-14">
        <HowItWorks />
      </div>

      {/* ✅ Testimonials */}
      <div className="mt-14">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
