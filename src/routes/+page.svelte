<script lang="ts">
</script>

<svelte:head>
  <title>LxMerit – Classical Education, Merit-Based Learning</title>
  <meta name="description" content="Establishing the Lx industry standard for merit-based classical education. L(earn)² platform for authentic assessment, verifiable credentials, lifelong learning.">
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
    justify-content: center;
    padding: 2rem;
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

  .logo {
    width: 200px;
    height: auto;
    margin: 0 auto 2rem;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
    transition: transform 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    margin-bottom: 1rem;
    color: #b5c4c4;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  /* Subscript x styling (like Rx for prescriptions) */
  .subscript-x {
    font-size: 0.65em;
    vertical-align: baseline;
    position: relative;
    top: 0.15em;
    margin: 0 -0.05em;
  }

  .product-name {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.8rem, 4.5vw, 3rem);
    margin-bottom: 0.5rem;
    color: #8fa8a8;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .product-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    margin-bottom: 2rem;
    color: #7a9292;
    font-weight: 300;
    font-style: italic;
  }

  .tagline {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    max-width: 600px;
    margin: 0 auto 3rem;
    color: #c2d0d0;
    font-weight: 300;
    line-height: 1.8;
  }

  .highlight {
    color: #8fa8a8;
    font-weight: 400;
  }

  .info {
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin-bottom: 1.5rem;
    color: #89a0a0;
  }

  .cta {
    display: inline-block;
    padding: 1rem 2.5rem;
    margin: 0.75rem;
    background: linear-gradient(135deg, #4a7070 0%, #3d5f5f 100%);
    color: #e8f0f0;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(74, 112, 112, 0.3);
  }

  .cta:hover {
    background: linear-gradient(135deg, #3d5f5f 0%, #2f4d4d 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 112, 112, 0.4);
  }

  .divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #8fa8a8, transparent);
    margin: 3rem auto;
  }

  footer {
    margin-top: 4rem;
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
    .logo {
      width: 150px;
    }

    .container {
      padding: 1rem;
    }

    .cta {
      padding: 0.875rem 2rem;
      font-size: 1rem;
    }
  }
</style>

<div class="page">
  <nav class="nav">
    <a href="/blog">Dev Diary</a>
    <a href="/about">About</a>
  </nav>
  <div class="container">
    <img src="/lxm-logo-grey-letters.jpg" alt="LxMerit Shield Logo" class="logo">

    <h1>L<span class="subscript-x">x</span>Merit</h1>

    <div class="product-name">L(earn)²</div>
    <div class="product-subtitle">Merit-Based Learning Platform</div>

    <p class="tagline">
      <span class="highlight">LxMerit</span> establishes the Lx industry standard for merit-based classical education.
      Our <span class="highlight">L(earn)² platform</span> delivers authentic assessment, verifiable lifelong credentials, and learning velocity you own.
    </p>

    <div class="divider"></div>

    <p class="info">Launching 2026</p>
    <p class="info">Building the future of merit-based learning</p>

    <footer>
      <p>© 2025 LxMerit • Founded by Patrick Hardiman</p>
      <p style="margin-top: 0.5rem;">
        <a href="mailto:patrick@lxmerit.com">patrick@lxmerit.com</a>
      </p>
    </footer>
  </div>
</div>
