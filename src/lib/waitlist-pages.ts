/**
 * One landing template. One ad entry until WC picks the next.
 * /waitlist is the generic page and is not an ad.
 */
import { FIRST_AD_SRC_KEY, WAITLIST_PAGE_SRC_KEY } from './waitlist-source.ts';

export interface AdStill {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export interface AdEntry {
	id: 'first-ad';
	path: '/lp/first-ad';
	indexed: false;
	kicker: string;
	headline: string;
	family: string;
	still: AdStill;
	learnMore: true;
	storageKey: string;
}

export const FIRST_AD: AdEntry = {
	id: 'first-ad',
	path: '/lp/first-ad',
	indexed: false,
	kicker: 'Not just learning to read.',
	headline: 'Learn to love reading.',
	family: 'Classical learning for the whole family.',
	still: {
		src: '/ad-v11-p46.png',
		alt: 'The reader open to Lesson LXII, page 46, a pup and a woodcut.',
		width: 1080,
		height: 1920
	},
	learnMore: true,
	storageKey: FIRST_AD_SRC_KEY
};

/** The only ad. Do not append another until WC says so. */
export const ADS: readonly AdEntry[] = [FIRST_AD];

export const GENERIC_WAITLIST = {
	indexed: true,
	invitationLine: "We'll email you when an invitation is ready.",
	storageKey: WAITLIST_PAGE_SRC_KEY
} as const;
