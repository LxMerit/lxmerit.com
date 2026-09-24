<script lang="ts">
	import { base } from '$app/paths';
	import WaitlistSignup from '$lib/WaitlistSignup.svelte';
	import { CORP_WAITLIST_SOURCE, WAITLIST_PAGE_SRC_KEY } from '$lib/waitlist-source';
</script>

<svelte:head>
	<title>Learn to love reading. | LxMerit</title>
	<meta name="description" content="Learn to love reading. Classical learning for the whole family." />
</svelte:head>

<main class="ad">
	<div class="copy">
		<p class="kicker">Not just learning to read.</p>
		<h1>Learn to love reading.</h1>
		<p class="family">Classical learning for the whole family.</p>
		<WaitlistSignup
			fallbackSource={CORP_WAITLIST_SOURCE}
			storageKey={WAITLIST_PAGE_SRC_KEY}
			title=""
			subtitle=""
		/>
		<p class="more"><a href={`${base}/`}>Learn more</a></p>
		<p class="signoff">L(earn)<sup>2</sup> = Merit</p>
	</div>
	<figure>
		<img
			src={`${base}/ad-v11-p46.png`}
			alt="The reader open to Lesson LXII, page 46, a pup and a woodcut."
			width="1080"
			height="1920"
		/>
	</figure>
</main>

<style>
	.ad {
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

	.kicker,
	.family {
		margin: 0;
		font-size: 1rem;
		line-height: 1.35;
		color: #b5c4c4;
		text-wrap: balance;
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

		.copy {
			margin: 0;
			max-width: 36rem;
		}

		figure {
			margin: 0;
			max-width: none;
		}
	}
</style>
