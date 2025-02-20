<script>
  import { Header, SpeakerCard, Footer } from "$lib/components";

  import { weLoveWebSpeakers } from "$lib/data/schedule.js";
  import { getDateTimeString } from "$lib/utils/date.js";

  let nextEvent = null;
  // get event from welovewebspeakers closest to date in the future
  let eventsInFuture = [];
  weLoveWebSpeakers.forEach((event, index) => {
    if (getDateTimeString(event.date) > new Date()) {
      eventsInFuture.push(index);
    }
  });
  
;
</script>

<Header />
<main>
  <section class="intro p">
    <h1 class="intro__title large-heading">We ♥ the web</h1>
    <p class="intro__description large-body font-medium">
      Inspirerende en leerzame presentaties bij FDND. Voor nerds, door nerds.
    </p>
    <p class="intro__description medium-body">
      Vind je het leuk om een presentatie te geven. of wil je een presentatie bijwonen? Dat kan! Stuur een mailtje naar <a href="mailto:info-fdnd@hva.nl">info-fdnd@hva.nl</a>.
    </p>
  </section>
  <section class="speaker-grid" style="--count: {weLoveWebSpeakers.length}">
    {#each weLoveWebSpeakers as speaker, index}
      <SpeakerCard {speaker} {index} nextEvent={index == eventsInFuture[0]}/>
    {/each}
  </section>
</main>
<Footer />

<style>
  .intro {
    padding: var(--padding-top) 0 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 0 var(--padding); /*only horizontal gaps*/
  }
  .intro > * {
    grid-column: 4 / span 6;
  }
  @media (max-width: 1280px) {
    .intro > * {
      grid-column: 3 / span 8;
    }
  }
  @media (max-width: 1024px) {
    .intro > * {
      grid-column: 2 / span 10;
    }
  }
  @media (max-width: 750px) {
    .intro > * {
      grid-column: 1 / -1;
    }
  }
  .speaker-grid {
    margin-top: var(--padding-top);
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: calc(var(--padding) * 2) var(--padding) ;
  }
  :global(.speaker-grid > *) {
    grid-column: 4 / span 6;
  }
  @media (max-width: 1280px) {
    :global(.speaker-grid > *) {
      grid-column: 3 / span 8;
    }
  }
  @media (max-width: 1024px) {
    :global(.speaker-grid > *) {
      grid-column: 2 / span 10;
    }
  }
  @media (max-width: 750px) {
    :global(.speaker-grid > *) {
      grid-column: 1 / -1;
    }
  }
</style>