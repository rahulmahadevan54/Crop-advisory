
import { Leaf, MapPin, CloudSun, Sprout, BarChart, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="min-h-screen w-[99vw] bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-green-600 text-white py-6 shadow-lg w-full">
        <nav className="mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-2">
            <Leaf className="text-white" size={28} />
            <span className="text-xl font-bold">CropAdvisory</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-950 hover:text-green-300 transition-colors">Home</a>
            <a href="#" className="text-gray-950 hover:text-green-300 transition-colors">About</a>
            <a href="#" className="text-gray-950 hover:text-green-300 transition-colors">Services</a>
            <a href="#" className="text-gray-950 hover:text-green-300 transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      <main className="w-full">

        <section className="w-full py-20">
          <div className="w-full px-4">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl p-8 shadow-2xl">
              <h1 className="text-5xl font-bold text-green-800 mb-6">
                Transform Your Farming with
                <span className="block mt-2 text-green-600">Smart Agriculture</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                AI-powered crop recommendations tailored to your farm`s unique conditions
              </p>
              <Link to="/app" className="inline-block bg-green-600 text-white py-4 px-8 rounded-xl text-lg
                hover:bg-green-700 transition-all transform hover:scale-105 shadow-md">
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full mb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: MapPin, title: "Location Analysis", desc: "Precision mapping of your farmland" },
                { icon: Sprout, title: "Crop Suggestions", desc: "Optimal crops for your soil type" },
                { icon: CloudSun, title: "Weather Insights", desc: "Hyper-local weather predictions" },
                { icon: BarChart, title: "Yield Forecast", desc: "Data-driven harvest estimates" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow
                  border border-green-50 hover:border-green-100">
                  <feature.icon className="text-green-600 mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full bg-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="rounded-2xl p-12 shadow-inner">
              <div className="text-center">
                <Sun className="mx-auto text-green-600 mb-6" size={40} />
                <h2 className="text-4xl font-bold text-green-800 mb-6">Why Choose Us?</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Leverage satellite imagery and machine learning to optimize your farming operations.
                  Our system analyzes soil health, weather patterns, and market trends to deliver
                  actionable insights straight to your device.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {[
                    "Real-time monitoring",
                    "Disease prediction",
                    "Irrigation planning"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-green-100 py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="mt-4">&copy; {new Date().getFullYear()} Crop Advisory System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
