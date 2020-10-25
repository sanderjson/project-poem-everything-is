<script>
  import { onMount } from "svelte";
  import Wrapper from "./components/Wrapper.svelte";
  let initialList;
  let poemCurrent = [];
  let innerHeight, scrollY;
  let prob;
  let active;
  let words = [
    {
      ch: 9,
      syllables: 3,
      string: "extensive"
    },
    {
      ch: 10,
      syllables: 3,
      string: "sequential"
    },
    {
      ch: 10,
      syllables: 3,
      string: "contentric"
    },
    {
      ch: 5,
      syllables: 1,
      string: "reach"
    },
    {
      ch: 4,
      syllables: 1,
      string: "grip"
    },
    {
      ch: 4,
      syllables: 1,
      string: "push"
    },
    {
      ch: 6,
      syllables: 2,
      string: "repeat"
    },
    {
      ch: 2,
      syllables: 1,
      string: "we"
    },
    {
      ch: 5,
      syllables: 1,
      string: "climb"
    },
    {
      ch: 5,
      syllables: 1,
      string: "gifts"
    },
    {
      ch: 2,
      syllables: 1,
      string: "of"
    },
    {
      ch: 4,
      syllables: 1,
      string: "grip"
    },
    {
      ch: 5,
      syllables: 1,
      string: "drive"
    },
    {
      ch: 3,
      syllables: 1,
      string: "for"
    },
    {
      ch: 5,
      syllables: 1,
      string: "reach"
    },
    {
      ch: 5,
      syllables: 1,
      string: "still"
    },
    {
      ch: 6,
      syllables: 2,
      string: "forgets"
    },
    {
      ch: 10,
      syllables: 3,
      string: "everything"
    },
    {
      ch: 2,
      syllables: 1,
      string: "is"
    },
    {
      ch: 4,
      syllables: 1,
      string: "math"
    },
    {
      ch: 2,
      syllables: 1,
      string: "is"
    },
    {
      ch: 1,
      syllables: 1,
      string: "a"
    },
    {
      ch: 6,
      syllables: 2,
      string: "ladder"
    }
  ];

  let wordsSequence = [...words];

  const initIntersectionObserver = () => {
    const observerOptions = {};
    const observerCallback = entries => {
      for (const entry of entries) {
        if (entry.isIntersection && entry.target == end) {
          console.log("error");
        }
        if (entry.isIntersecting) {
          console.log("intersect");
          entry.target.classList.remove("target");
          wordsSequence = [...wordsSequence, ...words];
          observer.unobserve(entry.target);
          addTargetClassLastItem(initialList);
          let target = getTargetofWords(initialList);
          observer.observe(target);
        }
      }
    };

    var observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(document.querySelector(".target"));
  };

  const getTargetofWords = list => {
    return list.childNodes[list.childNodes.length - 1];
  };

  const addTargetClassLastItem = list => {
    list.childNodes[list.childNodes.length - 1].classList.add("target");
  };

  const calcLineCh = line => {
    let ch = 0;

    if (line.length) {
      ch = line.reduce((acc, cur) => {
        return acc + cur.ch;
      }, 0);
    }
    return ch;
  };

  const calcLineSyllables = line => {
    let syllables = 0;

    if (line.length) {
      syllables = line.reduce((acc, cur) => {
        return acc + cur.syllables;
      }, 0);
    }
    return syllables;
  };

  const buildLineString = i => {
    let lineCurrent = [];
    let poemCurrent = [];

    for (const word of words) {
      // console.log("***current word string in for loop***", word.string);
      let currentLineCh = calcLineCh(lineCurrent);
      let currentLineSyllables = calcLineSyllables(lineCurrent);

      // console.log("currentLineCh", currentLineCh);
      // console.log("currentLineSyllables", currentLineSyllables);

      if (currentLineSyllables < i) {
        lineCurrent.push(word);
      } else {
        poemCurrent.push(lineCurrent);
        lineCurrent = [];
        lineCurrent.push(word);
      }
      // console.log("- - - - - - - - - ");
    }

    poemCurrent.push(lineCurrent);
    // console.log("poemCurrent from inside function", poemCurrent);
    return poemCurrent;
  };

  onMount(() => {
    // addTargetClassLastItem(initialList);
    // initIntersectionObserver();

    let syllableMap = [3, 5, 8];

    for (const [index, i] of syllableMap.entries()) {
      poemCurrent[index] = buildLineString(i);
    }
    // poemCurrent[0] = buildLineString(2);
    // poemCurrent[1] = buildLineString(3);
    // poemCurrent[2] = buildLineString(5);
    // poemCurrent[3] = buildLineString(13);
  });

  $: prob = (scrollY % innerHeight) / innerHeight;
  $: console.log(prob);
</script>

<style>
  :global(body) {
    background: #e8e9f3;
    color: #272635;
    color: rgb(10, 43, 10);
  }

  .words {
    /* transition: all 0.2s ease; */
  }
  .active {
    /* font-weight: 800; */
    /* font-size: 2rem; */
    transform: scale(2);
  }
</style>

<svelte:window bind:innerHeight bind:scrollY />
<div
  class="leading-loose tracking-widest text-xl font-bold font-mono container
  py-32 text">
  <Wrapper>
    <div bind:this={initialList} class="words mx-auto max-w-screen-lg">
      {#each poemCurrent as poem}
        <div>
          {#each poem as verse, i}
            <div class="py-4 px-2">
              {#each verse as word, i}
                <span class="word bg-orange-100 bg-opacity-25 p-1">
                  <span class:active={Math.random() < prob / 2}>
                    {word.string}
                  </span>
                </span>
                <br />
              {/each}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </Wrapper>
</div>
