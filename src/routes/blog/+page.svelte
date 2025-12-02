<script lang="ts">
	import { base } from '$app/paths';
	import VelocityCounter from '$lib/components/VelocityCounter.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Dev Diary | LxMerit</title>
	<meta name="description" content="Follow our development journey building merit-based learning infrastructure." />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-12">
	<h1 class="text-4xl font-semibold mb-8" style="font-family: 'Cinzel', serif; color: #1a2f2f;">Dev Diary</h1>

	<VelocityCounter totals={data.velocity} />

	<div class="space-y-8">
		{#each data.posts as post}
			<article class="border-b border-slate-200 pb-8">
				<time class="text-sm text-slate-500">{post.date}</time>
				<h2 class="text-2xl font-semibold mt-1 mb-2" style="font-family: 'Cinzel', serif;">
					<a href={`${base}/blog/${post.slug}`} class="hover:text-primary-600 transition-colors" style="color: #1a2f2f;">
						{post.title}
					</a>
				</h2>
				<p class="text-slate-600">{post.description}</p>
				<a href={`${base}/blog/${post.slug}`} class="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block">
					Read more &rarr;
				</a>
			</article>
		{/each}
	</div>
</div>
