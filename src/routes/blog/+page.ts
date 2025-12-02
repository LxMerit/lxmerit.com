import type { PageLoad } from './$types';

interface PostMeta {
	title: string;
	date: string;
	description: string;
	slug: string;
}

interface VelocityTotals {
	allTime: number;
	core: number;
	docs: number;
	ccli: number;
	since: string;
	trackingBegan: string;
	daysTracked: number;
}

// Parse the velocity history TSV
// For now, hardcoded until we have multiple days of snapshots
// Then we can read from .velocity-history.tsv at build time
function getLatestVelocity(): VelocityTotals {
	// Current repo state as of 2025-12-02 (audited, honest)
	return {
		allTime: 185232,
		core: 78655,
		docs: 83749,
		ccli: 22828,
		since: '2025-11-12',
		trackingBegan: '2025-12-02',
		daysTracked: 1
	};
}

export const load: PageLoad = async () => {
	const postFiles = import.meta.glob('/src/content/posts/*.md', { eager: true });

	const posts: PostMeta[] = Object.entries(postFiles).map(([path, module]: [string, any]) => {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		return {
			title: module.metadata?.title || 'Untitled',
			date: module.metadata?.date || '',
			description: module.metadata?.description || '',
			slug
		};
	});

	// Sort by date descending
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const velocity = getLatestVelocity();

	return { posts, velocity };
};
