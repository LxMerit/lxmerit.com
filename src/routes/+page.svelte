<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import WaitlistSignup from '$lib/WaitlistSignup.svelte';
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

  .legal-links {
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  .legal-links .sep {
    color: #3d5f5f;
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
    <a href={`${base}/about`}>About</a>
  </nav>
  <div class="container">
    <img src={`${base}/lxm-logo-grey-letters.jpg`} alt="LxMerit Shield Logo" class="logo">

    <h1>L<span class="subscript-x">x</span>Merit</h1>

    <div class="product-name">L(earn)²</div>
    <div class="product-subtitle">Classical Curriculum. Instrumented Mastery. Your velocity. Your ledger.</div>

    <p class="tagline">
      Our <a href={$page.data.siteUrls.learn2} class="highlight">L(earn)² platform</a> delivers classical curriculum with instrumented mastery tracking.
    </p>

    <WaitlistSignup />

    <div class="divider"></div>

    <p class="info">L(earn)² = Merit | <a href={$page.data.siteUrls.lxledger}>LxLedger.com</a></p>
    <p class="info">Launching 2026</p>

    <footer>
      <p>© {new Date().getFullYear()} LxMerit LLC • Founded by Patrick Hardiman</p>
      <p style="margin-top: 0.5rem;">
        <a href="mailto:patrick@lxmerit.com">patrick@lxmerit.com</a>
      </p>
      <p class="legal-links">
        <a href={`${base}/privacy`}>Privacy Policy</a>
        <span class="sep">•</span>
        <a href={`${base}/sms`}>SMS Notifications</a>
      </p>
    </footer>
  </div>
</div>
