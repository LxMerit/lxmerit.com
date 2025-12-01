<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Dev Diary | LxMerit</title>
	<meta name="description" content="Follow our development journey building merit-based learning infrastructure." />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-12">
	<h1 class="text-4xl font-semibold mb-4" style="font-family: 'Cinzel', serif;">Dev Diary</h1>
	<p class="text-slate-600 mb-12">
		Building in public. Shipping fast. Documenting everything.
	</p>

	<div class="space-y-8">
		{#each data.posts as post}
			<article class="border-b border-slate-200 pb-8">
				<time class="text-sm text-slate-500">{post.date}</time>
				<h2 class="text-2xl font-semibold mt-1 mb-2">
					<a href="/blog/{post.slug}" class="hover:text-primary-600 transition-colors">
						{post.title}
					</a>
				</h2>
				<p class="text-slate-600">{post.description}</p>
				<a href="/blog/{post.slug}" class="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block">
					Read more &rarr;
				</a>
			</article>
		{/each}
	</div>
</div>
