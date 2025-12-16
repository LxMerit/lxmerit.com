import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			// Proxy API requests to Fly.io backend (bypasses CORS for local dev)
			'/api': {
				target: 'https://lxmerit-api.fly.dev',
				changeOrigin: true,
				secure: true,
			}
		}
	}
});
