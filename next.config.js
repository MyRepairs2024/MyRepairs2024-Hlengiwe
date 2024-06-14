const path = require('path');

module.exports = {
  async rewrites() {
    return [
       {
        source: '/user-dashboard/:path*',
        destination: '/components/Dashboards/user-dashboard',
      },
     
      {
        source: '/service-providerDashboard/:path*',
        destination: '/components/Dashboards/service-providerDashboard',
      },
    ];
  },
};

