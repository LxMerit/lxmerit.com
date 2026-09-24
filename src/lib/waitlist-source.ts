/**
 * Campaign attribution for the corporate homepage waitlist.
 *
 * A query value must match the app rule: lowercase, digits, hyphens, 1–50.
 * `corp_home` is the constant for a missing or rejected query. It may
 * contain an underscore. A query value may not, so a bad query cannot
 * become the stored source by passing the allowlist.
 */

export const CORP_HOME_SOURCE = 'corp_home';
export const CORP_WAITLIST_SOURCE = 'corp_waitlist';
export const CAMPAIGN_SRC_KEY = 'lxm_corp_waitlist_src';
export const WAITLIST_PAGE_SRC_KEY = 'lxm_corp_waitlist_page_src';
export const FIRST_AD_SRC_KEY = 'lxm_corp_first_ad_src';

const SRC_PATTERN = /^[a-z0-9-]{1,50}$/;

/** The query value to keep, or null when it must not be stored. */
export function acceptCampaignSrc(src: string | null | undefined): string | null {
	if (typeof src === 'string' && SRC_PATTERN.test(src)) return src;
	return null;
}

/**
 * URL wins when it is valid. Otherwise a previously accepted value.
 * Otherwise `fallback` (`corp_home` on the homepage, `corp_waitlist` on /waitlist).
 * A rejected query does not replace a kept value.
 */
export function resolveCampaignSource(
	urlSrc: string | null | undefined,
	stored: string | null | undefined,
	fallback: string = CORP_HOME_SOURCE
): string {
	return acceptCampaignSrc(urlSrc) ?? acceptCampaignSrc(stored) ?? fallback;
}

export function signupBody(email: string, token: string, source: string): string {
	return JSON.stringify({
		email: email.trim().toLowerCase(),
		turnstile_token: token,
		source
	});
}
