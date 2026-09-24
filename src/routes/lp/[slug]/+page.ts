import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { adBySlug } from '$lib/waitlist-pages';

export const load: PageLoad = ({ params }) => {
	const ad = adBySlug(params.slug);
	if (!ad) error(404, 'Not found');
	return { ad };
};
