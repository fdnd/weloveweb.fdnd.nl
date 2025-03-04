<script>
  import "./style.css";
  import { onMount } from "svelte";
  import { prettyDate, getDateTimeString } from "$lib/utils/date.js";

  export let speaker;
  export let index;
  export let nextEvent;

  let speakerCard = null;

  onMount(() => {
    // scroll to next event
    // if no hashtag in url, scroll to speaker card
    if (!window.location.hash && nextEvent && speakerCard) {
      setTimeout(() => {
        speakerCard.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  });

  const speakerId = speaker.name.toLowerCase().replace(/ /g, "-");
</script>

<!-- if date is passed add class "is-in-past" -->
<div
  id={speakerId}
  class="speaker-card"
  class:is-next-event={nextEvent}
  style="--index: {index}"
  bind:this={speakerCard}
>
  <a href={`#${speakerId}`} class="speaker-date small-body font-medium caps">
    <span class="sr-only"> Datum: </span>
    <time datetime={speaker.date + " " + speaker.time}>
      {#if nextEvent}
        Volgende talk:
      {/if}
      {prettyDate(speaker.date)}
    </time>
  </a>
  <div class="talk-info">
    <p class="caps label xsmall-body font-bold">Talk:</p>
    <h2 class="speaker-card__title xlarge-body">
      {speaker.title}
    </h2>
    <p class="event-info__date caps meta xsmall-body font-medium">
      {prettyDate(speaker.date)} | 
      <span class="sr-only"> Tijd: </span>
      {speaker.time} uur |
      <span class="sr-only"> Locatie: </span>
      {@html speaker.location}
    </p>
    {#if speaker.talk_description}
      <p class="speaker-talk-description small-body">
        {speaker.talk_description}
      </p>
    {/if}
  </div>
  <div class="speaker-info">
    <div class="speaker-main">
      <img src={speaker.image} alt={speaker.name} />
      <h3 class="speaker-name medium-body">{speaker.name}</h3>
      <div class="meta">
        <p class="caps xsmall-body">
          {#if speaker.company && speaker.company !== "Freelance"}
            {#if speaker.job_title}
              {speaker.job_title} bij
            {/if}

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
          {#if speaker.company == "Freelance"}
            {speaker.job_title ? speaker.job_title : "Freelancer"}
          {/if}
        </p>
        <p class="caps xsmall-body">
          {#if speaker.url}
            <a href={speaker.url} class="speaker-website" target="_blank">
              Persoonlijke website
            </a>
          {/if}
        </p>
      </div>
    </div>
    <p class="speaker-bio small-body">
      {speaker.bio}
    </p>
  </div>
</div>
