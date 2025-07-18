const promClient = require('prom-client');

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Create custom metrics
const metrics = {
  // Counter for http requests
  httpRequestCounter: new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register]
  }),

  // Histogram to measure request duration
  httpRequestDurationMicroseconds: new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
    registers: [register]
  }),

  // Gauge for active users
  activeUsers: new promClient.Gauge({
    name: 'active_users',
    help: 'Number of active users',
    registers: [register]
  }),

  // Histogram to measure database operation duration
  databaseOperationDuration: new promClient.Histogram({
    name: 'db_operation_duration_seconds',
    help: 'Duration of database operations in seconds',
    labelNames: ['operation', 'collection'],
    buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
    registers: [register]
  })
};

// Initialize default values
metrics.activeUsers.set(0);

// Middleware for tracking request metrics
const requestMetricsMiddleware = (req, res, next) => {
  const start = Date.now();
  const { method, path } = req;
  
  // Record the path without params to group similar requests
  const route = req.route ? req.route.path : path.replace(/\/[^/]+$/, '/:id');
  
  // When response finishes
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000; // Convert to seconds
    const statusCode = res.statusCode;
    
    // Increment the request counter
    metrics.httpRequestCounter.inc({ method, route, status_code: statusCode }, 1);
    
    // Record the request duration
    metrics.httpRequestDurationMicroseconds.observe(
      { method, route, status_code: statusCode }, 
      duration
    );
  });
  
  next();
};

// Export metrics endpoint handler
const metricsEndpoint = async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
};

// Database operation tracking function
const trackDatabaseOperation = (operation, collection, durationMs) => {
  metrics.databaseOperationDuration.observe(
    { operation, collection },
    durationMs / 1000 // Convert to seconds
  );
};

// Update active users count
const updateActiveUsers = (count) => {
  metrics.activeUsers.set(count);
};

module.exports = {
  register,
  metrics,
  requestMetricsMiddleware,
  metricsEndpoint,
  trackDatabaseOperation,
  updateActiveUsers
};