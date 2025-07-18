const promClient = require('prom-client');
const express = require('express');

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add a default label to all metrics
promClient.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // buckets for response time from 0.1s to 10s
});

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const databaseOperationDuration = new promClient.Histogram({
  name: 'db_operation_duration_seconds',
  help: 'Duration of database operations in seconds',
  labelNames: ['operation', 'collection'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const activeUsers = new promClient.Gauge({
  name: 'active_users',
  help: 'Number of active users'
});

// Register the custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestCounter);
register.registerMetric(databaseOperationDuration);
register.registerMetric(activeUsers);

// Middleware to track request duration
const requestDurationMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // Record end time and response status on response finish
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000; // Convert to seconds
    
    // Extract route path - simplify for metrics to avoid unique routes
    let route = req.route ? req.route.path : req.path;
    
    // For parameterized routes, replace params with placeholders
    if (req.params) {
      Object.keys(req.params).forEach(param => {
        route = route.replace(req.params[param], `:${param}`);
      });
    }
    
    // Record metrics
    httpRequestDurationMicroseconds.observe(
      { method: req.method, route, status_code: res.statusCode },
      duration
    );
    
    httpRequestCounter.inc({
      method: req.method,
      route,
      status_code: res.statusCode
    });
  });
  
  next();
};

// Setup metrics endpoint
const setupMetrics = (app) => {
  // Use the monitoring middleware
  app.use(requestDurationMiddleware);
  
  // Expose metrics endpoint
  app.get('/api/metrics', async (req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (err) {
      res.status(500).end(err);
    }
  });
  
  return {
    httpRequestDurationMicroseconds,
    httpRequestCounter,
    databaseOperationDuration,
    activeUsers,
    requestDurationMiddleware
  };
};

module.exports = {
  setupMetrics,
  metrics: {
    httpRequestDurationMicroseconds,
    httpRequestCounter,
    databaseOperationDuration,
    activeUsers
  }
};