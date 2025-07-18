const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">MERN Deployment</h3>
            <p className="text-gray-300">
              A comprehensive MERN stack application with production-ready deployment
              configuration for CI/CD and monitoring.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://www.mongodb.com/atlas"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  MongoDB Atlas
                </a>
              </li>
              <li>
                <a
                  href="https://render.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Render
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Vercel
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Deployment Status</h3>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <p className="text-gray-300">Frontend: Online</p>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <p className="text-gray-300">Backend API: Online</p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <p className="text-gray-300">Database: Connected</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} MERN Stack Deployment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;