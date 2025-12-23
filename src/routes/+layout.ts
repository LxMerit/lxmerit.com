import { getSiteUrls } from '$lib/config';
import type { LayoutLoad } from './$types';

export const trailingSlash = 'always';

export const load: LayoutLoad = ({ url }) => {
	return {
		siteUrls: getSiteUrls(url.hostname)
	};
};
