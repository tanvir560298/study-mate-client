const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Profile",
      desc: "Add your subject, availability, and study preferences.",
      icon: "📝",
    },
    {
      title: "Find Study Partners",
      desc: "Search and filter partners based on your needs.",
      icon: "🔍",
    },
    {
      title: "Send Requests & Connect",
      desc: "Request a partner and start learning together instantly.",
      icon: "🤝",
    },
  ];

  return (
    <section className="mt-14">
      <h2 className="text-3xl font-bold text-center">
        How StudyMate Works
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Simple steps to find your perfect study partner
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-2xl p-6 shadow-sm text-center"
          >
            <div className="text-5xl">{s.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{s.title}</h3>
            <p className="text-gray-600 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
