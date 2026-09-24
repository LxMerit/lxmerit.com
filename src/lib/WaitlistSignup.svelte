<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		acceptCampaignSrc,
		CAMPAIGN_SRC_KEY,
		CORP_HOME_SOURCE,
		resolveCampaignSource,
		signupBody
	} from '$lib/waitlist-source';

	interface Props {
		fallbackSource?: string;
		storageKey?: string;
		title?: string;
		subtitle?: string;
	}

	let {
		fallbackSource = CORP_HOME_SOURCE,
		storageKey = CAMPAIGN_SRC_KEY,
		title = 'Get Early Access',
		subtitle = 'Join the waitlist for founding family pricing.'
	}: Props = $props();

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let turnstileToken = $state('');
	let turnstileWidgetId = $state<string | null>(null);
	let apiUrl = $state('https://api.lxmerit.com');
	let pendingSubmit = $state(false);
	let carriedSrc = $state<string | null>(null);

	const TURNSTILE_SITE_KEY = '0x4AAAAAACG6xDA6c8-zTOr7';
	const widgetDomId = $derived(`turnstile-${storageKey.replace(/[^a-zA-Z0-9-]/g, '')}`);

	function readStoredSrc(): string | null {
		if (!browser) return null;
		try {
			return sessionStorage.getItem(storageKey);
		} catch {
			return null;
		}
	}

	function persistSrc(src: string) {
		if (!browser) return;
		try {
			sessionStorage.setItem(storageKey, src);
		} catch {
			// Private mode. carriedSrc still covers this page view.
		}
	}

	$effect(() => {
		const seen = acceptCampaignSrc($page.url.searchParams.get('src'));
		if (!seen) return;
		carriedSrc = seen;
		persistSrc(seen);
	});

	function sourceAtSubmit(): string {
		const fromUrl = browser ? new URL(window.location.href).searchParams.get('src') : null;
		const accepted = acceptCampaignSrc(fromUrl);
		if (accepted) {
			carriedSrc = accepted;
			persistSrc(accepted);
		}
		return resolveCampaignSource(fromUrl, carriedSrc ?? readStoredSrc(), fallbackSource);
	}

	function renderTurnstile() {
		const turnstile = (window as unknown as { turnstile?: { render: Function; remove: Function; execute: Function; reset: Function } }).turnstile;
		if (!turnstile || turnstileWidgetId) return;
		turnstileWidgetId = turnstile.render(`#${widgetDomId}`, {
			sitekey: TURNSTILE_SITE_KEY,
			callback: (token: string) => {
				turnstileToken = token;
				if (pendingSubmit) submitForm();
			},
			'expired-callback': () => {
				turnstileToken = '';
			},
			'error-callback': () => {
				turnstileToken = '';
				if (pendingSubmit) {
					pendingSubmit = false;
					errorMessage = 'Security verification failed. Please try again.';
					status = 'error';
				}
			},
			theme: 'dark',
			size: 'invisible'
		});
	}

	onMount(() => {
		if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
			apiUrl = '';
		}

		const host = window as unknown as { turnstile?: unknown; onTurnstileLoad?: () => void };
		host.onTurnstileLoad = () => renderTurnstile();
		if (host.turnstile) {
			renderTurnstile();
		} else if (!document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
			const script = document.createElement('script');
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);
		}

		return () => {
			const turnstile = (window as unknown as { turnstile?: { remove: (id: string) => void } }).turnstile;
			if (turnstile && turnstileWidgetId) turnstile.remove(turnstileWidgetId);
		};
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email || !email.includes('@')) {
			errorMessage = 'Please enter a valid email address.';
			status = 'error';
			return;
		}
		if (!turnstileToken) {
			const turnstile = (window as unknown as { turnstile?: { execute: (id: string) => void } }).turnstile;
			if (turnstile && turnstileWidgetId) {
				pendingSubmit = true;
				status = 'loading';
				errorMessage = '';
				turnstile.execute(turnstileWidgetId);
				return;
			}
			errorMessage = 'Security verification not ready. Please refresh and try again.';
			status = 'error';
			return;
		}
		await submitForm();
	}

	async function submitForm() {
		status = 'loading';
		errorMessage = '';
		try {
			const response = await fetch(`${apiUrl}/api/v1/identity/waitlist/signup`, {
				method: 'POST',
				mode: 'cors',
				credentials: 'omit',
				headers: { 'Content-Type': 'application/json' },
				body: signupBody(email, turnstileToken, sourceAtSubmit())
			});
			if (response.ok) {
				status = 'success';
				email = '';
			} else {
				const data = await response.json().catch(() => ({}));
				errorMessage =
					data?.detail?.error?.message ||
					data?.detail?.message ||
					(typeof data?.detail === 'string' ? data.detail : null) ||
					'Something went wrong. Please try again.';
				status = 'error';
			}
		} catch (err) {
			errorMessage = `Connection error: ${err instanceof Error ? err.message : String(err)}`;
			status = 'error';
		}
		pendingSubmit = false;
		const turnstile = (window as unknown as { turnstile?: { reset: (id: string) => void } }).turnstile;
		if (turnstile && turnstileWidgetId) {
			turnstile.reset(turnstileWidgetId);
			turnstileToken = '';
		}
	}

	let isDisabled = $derived(status === 'loading' || status === 'success');
</script>

<section class="waitlist-section">
	<div class="waitlist-card">
		{#if title}
			<h2 class="waitlist-title">{title}</h2>
		{/if}
		{#if subtitle}
			<p class="waitlist-subtitle">{subtitle}</p>
		{/if}

		<form onsubmit={handleSubmit}>
			<div class="form-row">
				<input
					type="email"
					class="email-input"
					class:error={status === 'error'}
					placeholder="your@email.com"
					bind:value={email}
					disabled={isDisabled}
					autocomplete="email"
					required
				/>
				<button
					type="submit"
					class="submit-btn"
					class:loading={status === 'loading'}
					class:success={status === 'success'}
					disabled={isDisabled}
				>
					{#if status === 'loading'}
						<span class="spinner"></span>
						Joining...
					{:else if status === 'success'}
						<span class="checkmark"></span>
						You're In!
					{:else}
						Join Waitlist
					{/if}
				</button>
			</div>
			<div id={widgetDomId} class="turnstile-slot"></div>
		</form>

		{#if status === 'error' && errorMessage}
			<div class="status-message error">{errorMessage}</div>
		{/if}
		{#if status === 'success'}
			<div class="status-message success">
				<strong>Welcome to the founding family.</strong>
				<p class="success-detail">We'll reach out when early access opens.</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.waitlist-section { margin: 0 auto 2rem; max-width: 480px; width: 100%; }
	.waitlist-card {
		background: linear-gradient(145deg, rgba(45, 69, 69, 0.6) 0%, rgba(26, 47, 47, 0.8) 100%);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(143, 168, 168, 0.15);
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.05) inset;
	}
	.waitlist-title {
		font-family: 'Cinzel', serif;
		font-size: 1.1rem;
		color: #b5c4c4;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
	.waitlist-subtitle { font-size: 0.9rem; color: #7a9292; margin-bottom: 1.25rem; font-weight: 300; }
	.form-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }
	.email-input {
		flex: 1;
		min-width: 200px;
		padding: 0.875rem 1rem;
		background: rgba(26, 47, 47, 0.8);
		border: 1px solid rgba(143, 168, 168, 0.2);
		border-radius: 8px;
		color: #d4dada;
		font-size: 1rem;
		font-family: inherit;
	}
	.email-input:focus { outline: none; border-color: rgba(143, 168, 168, 0.5); }
	.email-input.error { border-color: rgba(239, 68, 68, 0.5); }
	.submit-btn {
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, #4a7070 0%, #3d5f5f 100%);
		color: #e8f0f0;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-width: 140px;
	}
	.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(232, 240, 240, 0.3);
		border-top-color: #e8f0f0;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin { to { transform: rotate(360deg); } }
	.turnstile-slot { height: 0; overflow: hidden; }
	.status-message { margin-top: 1rem; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; }
	.status-message.error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; }
	.status-message.success { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #86efac; }
	.success-detail { font-size: 0.85rem; color: #6ee7b7; margin-top: 0.25rem; }
	@media (max-width: 640px) {
		.waitlist-card { padding: 1.5rem; }
		.form-row { flex-direction: column; }
		.submit-btn { width: 100%; }
	}
</style>
