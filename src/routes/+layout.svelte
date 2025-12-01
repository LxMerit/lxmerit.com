<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();

	// Homepage gets minimal layout (no header/footer)
	let isHomepage = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet" />
</svelte:head>

{#if isHomepage}
	<!-- Minimal layout for homepage -->
	{@render children()}
{:else}
	<!-- Full layout with nav for other pages -->
	<div class="min-h-screen flex flex-col">
		<header class="border-b" style="background: #1a2f2f; border-color: #3d5f5f;">
			<nav class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
				<a href="/" class="text-2xl font-semibold" style="font-family: 'Cinzel', serif; color: #b5c4c4;">
					L<span style="font-size: 0.65em; vertical-align: baseline; position: relative; top: 0.15em;">x</span>Merit
				</a>
				<div class="flex items-center gap-6">
					<a href="/blog" class="transition-colors" style="color: #8fa8a8;" onmouseenter={(e) => e.currentTarget.style.color = '#d4dada'} onmouseleave={(e) => e.currentTarget.style.color = '#8fa8a8'}>Dev Diary</a>
					<a href="/about" class="transition-colors" style="color: #8fa8a8;" onmouseenter={(e) => e.currentTarget.style.color = '#d4dada'} onmouseleave={(e) => e.currentTarget.style.color = '#8fa8a8'}>About</a>
				</div>
			</nav>
		</header>

		<main class="flex-1" style="background: #f8fafa;">
			{@render children()}
		</main>

		<footer class="py-8" style="background: #1a2f2f;">
			<div class="max-w-6xl mx-auto px-4 text-center">
				<p class="text-lg font-semibold mb-2" style="font-family: 'Cinzel', serif; color: #b5c4c4;">L(earn)<sup>2</sup> = Merit</p>
				<p class="text-sm" style="color: #5f7676;">&copy; {new Date().getFullYear()} LxMerit. All rights reserved.</p>
			</div>
		</footer>
	</div>
{/if}
