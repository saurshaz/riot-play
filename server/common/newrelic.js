/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration letiables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['Appler'],
  /**
   * Your New Relic license key.
   */
  license_key: '9e7564dbe698a75fe5d813e2b5a96badef6a4bf3',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  },
  browser_monitoring: {enabled: true}
}
