<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Page Not Found – LxMerit</title>
  <meta name="description" content="The page you're looking for doesn't exist.">
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
    padding: 15vh 2rem 2rem;
    line-height: 1.6;
  }

  .container {
    max-width: 600px;
    text-align: center;
    animation: fadeIn 0.6s ease-in;
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

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .brand {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    margin-bottom: 1.5rem;
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

  .error-code {
    font-family: 'Cinzel', serif;
    font-size: clamp(3rem, 12vw, 6rem);
    color: #3d5f5f;
    font-weight: 600;
    letter-spacing: 0.05em;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .error-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    margin-bottom: 1rem;
    color: #8fa8a8;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .message {
    font-size: clamp(1rem, 2vw, 1.15rem);
    margin-bottom: 2.5rem;
    color: #89a0a0;
    font-weight: 300;
  }

  .divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #8fa8a8, transparent);
    margin: 2rem auto;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .link {
    display: inline-block;
    padding: 0.875rem 2rem;
    background: linear-gradient(135deg, #4a7070 0%, #3d5f5f 100%);
    color: #e8f0f0;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(74, 112, 112, 0.3);
  }

  .link:hover {
    background: linear-gradient(135deg, #3d5f5f 0%, #2f4d4d 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 112, 112, 0.4);
  }

  .link.secondary {
    background: transparent;
    border: 1px solid #4a7070;
    box-shadow: none;
  }

  .link.secondary:hover {
    background: rgba(74, 112, 112, 0.1);
    box-shadow: none;
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
    .container {
      padding: 1rem;
    }

    .links {
      flex-direction: column;
    }

    .link {
      width: 100%;
    }

    .nav {
      top: 1rem;
      right: 1rem;
      gap: 1.5rem;
    }

    .logo {
      width: 150px;
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

    <h1 class="brand">L<span class="subscript-x">x</span>Merit</h1>

    <div class="error-code">{$page.status}</div>

    <p class="error-title">Page Not Found</p>

    <p class="message">
      The page you're looking for doesn't exist or has been moved.
    </p>

    <div class="divider"></div>

    <div class="links">
      <a href="/" class="link">Return Home</a>
      <a href="/blog" class="link secondary">Read Dev Diary</a>
    </div>
  </div>
</div>
