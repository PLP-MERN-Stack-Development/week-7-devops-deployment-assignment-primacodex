const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About This Project</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
          <p className="mb-4">
            This is a MERN (MongoDB, Express.js, React, Node.js) stack application that has been fully optimized and configured for production deployment. The project demonstrates best practices for deploying full-stack JavaScript applications with continuous integration and deployment pipelines.
          </p>
          <p>
            The deployment process includes optimization for both frontend and backend components, proper environment configuration, database setup, CI/CD pipeline configuration, and comprehensive monitoring systems.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Deployment Architecture</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Frontend Deployment</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Static files hosted on Vercel/Netlify</li>
              <li>Optimized bundle with code splitting</li>
              <li>Asset compression and caching</li>
              <li>Continuous deployment from GitHub</li>
              <li>Custom domain with HTTPS</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Backend Deployment</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Express.js API deployed on Render/Railway</li>
              <li>Environment variables configuration</li>
              <li>Secure HTTP headers</li>
              <li>Error handling and logging</li>
              <li>Continuous deployment from GitHub</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Database Setup</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>MongoDB Atlas cloud database</li>
              <li>Connection pooling for optimized performance</li>
              <li>Proper user authentication and permissions</li>
              <li>Regular automated backups</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">CI/CD Pipeline</h2>
          <p className="mb-4">
            The application uses GitHub Actions for continuous integration and deployment, with the following workflow:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Code changes are pushed to GitHub repository</li>
            <li>GitHub Actions runs automated tests</li>
            <li>Code quality and linting checks are performed</li>
            <li>Application is built for production</li>
            <li>If successful and on main branch, deployment occurs to staging environment</li>
            <li>After manual approval, deployment to production environment</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Monitoring and Maintenance</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Application Monitoring</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Health check endpoints</li>
              <li>Uptime monitoring with alerts</li>
              <li>Error tracking with Sentry</li>
              <li>Performance monitoring</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Maintenance Procedures</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Regular dependency updates</li>
              <li>Security patches</li>
              <li>Database backups</li>
              <li>Documented rollback procedures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;