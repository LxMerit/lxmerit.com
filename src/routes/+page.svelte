<script lang="ts">
	import { onMount } from 'svelte';
	let visible = $state(false);
	onMount(() => { visible = true; });
</script>

<svelte:head>
	<title>LxMerit - Merit-Based Learning Platform</title>
	<meta name="description" content="Building the future of merit-based education. L(earn)² = Merit." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<div
	class="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center transition-opacity duration-1000"
	class:opacity-0={!visible}
	class:opacity-100={visible}
	style="background: linear-gradient(135deg, #1a2f2f 0%, #2d4545 100%);"
>
	<div class="max-w-2xl">
		<!-- Logo/Company Name -->
		<h1
			class="text-5xl md:text-7xl font-semibold tracking-wide mb-4"
			style="font-family: 'Cinzel', serif; color: #b5c4c4;"
		>
			LxMerit
		</h1>

		<!-- Divider -->
		<div class="w-16 h-0.5 mx-auto my-6" style="background: linear-gradient(90deg, transparent, #5f7676, transparent);"></div>

		<!-- Tagline -->
		<p
			class="text-3xl md:text-4xl font-light tracking-wider mb-2"
			style="font-family: 'Cinzel', serif; color: #d4dada;"
		>
			L(earn)<sup class="text-lg">2</sup>
		</p>

		<!-- Subtitle -->
		<p class="text-lg md:text-xl tracking-widest uppercase mb-8" style="color: #8fa8a8;">
			Merit-Based Learning Platform
		</p>

		<!-- Mission -->
		<p class="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto" style="color: #d4dada;">
			Building infrastructure for merit-based education. AI-powered tutoring meets
			classical curriculum. Students own their achievement data.
		</p>

		<!-- CTA Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
			<a
				href="/blog"
				class="px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
				style="background: linear-gradient(135deg, #4a7070 0%, #3d5f5f 100%); color: #d4dada; box-shadow: 0 4px 15px rgba(0,0,0,0.2);"
			>
				Dev Diary
			</a>
			<a
				href="https://github.com/LxMerit"
				target="_blank"
				rel="noopener"
				class="px-8 py-3 rounded-lg font-medium border transition-all duration-200 hover:-translate-y-0.5"
				style="border-color: #4a7070; color: #8fa8a8;"
			>
				GitHub
			</a>
		</div>

		<!-- Launch Status -->
		<p class="text-sm tracking-wide mb-6" style="color: #5f7676;">
			Launching 2025
		</p>

		<!-- Contact -->
		<a
			href="mailto:patrick@lxmerit.com"
			class="text-sm tracking-wide transition-colors duration-200"
			style="color: #5f7676;"
			onmouseenter={(e) => e.currentTarget.style.color = '#8fa8a8'}
			onmouseleave={(e) => e.currentTarget.style.color = '#5f7676'}
		>
			patrick@lxmerit.com
		</a>
	</div>
</div>
