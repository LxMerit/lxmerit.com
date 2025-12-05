import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

interface PostVelocity {
	allTime: number;
	core: number;
	docs: number;
	ccli: number;
	since: string;
	trackingBegan: string;
	daysTracked: number;
}

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/posts/${params.slug}.md`);

		// Use this post's velocity only (not cumulative)
		const postVelocity = post.metadata?.velocity || { core: 0, docs: 0, ccli: 0 };
		const postDate = post.metadata?.date || '';

		const velocity: PostVelocity = {
			allTime: (postVelocity.core || 0) + (postVelocity.docs || 0) + (postVelocity.ccli || 0),
			core: postVelocity.core || 0,
			docs: postVelocity.docs || 0,
			ccli: postVelocity.ccli || 0,
			since: postDate,
			trackingBegan: postDate,
			daysTracked: 1
		};

		return {
			content: post.default,
			metadata: post.metadata,
			velocity
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
