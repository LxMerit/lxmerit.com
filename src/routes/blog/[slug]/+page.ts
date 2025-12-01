import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/posts/${params.slug}.md`);
		return {
			content: post.default,
			metadata: post.metadata
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
