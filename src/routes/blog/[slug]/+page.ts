import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

interface VelocityTotals {
	core: number;
	docs: number;
	ccli: number;
	total: number;
	since: string;
}

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/posts/${params.slug}.md`);

		// Load all posts to compute cumulative velocity
		const postFiles = import.meta.glob('/src/content/posts/*.md', { eager: true });

		const velocity: VelocityTotals = Object.values(postFiles).reduce(
			(acc: VelocityTotals, module: any) => {
				if (module.metadata?.velocity) {
					acc.core += module.metadata.velocity.core || 0;
					acc.docs += module.metadata.velocity.docs || 0;
					acc.ccli += module.metadata.velocity.ccli || 0;
				}
				return acc;
			},
			{ core: 0, docs: 0, ccli: 0, total: 0, since: '2025-11-30' }
		);

		velocity.total = velocity.core + velocity.docs + velocity.ccli;

		return {
			content: post.default,
			metadata: post.metadata,
			velocity
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
