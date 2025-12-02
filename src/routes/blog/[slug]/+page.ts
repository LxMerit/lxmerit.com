import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

interface VelocityTotals {
	today: number;
	thisWeek: number;
	allTime: number;
	core: number;
	docs: number;
	ccli: number;
	since: string;
}

function getPostTotal(velocity?: { core: number; docs: number; ccli: number }): number {
	if (!velocity) return 0;
	return (velocity.core || 0) + (velocity.docs || 0) + (velocity.ccli || 0);
}

function isToday(dateStr: string): boolean {
	const postDate = new Date(dateStr);
	const today = new Date();
	return (
		postDate.getFullYear() === today.getFullYear() &&
		postDate.getMonth() === today.getMonth() &&
		postDate.getDate() === today.getDate()
	);
}

function isThisWeek(dateStr: string): boolean {
	const postDate = new Date(dateStr);
	const today = new Date();
	const weekAgo = new Date(today);
	weekAgo.setDate(today.getDate() - 7);
	return postDate >= weekAgo && postDate <= today;
}

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/posts/${params.slug}.md`);

		// Load all posts to compute cumulative velocity
		const postFiles = import.meta.glob('/src/content/posts/*.md', { eager: true });

		const velocity: VelocityTotals = {
			today: 0,
			thisWeek: 0,
			allTime: 0,
			core: 0,
			docs: 0,
			ccli: 0,
			since: '2025-11-12'
		};

		for (const module of Object.values(postFiles) as any[]) {
			const postVelocity = module.metadata?.velocity;
			const postDate = module.metadata?.date;
			const postTotal = getPostTotal(postVelocity);

			// All-time totals
			velocity.allTime += postTotal;
			if (postVelocity) {
				velocity.core += postVelocity.core || 0;
				velocity.docs += postVelocity.docs || 0;
				velocity.ccli += postVelocity.ccli || 0;
			}

			// Time-windowed totals
			if (postDate && isToday(postDate)) {
				velocity.today += postTotal;
			}
			if (postDate && isThisWeek(postDate)) {
				velocity.thisWeek += postTotal;
			}
		}

		return {
			content: post.default,
			metadata: post.metadata,
			velocity
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
