import type { PageLoad } from './$types';

interface PostMeta {
	title: string;
	date: string;
	description: string;
	slug: string;
	velocity?: {
		core: number;
		docs: number;
		ccli: number;
	};
}

interface VelocityTotals {
	core: number;
	docs: number;
	ccli: number;
	total: number;
	since: string;
}

export const load: PageLoad = async () => {
	const postFiles = import.meta.glob('/src/content/posts/*.md', { eager: true });

	const posts: PostMeta[] = Object.entries(postFiles).map(([path, module]: [string, any]) => {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		return {
			title: module.metadata?.title || 'Untitled',
			date: module.metadata?.date || '',
			description: module.metadata?.description || '',
			slug,
			velocity: module.metadata?.velocity || undefined
		};
	});

	// Sort by date descending
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	// Compute cumulative velocity from all posts
	const velocity: VelocityTotals = posts.reduce(
		(acc, post) => {
			if (post.velocity) {
				acc.core += post.velocity.core || 0;
				acc.docs += post.velocity.docs || 0;
				acc.ccli += post.velocity.ccli || 0;
			}
			return acc;
		},
		{ core: 0, docs: 0, ccli: 0, total: 0, since: '2025-11-12' }
	);

	velocity.total = velocity.core + velocity.docs + velocity.ccli;

	return { posts, velocity };
};
