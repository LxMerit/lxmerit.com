/**
 * Runtime environment configuration for LxMerit.com
 *
 * Detects environment from hostname at runtime, providing correct
 * cross-site URLs. UAT links to UAT, prod links to prod.
 */

import { browser } from '$app/environment';

type Environment = 'production' | 'uat' | 'local';

/**
 * Detect current environment from hostname
 */
export function getEnvironment(): Environment {
  if (!browser) return 'local';

  const hostname = window.location.hostname;

  if (hostname.includes('uat') || hostname.includes('-uat')) {
    return 'uat';
  }

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'local';
  }

  return 'production';
}

/**
 * Cross-site URLs based on current environment
 */
export function getSiteUrls() {
  const env = getEnvironment();

  switch (env) {
    case 'uat':
      return {
        lxmerit: 'https://www-uat.lxmerit.com',
        lxledger: 'https://www-uat.lxledger.com',
        learn2: 'https://learn2-uat.lxmerit.com',
      };
    case 'local':
      return {
        lxmerit: 'http://localhost:3000/lxmerit',
        lxledger: 'http://localhost:3000/lxledger',
        learn2: 'http://localhost:5173',
      };
    default: // production
      return {
        lxmerit: 'https://www.lxmerit.com',
        lxledger: 'https://www.lxledger.com',
        learn2: 'https://learn2.lxmerit.com',
      };
  }
}

// Cached at module load
export const SITE_URLS = getSiteUrls();
export const ENV = getEnvironment();
