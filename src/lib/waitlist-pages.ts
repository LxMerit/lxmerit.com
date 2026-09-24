/**
 * One landing template at /lp/[slug]. A later ad is another entry here,
 * not a new route. The list is sized for three to five ads. Approved
 * entries are first-ad, zebra-drill, and dog-drill. An empty slot is not a page.
 * /waitlist is the generic page and is not an ad.
 */
import {
	DOG_DRILL_SRC_KEY,
	FIRST_AD_SRC_KEY,
	WAITLIST_PAGE_SRC_KEY,
	ZEBRA_DRILL_SRC_KEY
} from './waitlist-source.ts';

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
	/** Second line. Only set when the approved card calls for italic. */
	headlineItalic?: boolean;
	/** Omitted when the approved card has no third line. */
	family?: string;
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

export const DOG_DRILL: AdEntry = {
	id: 'dog-drill',
	indexed: false,
	kicker: 'Drill to find the gap.',
	headline: 'Practice until mastered.',
	headlineItalic: true,
	family: 'Classical learning for the whole family.',
	still: {
		src: '/ad3-dog-drill-still.png',
		alt: 'The dog woodcut with the letters B, P, G, and D.',
		width: 1080,
		height: 1920
	},
	learnMore: true,
	storageKey: DOG_DRILL_SRC_KEY
};

export const ZEBRA_DRILL: AdEntry = {
	id: 'zebra-drill',
	indexed: false,
	kicker: 'Drill to confirm.',
	headline: 'Practice until mastered.',
	headlineItalic: true,
	family: 'Classical learning for the whole family.',
	still: {
		src: '/ad2-zebra-drill-still.png',
		alt: 'The zebra woodcut with the letters N, X, Z, and S.',
		width: 1080,
		height: 1920
	},
	learnMore: true,
	storageKey: ZEBRA_DRILL_SRC_KEY
};

/** Approved ads only. Do not push a blank entry. */
export const ADS: readonly AdEntry[] = [FIRST_AD, ZEBRA_DRILL, DOG_DRILL];

export function adBySlug(slug: string): AdEntry | undefined {
	return ADS.find((ad) => ad.id === slug);
}

export const GENERIC_WAITLIST = {
	indexed: true,
	invitationLine: "We'll email you when an invitation is ready.",
	storageKey: WAITLIST_PAGE_SRC_KEY
} as const;
