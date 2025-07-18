const express = require('express');
const router = express.Router();
const os = require('os');
const mongoose = require('mongoose');
const { metrics } = require('../monitoring');

// @desc    Get API health and system info
// @route   GET /api/health
// @access  Public
router.get('/', async (req, res) => {
  const serverUptime = process.uptime();
  const systemUptime = os.uptime();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = process.memoryUsage();

  // Get database connection status
  let databaseStatus = 'disconnected';
  let databaseLatency = null;
  if (mongoose.connection.readyState) {
    databaseStatus = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState];
    
    // Measure database latency
    if (mongoose.connection.readyState === 1) {
      const startTime = Date.now();
      try {
        await mongoose.connection.db.admin().ping();
        databaseLatency = Date.now() - startTime;
      } catch (error) {
        databaseLatency = 'error';
      }
    }
  }

  // Get active users metric
  let activeUsersValue = 0;
  try {
    activeUsersValue = metrics.activeUsers.get().values[0].value;
  } catch (err) {
    console.log('Failed to get active users metric:', err.message);
  }

  // Get request metrics
  let requestMetrics = {};
  try {
    const httpRequests = await metrics.httpRequestCounter.get();
    const httpDurations = await metrics.httpRequestDurationMicroseconds.get();
    
    requestMetrics = {
      totalRequests: httpRequests.values.reduce((sum, metric) => sum + metric.value, 0),
      avgResponseTime: calculateAverageResponseTime(httpDurations),
      requestsByEndpoint: formatRequestMetrics(httpRequests)
    };
  } catch (err) {
    requestMetrics = { error: 'Failed to get request metrics' };
  }

  // Response with health metrics
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    server: {
      uptime: serverUptime,
      uptimeFormatted: formatTime(serverUptime),
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    },
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      release: os.release(),
      type: os.type(),
      uptime: systemUptime,
      uptimeFormatted: formatTime(systemUptime),
      loadavg: os.loadavg(),
      cpus: os.cpus().length
    },
    memory: {
      total: formatBytes(totalMemory),
      free: formatBytes(freeMemory),
      used: formatBytes(usedMemory),
      usagePercentage: ((usedMemory / totalMemory) * 100).toFixed(2) + '%',
      process: {
        rss: formatBytes(memoryUsage.rss),
        heapTotal: formatBytes(memoryUsage.heapTotal),
        heapUsed: formatBytes(memoryUsage.heapUsed),
        external: formatBytes(memoryUsage.external)
      }
    },
    database: {
      status: databaseStatus,
      latency: databaseLatency !== null ? `${databaseLatency}ms` : 'unknown'
    },
    metrics: {
      activeUsers: activeUsersValue,
      requests: requestMetrics
    }
  });
});

// Helper function to format time in days, hours, minutes and seconds
function formatTime(seconds) {
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = router;