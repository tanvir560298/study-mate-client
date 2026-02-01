import { useEffect, useState, useContext } from "react";
import axiosSecure from "../api/axiosSecure";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "", "asc", "desc"

  const fallbackImg = "https://i.ibb.co/2kRZ7q/default-user.png";

  const loadPartners = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(
        `/partners?search=${encodeURIComponent(searchText)}&sort=${sortOrder}`
      );
      setPartners(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Error fetching partners:", err);
      setPartners([]);
      toast.error("Failed to load partners!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const handleSendRequest = async (partner) => {
    if (!user?.email) {
      toast.error("Please login first");
      return;
    }

    try {
      const payload = {
        partnerId: partner._id,
        requesterEmail: user.email,
        partnerName: partner.name,
        partnerSubject: partner.subject,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/connections", payload);
      console.log("✅ Send request response:", res.data);

      toast.success("✅ Request sent!");
    } catch (err) {
      console.log("❌ Send request error:", err?.response?.data || err.message);

      if (err.response?.status === 409) {
        toast.warn("⚠️ Already requested!");
      } else {
        toast.error("❌ Something went wrong!");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Find Study Partners</h2>
          <p className="text-gray-600 mt-1">
            Search by subject and sort by experience level
          </p>
        </div>

        <Link
          to="/app/create-profile"
          className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:opacity-90 w-fit"
        >
          Create Partner Profile
        </Link>
      </div>

      {/* ✅ Search + Sort UI */}
      <div className="bg-white border rounded-2xl p-4 md:p-5 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by subject (e.g. React, Math, English)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border p-3 rounded-xl w-full"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-3 rounded-xl w-full md:w-64"
          >
            <option value="">Sort by experience (none)</option>
            <option value="asc">Beginner → Expert</option>
            <option value="desc">Expert → Beginner</option>
          </select>

          <button
            onClick={loadPartners}
            className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90 w-full md:w-40"
          >
            Search
          </button>
        </div>

        {!user?.email && (
          <p className="text-sm text-gray-500 mt-3">
            Tip: Login to send partner requests.
          </p>
        )}
      </div>

      {partners.length === 0 ? (
        <p className="text-center mt-10">No partners found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white border rounded-2xl p-5 shadow-sm flex flex-col h-full"
            >
              <img
                src={partner.profileimage || fallbackImg}
                alt={partner.name}
                className="w-full h-48 object-cover rounded-xl"
                onError={(e) => (e.currentTarget.src = fallbackImg)}
              />

              <div className="mt-4 flex-1">
                <h3 className="text-xl font-semibold">{partner.name}</h3>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    📚 {partner.subject || "N/A"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    💻 {partner.studyMode || "N/A"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    🎓 {partner.experienceLevel || "N/A"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    ⭐ {partner.rating ? `${partner.rating}/5` : "Not rated"}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <Link
                  to={`/app/partner/${partner._id}`}
                  className="w-1/2 text-center px-4 py-2 rounded-xl border font-semibold hover:bg-gray-100"
                >
                  View
                </Link>

                <button
                  type="button"
                  onClick={() => handleSendRequest(partner)}
                  disabled={!user?.email}
                  className={`w-1/2 px-4 py-2 rounded-xl font-semibold transition ${
                    !user?.email
                      ? "bg-gray-300 text-white cursor-not-allowed"
                      : "bg-black text-white hover:opacity-90"
                  }`}
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindPartners;
