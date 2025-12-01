<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="bg-white border-b border-slate-200">
		<nav class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
			<a href="/" class="text-2xl font-bold text-slate-900">
				Lx<span class="text-primary-600">Merit</span>
			</a>
			<div class="flex items-center gap-6">
				<a href="/blog" class="text-slate-600 hover:text-slate-900">Dev Diary</a>
				<a href="/about" class="text-slate-600 hover:text-slate-900">About</a>
				<a
					href="https://github.com/LxMerit"
					target="_blank"
					rel="noopener"
					class="text-slate-600 hover:text-slate-900"
				>
					GitHub
				</a>
			</div>
		</nav>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="bg-slate-900 text-slate-400 py-8">
		<div class="max-w-6xl mx-auto px-4 text-center">
			<p class="text-lg font-semibold text-white mb-2">L(earn)<sup>2</sup> = Merit</p>
			<p class="text-sm">&copy; {new Date().getFullYear()} LxMerit. All rights reserved.</p>
		</div>
	</footer>
</div>
