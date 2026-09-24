/**
 * Campaign attribution for the corporate homepage waitlist.
 *
 * A query value must match the app rule: lowercase, digits, hyphens, 1–50.
 * `corp_home` is the constant for a missing or rejected query. It may
 * contain an underscore. A query value may not, so a bad query cannot
 * become the stored source by passing the allowlist.
 */

export const CORP_HOME_SOURCE = 'corp_home';
export const CAMPAIGN_SRC_KEY = 'lxm_corp_waitlist_src';

const SRC_PATTERN = /^[a-z0-9-]{1,50}$/;

/** The query value to keep, or null when it must not be stored. */
export function acceptCampaignSrc(src: string | null | undefined): string | null {
	if (typeof src === 'string' && SRC_PATTERN.test(src)) return src;
	return null;
}

/**
 * URL wins when it is valid. Otherwise a previously accepted value.
 * Otherwise `corp_home`. A rejected query does not replace a kept value.
 */
export function resolveCampaignSource(
	urlSrc: string | null | undefined,
	stored: string | null | undefined
): string {
	return acceptCampaignSrc(urlSrc) ?? acceptCampaignSrc(stored) ?? CORP_HOME_SOURCE;
}

export function signupBody(email: string, token: string, source: string): string {
	return JSON.stringify({
		email: email.trim().toLowerCase(),
		turnstile_token: token,
		source
	});
}
