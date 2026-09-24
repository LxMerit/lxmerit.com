/**
 * One landing template at /lp/[slug]. A later ad is another entry here,
 * not a new route. The list is sized for three to five ads. Only ad #1
 * is approved. An empty slot is not an entry and is not a page.
 * /waitlist is the generic page and is not an ad.
 */
import { FIRST_AD_SRC_KEY, WAITLIST_PAGE_SRC_KEY } from './waitlist-source.ts';

export const AD_CAPACITY = 5;

export interface AdStill {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export interface AdEntry {
	id: string;
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

/** Approved ads only. Do not push a blank entry. */
export const ADS: readonly AdEntry[] = [FIRST_AD];

export function adBySlug(slug: string): AdEntry | undefined {
	return ADS.find((ad) => ad.id === slug);
}

export const GENERIC_WAITLIST = {
	indexed: true,
	invitationLine: "We'll email you when an invitation is ready.",
	storageKey: WAITLIST_PAGE_SRC_KEY
} as const;
