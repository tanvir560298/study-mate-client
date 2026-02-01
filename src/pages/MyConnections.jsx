import { useContext, useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyConnections = () => {
  const { user } = useContext(AuthContext);

  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConnections = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const res = await axiosSecure.get(`/connections?email=${user.email}`);
        setConnections(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("Connections load error:", err);
        setConnections([]);
      } finally {
        setLoading(false);
      }
    };

    loadConnections();
  }, [user?.email]);

  // ✅ Delete connection
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/connections/${id}`);
      setConnections((prev) => prev.filter((item) => item._id !== id));
      toast.success("✅ Request deleted!");
    } catch (err) {
      console.log("Delete error:", err?.response?.data || err.message);
      toast.error("❌ Failed to delete!");
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
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Connections</h2>

      {connections.length === 0 ? (
        <p className="text-center mt-10">No connections found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-xl bg-white">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Partner</th>
                <th>Subject</th>
                <th>Mode</th>
                <th>Your Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {connections.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={c.partnerImage || "https://i.ibb.co/2kRZ7q/default-user.png"}
                        alt={c.partnerName || "Partner"}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => (e.currentTarget.src = "https://i.ibb.co/2kRZ7q/default-user.png")}
                      />
                      <p className="font-semibold">{c.partnerName || "N/A"}</p>
                    </div>
                  </td>

                  <td>{c.subject || "N/A"}</td>
                  <td>{c.studyMode || "N/A"}</td>
                  <td className="text-sm text-gray-600">{c.requesterEmail}</td>

                  <td>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-200">
                      {c.status || "pending"}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyConnections;
