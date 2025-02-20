<script>
  import { Logo, HvaLogo } from "$lib/svgs";
</script>

<header class="header">
  <div class="left">
    <HvaLogo />
    <p class="small-body">Ad Frontend Design & Development</p>
  </div>
  <a href="/" class="logo">
    <Logo />
  </a>
</header>

<style>
  .header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    padding-bottom: var(--padding);
  }
  .left {
    display: flex;
    align-items: center;
    gap: 0.25rem 1rem;
    flex-wrap: wrap;
  }
  :global(.header svg) {
    display: block;
  }
  :global(.left svg) {
    height: clamp(1.5rem, 4vw, 3rem);
  }
  .left p {
    padding-left: 1rem;
    border-left: 1px solid var(--color);
  }
  @media (max-width: 750px) {
    .left p {
      font-size: 0.75rem;
    }
  }
  @media (max-width: 750px) {
    .left p {
      padding-left: 0;
      border-left: none;
    }
  }
  :global(.logo svg) {
    height: clamp(3rem, 10vw, 5rem);
  }
  @media (max-width: 750px) {
    :global(.logo) {
      margin-left: auto;
    }
  }
</style>
