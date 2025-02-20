<script>
  import { onMount } from "svelte";
  import { prettyDate, getDateTimeString } from "$lib/utils/date.js";
  
  export let speaker;
  export let index;
  export let nextEvent;
  
  let speakerCard = null
  
  onMount(() => {
    // scroll to next event
    if (nextEvent && speakerCard) {
      setTimeout(() => {
        speakerCard.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  });
</script>
<!-- if date is passed add class "is-in-past" -->
<div class="speaker-card" class:is-next-event={nextEvent} style="--index: {index}" bind:this={speakerCard}>
  <p class="speaker-date small-body font-medium caps">
    <span class="sr-only"> Datum: </span>
    <time datetime={speaker.date + " " + speaker.time}>
      {#if nextEvent}
        Volgende talk:
      {/if}
      {prettyDate(speaker.date)}
    </time>
  </p>
  <div class="talk-info p">
    <p class="caps label xsmall-body font-bold">Talk</p>
    <h2 class="speaker-card__title xlarge-body">{speaker.title}</h2>
    <p class="event-info__date caps meta xsmall-body font-medium">
      <span class="sr-only"> Tijd: </span>
      {speaker.time} uur
      <span class="sr-only"> Locatie: </span>
      {speaker.location}
    </p>
    {#if speaker.talk_description}
      <p class="speaker-talk-description small-body">
        {speaker.talk_description}
      </p>
    {/if}
  </div>
  <div class="speaker-info">
    <div class="speaker-image">
      <img src={speaker.image} alt={speaker.name} />
    </div>
    <div class="speaker-content">
      <p class="speaker-label caps label xsmall-body font-bold">Spreker</p>
      <div class="content p">
        <h3 class="speaker-name small-heading">{speaker.name}</h3>
        <p class="meta caps xsmall-body">
          {#if speaker.company && speaker.company !== "Freelance"}
            {#if speaker.company_url}
              <a
                href={speaker.company_url}
                class="speaker-company"
                target="_blank"
              >
                {speaker.company}
              </a>
            {:else}
              {speaker.company}
            {/if}
          {/if}
          {#if speaker.url}
            <a href={speaker.url} class="speaker-website" target="_blank">
              Persoonlijke website
            </a>
          {/if}
        </p>
        <p class="speaker-bio small-body">
          {speaker.bio}
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .speaker-card {
    --translateY: 1em;
    position: sticky;
    top: calc(var(--padding-top) * 2);
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0 var(--padding);
    animation-timeline: view();
    transform-origin: top center;
    scroll-margin-top: calc(var(--padding-top) * 3);
    --translateY: calc((var(--count) - var(--index)) * -1em);
    --scale-multiplier: var(--index) / var(--count);

    @supports (grid-template-columns: subgrid) {
      grid-template-columns: subgrid;
    }
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        animation-name: ScaleDown;
        animation-fill-mode: forwards;
        animation-range: entry calc(100lvh - var(--padding-top) * 2) entry 150lvh;
      }
    }
  }
  @keyframes ScaleDown {
    to {
      transform: scale(calc(0.9 + 0.05 * var(--scale-multiplier))) translateY(var(--translateY));
    }
  }

  .is-next-event { 
    .speaker-date time {
      color: var(--color);
      background-color: var(--base-color);
    }
  }

  .speaker-date {
    grid-column: 1 / -1;
  }
  .speaker-date time {
    font-weight: 800;
    border-radius: var(--small-radius) var(--small-radius) 0 0;
    padding: 0.25em 0.5em;
    box-shadow: 0.25rem 0.25rem 0 var(--color);
    border: 1px solid var(--color);
    color: var(--base-color);
    background-color: var(--color);
    border-bottom: none;
    margin-bottom: -1px;
    display: block;
    width: max-content;
    margin-left: auto;
  }
  .talk-info {
    position: relative;
    background-color: var(--background);
    border: var(--border-width) solid currentColor;
    padding: var(--padding);
    border-radius: var(--small-radius) 0 0 var(--small-radius);
    display: grid;
    grid-column: 1 / -1;
    box-shadow: 0.25rem 0.25rem 0 currentColor;
  }

  .speaker-info {
    position: relative;
    grid-column: 2 / -1;

    border: var(--border-width) solid currentColor;
    border-radius: 0 0 var(--small-radius) var(--small-radius);
    border-top: none;
    background-color: var(--background);
    margin-top: calc(var(--border-width) * -1);
    padding: 0 var(--padding) var(--padding) var(--padding);
    display: grid;
    grid-template-columns: repeat(6, auto);
    box-shadow: 0.25rem 0.25rem 0 currentColor;
    @supports (grid-template-columns: subgrid) {
      grid-template-columns: subgrid;
    }
  }

  .speaker-info::before {
    content: "";
    position: absolute;
    top: 0;
    border-radius: 0 50% 0 0;
    box-shadow:
      0 0 0 currentColor,
      3px -3px 0 var(--background);
    right: 100%;
    width: calc(var(--small-radius) * 1.5);
    height: calc(var(--small-radius) * 1.5);
  }
  .speaker-info::after {
    content: "";
    position: absolute;
    top: calc(0.25rem + calc(var(--border-width)));
    right: calc(100% + var(--border-width));
    border-radius: 0 50% 0 0;
    background-color: var(--background);
    box-shadow:
      0 0 0 currentColor,
      0px -5px 0 currentColor;
    width: calc(var(--small-radius) * 1.5);
    height: calc(var(--small-radius) * 1.5);
  }
  .speaker-image {
    grid-column: 1 / 2;
    align-self: baseline;
  }
  @media (max-width: 750px) {
    .speaker-image {
      grid-column: 1 / 4;
    }
  }
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: var(--small-radius);
  }
  .speaker-content {
    grid-column: 2 / -1;
  }
  @media (max-width: 750px) {
    .speaker-content {
      grid-column: 4 / -1;
    }
  }
</style>
