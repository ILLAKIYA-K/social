const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'social-media-feed',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

