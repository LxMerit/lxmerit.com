<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	// ═══════════════════════════════════════════════════════════════════
	// Waitlist Form State (Svelte 5 Reactivity)
	// ═══════════════════════════════════════════════════════════════════
	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let turnstileToken = $state('');
	let turnstileWidgetId = $state<string | null>(null);

	// API endpoint - determined at runtime
	// For local dev: use Vite proxy (same origin, bypasses CORS entirely)
	// For production: use api.lxmerit.com
	let apiUrl = $state('https://api.lxmerit.com');

	// Turnstile site key (production - localhost added to allowed domains in Cloudflare)
	const TURNSTILE_SITE_KEY = '0x4AAAAAACG6xDA6c8-zTOr7';

	// ═══════════════════════════════════════════════════════════════════
	// Turnstile Integration
	// ═══════════════════════════════════════════════════════════════════
	onMount(() => {
		// Use Vite proxy for localhost (bypasses CORS entirely)
		if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
			apiUrl = '';  // Empty = same origin, Vite proxies /api/* to Fly.io
		}

		// Load Turnstile script
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);

		// Define callback for when Turnstile loads
		(window as any).onTurnstileLoad = () => {
			if ((window as any).turnstile) {
				console.log('Turnstile rendering with site key:', TURNSTILE_SITE_KEY);
				turnstileWidgetId = (window as any).turnstile.render('#turnstile-container', {
					sitekey: TURNSTILE_SITE_KEY,
					callback: (token: string) => {
						console.log('Turnstile SUCCESS - token received:', token.substring(0, 20) + '...');
						turnstileToken = token;
						// If form submission was waiting for token, complete it now
						if (pendingSubmit) {
							submitForm();
						}
					},
					'expired-callback': () => {
						console.log('Turnstile token expired');
						turnstileToken = '';
					},
					'error-callback': (error: any) => {
						console.error('Turnstile ERROR:', error);
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
		};

		return () => {
			// Cleanup
			if ((window as any).turnstile && turnstileWidgetId) {
				(window as any).turnstile.remove(turnstileWidgetId);
			}
		};
	});

	// ═══════════════════════════════════════════════════════════════════
	// Form Submission
	// ═══════════════════════════════════════════════════════════════════
	let pendingSubmit = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();

		// Validate email
		if (!email || !email.includes('@')) {
			errorMessage = 'Please enter a valid email address.';
			status = 'error';
			return;
		}

		// If no token yet, trigger Turnstile and wait for callback
		if (!turnstileToken) {
			if ((window as any).turnstile && turnstileWidgetId) {
				pendingSubmit = true;
				status = 'loading';
				errorMessage = '';
				(window as any).turnstile.execute(turnstileWidgetId);
				// The callback will set turnstileToken, then submitForm() will be called
				return;
			} else {
				errorMessage = 'Security verification not ready. Please refresh and try again.';
				status = 'error';
				return;
			}
		}

		await submitForm();
	}

	async function submitForm() {
		status = 'loading';
		errorMessage = '';

		console.log('submitForm called with token:', turnstileToken ? 'present' : 'MISSING');
		console.log('Email:', email);

		try {
			console.log('Fetching:', `${apiUrl}/api/v1/identity/waitlist/signup`);
			const response = await fetch(`${apiUrl}/api/v1/identity/waitlist/signup`, {
				method: 'POST',
				mode: 'cors',
				credentials: 'omit',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email.trim().toLowerCase(),
					turnstile_token: turnstileToken,
					source: 'lxmerit.com'
				}),
			});

			if (response.ok) {
				status = 'success';
				email = '';
			} else {
				const data = await response.json().catch(() => ({}));
				// API returns: { detail: { error: { message: "..." } } }
				errorMessage = data?.detail?.error?.message
					|| data?.detail?.message
					|| (typeof data?.detail === 'string' ? data.detail : null)
					|| 'Something went wrong. Please try again.';
				status = 'error';
			}
		} catch (err) {
			console.error('Waitlist fetch error:', err);
			errorMessage = `Connection error: ${err instanceof Error ? err.message : String(err)}`;
			status = 'error';
		}

		// Reset Turnstile for next attempt
		pendingSubmit = false;
		if ((window as any).turnstile && turnstileWidgetId) {
			(window as any).turnstile.reset(turnstileWidgetId);
			turnstileToken = '';
		}
	}

	// Derived state for button text
	let buttonText = $derived(
		status === 'loading' ? 'Joining...' :
		status === 'success' ? 'You\'re In!' :
		'Join the Waitlist'
	);

	let isDisabled = $derived(status === 'loading' || status === 'success');
</script>

<svelte:head>
  <title>LxMerit – Classical Education, Merit-Based Learning</title>
  <meta name="description" content="Classical curriculum with instrumented mastery tracking. The L(earn)² platform delivers merit-based classical education for homeschool families.">

  <!-- Open Graph (Facebook, LinkedIn, Discord, Slack) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.lxmerit.com/" />
  <meta property="og:title" content="LxMerit" />
  <meta property="og:description" content="Classical Curriculum. Instrumented Mastery. Your velocity. Your ledger. L(earn)² = Merit | LxLedger.com" />
  <meta property="og:image" content="https://www.lxmerit.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://www.lxmerit.com/" />
  <meta name="twitter:title" content="LxMerit" />
  <meta name="twitter:description" content="Classical Curriculum. Instrumented Mastery. Your velocity. Your ledger. L(earn)² = Merit | LxLedger.com" />
  <meta name="twitter:image" content="https://www.lxmerit.com/og-image.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
</svelte:head>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .page {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: linear-gradient(135deg, #1a2f2f 0%, #2d4545 100%);
    color: #d4dada;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 12vh 2rem 2rem;
    line-height: 1.6;
  }

  .container {
    max-width: 800px;
    text-align: center;
    animation: fadeIn 1s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @keyframes checkmark {
    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
    50% { transform: scale(1.2) rotate(-45deg); }
    100% { transform: scale(1) rotate(-45deg); opacity: 1; }
  }

  .logo {
    width: 180px;
    height: auto;
    margin: 0 auto 1.5rem;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
    transition: transform 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.2rem, 7vw, 4rem);
    margin-bottom: 0.75rem;
    color: #b5c4c4;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .subscript-x {
    font-size: 0.65em;
    vertical-align: baseline;
    position: relative;
    top: 0.15em;
    margin: 0 -0.05em;
  }

  .product-name {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    margin-bottom: 0.4rem;
    color: #8fa8a8;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .product-subtitle {
    font-size: clamp(0.95rem, 2.2vw, 1.1rem);
    margin-bottom: 1.5rem;
    color: #7a9292;
    font-weight: 300;
    font-style: italic;
  }

  .tagline {
    font-size: clamp(1rem, 2.2vw, 1.25rem);
    max-width: 580px;
    margin: 0 auto 2rem;
    color: #c2d0d0;
    font-weight: 300;
    line-height: 1.8;
  }

  .highlight {
    color: #8fa8a8;
    font-weight: 400;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .highlight:hover {
    color: #b5c4c4;
  }

  /* ═══════════════════════════════════════════════════════════════════
     Waitlist Form - Fortune 100 Polish
     ═══════════════════════════════════════════════════════════════════ */
  .waitlist-section {
    margin: 0 auto 2rem;
    max-width: 480px;
    width: 100%;
  }

  .waitlist-card {
    background: linear-gradient(145deg, rgba(45, 69, 69, 0.6) 0%, rgba(26, 47, 47, 0.8) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(143, 168, 168, 0.15);
    border-radius: 16px;
    padding: 2rem;
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.3),
      0 1px 0 rgba(255, 255, 255, 0.05) inset;
  }

  .waitlist-title {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    color: #b5c4c4;
    margin-bottom: 0.5rem;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .waitlist-subtitle {
    font-size: 0.9rem;
    color: #7a9292;
    margin-bottom: 1.25rem;
    font-weight: 300;
  }

  .form-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

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
    transition: all 0.25s ease;
  }

  .email-input::placeholder {
    color: #5f7676;
  }

  .email-input:focus {
    outline: none;
    border-color: rgba(143, 168, 168, 0.5);
    background: rgba(26, 47, 47, 0.95);
    box-shadow: 0 0 0 3px rgba(143, 168, 168, 0.1);
  }

  .email-input.error {
    border-color: rgba(239, 68, 68, 0.5);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .submit-btn {
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #4a7070 0%, #3d5f5f 100%);
    color: #e8f0f0;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 2px 12px rgba(74, 112, 112, 0.3);
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 140px;
  }

  .submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #527a7a 0%, #456969 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(74, 112, 112, 0.4);
  }

  .submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .submit-btn.loading {
    background: linear-gradient(135deg, #3d5f5f 0%, #2f4d4d 100%);
  }

  .submit-btn.success {
    background: linear-gradient(135deg, #2d6b4f 0%, #1f5a3f 100%);
  }

  /* Loading spinner */
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(232, 240, 240, 0.3);
    border-top-color: #e8f0f0;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Checkmark */
  .checkmark {
    width: 16px;
    height: 16px;
    position: relative;
  }

  .checkmark::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #e8f0f0;
    border-width: 0 2px 2px 0;
    animation: checkmark 0.3s ease-out forwards;
  }

  /* Status messages */
  .status-message {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    animation: fadeIn 0.3s ease-out;
  }

  .status-message.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
  }

  .status-message.success {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #86efac;
  }

  .success-detail {
    font-size: 0.85rem;
    color: #6ee7b7;
    margin-top: 0.25rem;
    font-weight: 300;
  }

  /* Turnstile container (invisible) */
  #turnstile-container {
    height: 0;
    overflow: hidden;
  }

  .divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #8fa8a8, transparent);
    margin: 2rem auto;
  }

  .info {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    margin-bottom: 1.25rem;
    color: #89a0a0;
  }

  .info a {
    color: #8fa8a8;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .info a:hover {
    color: #b5c4c4;
  }

  footer {
    margin-top: 3rem;
    font-size: 0.9rem;
    color: #5f7676;
    font-weight: 300;
  }

  footer a {
    color: #8fa8a8;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  footer a:hover {
    color: #b5c4c4;
  }

  .nav {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    display: flex;
    gap: 2rem;
  }

  .nav a {
    color: #8fa8a8;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 400;
    transition: color 0.2s ease;
  }

  .nav a:hover {
    color: #d4dada;
  }

  @media (max-width: 640px) {
    .page {
      padding: 10vh 1.25rem 2rem;
    }

    .logo {
      width: 140px;
    }

    .container {
      padding: 0.5rem;
    }

    .waitlist-card {
      padding: 1.5rem;
    }

    .form-row {
      flex-direction: column;
    }

    .submit-btn {
      width: 100%;
    }

    .nav {
      top: 1rem;
      right: 1rem;
      gap: 1.25rem;
    }

    .nav a {
      font-size: 0.9rem;
    }
  }
</style>

<div class="page">
  <nav class="nav">
    <a href={`${base}/blog`}>Dev Diary</a>
    <a href={`${base}/about`}>About</a>
  </nav>
  <div class="container">
    <img src={`${base}/lxm-logo-grey-letters.jpg`} alt="LxMerit Shield Logo" class="logo">

    <h1>L<span class="subscript-x">x</span>Merit</h1>

    <div class="product-name">L(earn)²</div>
    <div class="product-subtitle">Classical Curriculum. Instrumented Mastery. Your velocity. Your ledger.</div>

    <p class="tagline">
      Our <a href="https://learn2.lxmerit.com" class="highlight">L(earn)² platform</a> delivers classical curriculum with instrumented mastery tracking.
    </p>

    <!-- ═══════════════════════════════════════════════════════════════════
         Waitlist Signup Form
         ═══════════════════════════════════════════════════════════════════ -->
    <section class="waitlist-section">
      <div class="waitlist-card">
        <h2 class="waitlist-title">Get Early Access</h2>
        <p class="waitlist-subtitle">Join the waitlist for founding family pricing.</p>

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

          <!-- Turnstile invisible widget container -->
          <div id="turnstile-container"></div>
        </form>

        {#if status === 'error' && errorMessage}
          <div class="status-message error">
            {errorMessage}
          </div>
        {/if}

        {#if status === 'success'}
          <div class="status-message success">
            <strong>Welcome to the founding family.</strong>
            <p class="success-detail">We'll reach out when early access opens.</p>
          </div>
        {/if}
      </div>
    </section>

    <div class="divider"></div>

    <p class="info">L(earn)² = Merit | <a href="https://lxledger.com">LxLedger.com</a></p>
    <p class="info">Launching 2026</p>

    <footer>
      <p>© 2025 LxMerit • Founded by Patrick Hardiman</p>
      <p style="margin-top: 0.5rem;">
        <a href="mailto:patrick@lxmerit.com">patrick@lxmerit.com</a>
      </p>
    </footer>
  </div>
</div>
