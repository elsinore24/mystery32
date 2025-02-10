<script>
  import { onMount } from 'svelte';

  let tapeWidth;
  let tapeHeight;
  let tapeColor = '#FFF200';
  let textColor = '#000000';

  onMount(() => {
    const updateSize = () => {
      tapeWidth = window.innerWidth;
      tapeHeight = Math.min(80, window.innerHeight * 0.1);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  });
</script>

<div class="crime-scene-tape">
  <svg width={tapeWidth} height={tapeHeight}>
    <defs>
      <filter id="noise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="worn">
        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="turbulence"/>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8"/>
      </filter>
      <mask id="tatterMask">
        <rect width="100%" height="100%" fill="white"/>
        <g filter="url(#worn)">
          {#each Array(12) as _, i}
            <circle 
              cx={Math.random() * 100 + '%'} 
              cy={Math.random() * 100 + '%'} 
              r={Math.random() * 3 + 2} 
              fill="black" 
            />
          {/each}
        </g>
      </mask>
    </defs>
    
    <!-- Curled edge shadow -->
    <path 
      d={`M0 ${tapeHeight} 
          C ${tapeWidth * 0.2} ${tapeHeight * 1.1} 
            ${tapeWidth * 0.8} ${tapeHeight * 0.9} 
            ${tapeWidth} ${tapeHeight}`}
      fill="rgba(0,0,0,0.2)"
    />
    
    <!-- Base tape with tatter effect -->
    <g mask="url(#tatterMask)" class="tape-body">
      <rect width={tapeWidth} height={tapeHeight} fill={tapeColor} filter="url(#noise)"/>
      <!-- Worn edges -->
      <path 
        d={`M0 0 L${tapeWidth} 0 L${tapeWidth} ${tapeHeight} L0 ${tapeHeight}Z`} 
        fill="none" 
        stroke="rgba(0,0,0,0.2)" 
        stroke-width="1.5" 
        stroke-dasharray="3 2"
        filter="url(#worn)"
      />
    </g>

    <!-- Text with reduced distress effect -->
    <g class="tape-text-container">
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill={textColor} 
        font-size="28" 
        font-weight="bold" 
        class="tape-text"
        stroke={textColor}
        stroke-width="0.3"
      >
        CRIME SCENE - DO NOT CROSS
      </text>
    </g>
  </svg>
</div>

<style>
  .crime-scene-tape {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(-5deg);
    z-index: 30;
    width: 100%;
    overflow: hidden;
    opacity: 0.95;
  }

  .tape-body {
    transform-origin: center bottom;
    animation: curl 8s ease-in-out infinite;
  }

  .tape-text-container {
    animation: waver 6s ease-in-out infinite;
  }

  .tape-text {
    font-family: 'Impact', sans-serif;
    letter-spacing: 3px;
  }

  @keyframes waver {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-1px) rotate(1deg); }
  }

  @keyframes curl {
    0%, 100% { transform: perspective(400px) rotateX(0deg); }
    50% { transform: perspective(400px) rotateX(3deg); }
  }

  @media (max-width: 768px) {
    .tape-text {
      font-size: 20px;
    }
  }
</style>
