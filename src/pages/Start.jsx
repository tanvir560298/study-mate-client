import { Link } from "react-router-dom";
import heroImg from "../assets/start_img/Study session in the sunlit room.png";

export default function Start() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT: Image */}
        <div className="relative">
          <img
            src={heroImg}
            alt="Students studying together"
            className="h-[45vh] w-full object-cover md:h-screen"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* RIGHT: Content */}
        <div className="flex items-center justify-center px-5 py-12 md:px-14">
          <div className="w-full max-w-xl text-center md:text-left">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Find Your Perfect{" "}
              <span className="text-indigo-600">Study Partner</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Connect with students, build study groups, share resources,
              and grow together with better study habits.
            </p>

            <div className="mt-10 flex justify-center md:justify-start">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white text-lg font-bold hover:bg-indigo-700 transition text-center"
              >
                Get Started
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
