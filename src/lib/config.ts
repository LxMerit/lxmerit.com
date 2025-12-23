/**
 * Runtime environment configuration for LxMerit.com
 *
 * Detects environment from hostname at runtime, providing correct
 * cross-site URLs. UAT links to UAT, prod links to prod.
 *
 * With adapter-cloudflare, this works during SSR at the edge.
 */

export type SiteUrls = {
  lxmerit: string;
  lxledger: string;
  learn2: string;
};

/**
 * Get cross-site URLs based on hostname.
 * @param hostname - The hostname to detect environment from
 */
export function getSiteUrls(hostname?: string): SiteUrls {
  // Use provided hostname, or try window.location, or default to prod
  const host = hostname ?? (typeof window !== 'undefined' ? window.location.hostname : 'www.lxmerit.com');

  // UAT detection
  if (host.includes('uat') || host.includes('-uat')) {
    return {
      lxmerit: 'https://www-uat.lxmerit.com',
      lxledger: 'https://www-uat.lxledger.com',
      learn2: 'https://learn2-uat.lxmerit.com',
    };
  }

  // Local development
  if (host === 'localhost' || host === '127.0.0.1') {
    return {
      lxmerit: 'http://localhost:3000/lxmerit',
      lxledger: 'http://localhost:3000/lxledger',
      learn2: 'http://localhost:5173',
    };
  }

  // Production
  return {
    lxmerit: 'https://www.lxmerit.com',
    lxledger: 'https://www.lxledger.com',
    learn2: 'https://learn2.lxmerit.com',
  };
}
