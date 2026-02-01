const Testimonials = () => {
  const reviews = [
    {
      name: "Arafat Hossain",
      comment:
        "StudyMate helped me find a partner for React practice. Super useful!",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Nusrat Jahan",
      comment:
        "The connection feature is amazing. Now I study consistently.",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Tanvir Ahmad",
      comment:
        "Beautiful UI and very smooth experience. Loved it!",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <section className="mt-14 mb-10">
      <h2 className="text-3xl font-bold text-center">
        What Students Say
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Feedback from our StudyMate community
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            <p className="text-gray-700 italic">"{r.comment}"</p>

            <div className="mt-4 flex justify-between items-center">
              <h4 className="font-semibold">{r.name}</h4>
              <span>{r.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
