import { useState, useContext } from "react";
import axiosSecure from "../api/axiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.displayName || "",
    profileimage: "https://i.ibb.co/profile-example.jpg",
    subject: "",
    studyMode: "Online",
    availabilityTime: "",
    location: "",
    experienceLevel: "Beginner",
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert("Please login first");
      return;
    }

    const payload = {
      ...form,
      email: user.email,
      rating: Number(form.rating),
    };

    try {
      const res = await axiosSecure.post("/partners", payload);
      if (res?.data?.insertedId) {
        alert("✅ Partner profile created!");
        navigate("/app/find-partners");
      } else {
        alert("✅ Saved (no insertedId returned)");
        navigate("/app/find-partners");
      }
    } catch (err) {
  console.log("Create profile error:", err);
  console.log("Response:", err.response?.data);
  alert("Failed to create profile");
}

  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create Partner Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4 border p-5 rounded-xl">
        <div>
          <label className="font-semibold">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Profile Image URL</label>
          <input
            name="profileimage"
            value={form.profileimage}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Image URL"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. Mathematics"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Study Mode</label>
          <select
            name="studyMode"
            value={form.studyMode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Availability Time</label>
          <input
            name="availabilityTime"
            value={form.availabilityTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. Evening 6-9 PM"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. Dhaka"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Experience Level</label>
          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button className="w-full border rounded py-2 font-semibold">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
