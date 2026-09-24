<script lang="ts">
	import { base } from '$app/paths';
	import WaitlistSignup from '$lib/WaitlistSignup.svelte';
	import { CORP_WAITLIST_SOURCE } from '$lib/waitlist-source';
	import { GENERIC_WAITLIST, type AdEntry } from '$lib/waitlist-pages';

	interface Props {
		/** Omitted for the indexed generic page. */
		ad?: AdEntry;
	}

	let { ad }: Props = $props();

	const indexed = $derived(ad ? ad.indexed : GENERIC_WAITLIST.indexed);
	const storageKey = $derived(ad ? ad.storageKey : GENERIC_WAITLIST.storageKey);
</script>

<svelte:head>
	<title>{ad ? `${ad.headline} | LxMerit` : 'Waitlist | LxMerit'}</title>
	<meta
		name="description"
		content={ad ? ad.family || ad.headline : GENERIC_WAITLIST.invitationLine}
	/>
	{#if !indexed}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>

<main class="page" class:ad>
	<div class="copy">
		{#if ad}
			<p class="kicker">{ad.kicker}</p>
			<h1 class:italic={ad.headlineItalic}>{ad.headline}</h1>
			{#if ad.family}
				<p class="family">{ad.family}</p>
			{/if}
		{:else}
			<p class="invitation">{GENERIC_WAITLIST.invitationLine}</p>
		{/if}
		<WaitlistSignup
			fallbackSource={CORP_WAITLIST_SOURCE}
			{storageKey}
			title=""
			subtitle=""
		/>
		{#if ad?.learnMore}
			<p class="more"><a href={`${base}/`}>Learn more</a></p>
		{/if}
		<p class="signoff">L(earn)<sup>2</sup> = Merit</p>
	</div>
	{#if ad}
		<figure>
			<img
				src={`${base}${ad.still.src}`}
				alt={ad.still.alt}
				width={ad.still.width}
				height={ad.still.height}
			/>
		</figure>
	{/if}
</main>

<style>
	.page {
		min-height: 100dvh;
		box-sizing: border-box;
		padding: 1.25rem 1rem 2rem;
		background: #1a2f2f;
		color: #e8f0f0;
	}

	.copy {
		width: 100%;
		max-width: 28rem;
		margin: 0 auto;
		min-width: 0;
	}

	.invitation,
	.kicker,
	.family {
		margin: 0;
		font-size: 1rem;
		line-height: 1.35;
		color: #b5c4c4;
		text-wrap: balance;
	}

	.invitation {
		margin-bottom: 1rem;
		color: #f4f7f7;
	}

	h1 {
		margin: 0.35rem 0 0.5rem;
		font-family: 'Cinzel', serif;
		font-size: clamp(1.75rem, 8vw, 2.5rem);
		font-weight: 600;
		line-height: 1.15;
		color: #f4f7f7;
		text-wrap: balance;
	}

	h1.italic {
		font-style: italic;
		color: #6fa9a2;
	}

	.family {
		margin-bottom: 1rem;
	}

	.more {
		margin: 0.25rem 0 0;
		font-size: 0.85rem;
	}

	.more a {
		color: #8fa8a8;
		text-underline-offset: 0.15em;
	}

	.more a:focus-visible {
		outline: 2px solid #b5c4c4;
		outline-offset: 3px;
	}

	.signoff {
		margin: 1.25rem 0 0;
		font-family: 'Cinzel', serif;
		font-size: clamp(1.35rem, 5vw, 1.75rem);
		font-weight: 600;
		line-height: 1.2;
		color: #f4f7f7;
	}

	.signoff sup {
		font-size: 0.65em;
	}

	figure {
		margin: 1.25rem auto 0;
		max-width: 28rem;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 12px;
	}

	@media (min-width: 900px) {
		.ad {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			align-items: center;
			gap: 2rem;
			padding: 2rem 4vw;
		}

		.ad .copy {
			margin: 0;
			max-width: 36rem;
		}

		.ad figure {
			margin: 0;
			max-width: none;
		}
	}
</style>
