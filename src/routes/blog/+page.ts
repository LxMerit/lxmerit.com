import type { PageLoad } from './$types';

interface PostMeta {
	title: string;
	date: string;
	description: string;
	slug: string;
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

	return { posts };
};
