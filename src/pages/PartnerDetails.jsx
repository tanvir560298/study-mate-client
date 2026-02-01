import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";


const PartnerDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fallbackImg =
  "https://i.ibb.co/2kRZ7q/default-user.png"; 

  // ✅ Load Partner Details
  useEffect(() => {
    const loadPartner = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/partners/${id}`);
        setPartner(res.data);
      } catch (err) {
        console.log("Partner details error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPartner();
  }, [id]);

  // ✅ Send Request Button
  const handleSendRequest = async () => {
  if (!user?.email) {
    toast.error("Please login first!");
    return;
  }

  if (!partner?._id) {
    toast.error("Partner not loaded yet!");
    return;
  }

  try {
    const payload = {
      partnerId: partner._id,
      requesterEmail: user.email,
      // optional but helpful:
      partnerName: partner.name,
      partnerSubject: partner.subject,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/connections", payload);

    console.log("✅ Send request response:", res.data);
    toast.success("✅ Partner Request Sent!");
  } catch (err) {
    // 🔥 This console log will show you EXACT reason when it fails
    console.log("❌ Send request error:", err?.response?.data || err.message);

    if (err.response?.status === 409) {
      toast.warning("⚠️ Already requested!");
    } else {
      toast.error("❌ Something went wrong!");
    }
  }
};


  // ✅ Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!partner) {
    return <p className="text-center mt-10">Partner not found!</p>;
  }

  return (
  <div className="max-w-4xl mx-auto p-4 md:p-8">
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Image */}
      <div className="w-full">
        <img
  src={partner?.profileimage}
  alt={partner?.name}
  onError={(e) => {
    e.currentTarget.src =
      "https://i.ibb.co/2kRZ7q/default-user.png";
  }}
  className="w-full h-64 md:h-80 object-cover"
/>
      </div>

      {/* Content */}
      <div className="p-5 md:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{partner?.name}</h2>
            <p className="text-gray-600 mt-1">
              {partner?.location ? `📍 ${partner.location}` : "📍 Location not provided"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
              📚 {partner?.subject || "N/A"}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
              🎓 {partner?.experienceLevel || "N/A"}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
              💻 {partner?.studyMode || "N/A"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold">⏰ Availability</p>
            <p className="text-gray-700 mt-1">
              {partner?.availabilityTime || "Not provided"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold">⭐ Rating</p>
            <p className="text-gray-700 mt-1">
              {partner?.rating ? `${partner.rating}/5` : "Not rated yet"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold">🤝 Partner Requests</p>
            <p className="text-gray-700 mt-1">
              {partner?.partnerCount ?? 0}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold">🆔 Profile ID</p>
            <p className="text-gray-700 mt-1 break-all">
              {partner?._id}
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSendRequest}
          disabled={!user?.email || !partner?._id}
          className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
            !user?.email || !partner?._id
              ? "bg-gray-300 cursor-not-allowed text-white"
              : "bg-black text-white hover:opacity-90"
          }`}
        >
          Send Partner Request
        </button>

        {!user?.email && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            Please login to send a request.
          </p>
        )}
      </div>
    </div>
  </div>
);

};

export default PartnerDetails;
