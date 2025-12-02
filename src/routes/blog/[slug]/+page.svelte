<script lang="ts">
	import { base } from '$app/paths';
	import VelocityCounter from '$lib/components/VelocityCounter.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.metadata.title} | LxMerit Dev Diary</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<article class="max-w-4xl mx-auto px-4 py-12">
	<header class="mb-8">
		<a href={`${base}/blog`} class="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block">
			&larr; Back to Dev Diary
		</a>
		<time class="block text-sm text-slate-500 mb-2">{data.metadata.date}</time>
		<h1 class="text-4xl font-bold mb-4" style="font-family: 'Cinzel', serif; color: #1a2f2f;">{data.metadata.title}</h1>
		{#if data.metadata.author}
			<p class="text-slate-600">By {data.metadata.author}</p>
		{/if}
	</header>

	<VelocityCounter totals={data.velocity} />

	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>
