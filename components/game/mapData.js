// Hardcoded town layout, NPC placement/dialogue, and encounter tuning.
//
// Tile legend:
//   T tree (blocked)        G grass (walkable)     F flowers (walkable)
//   P path (walkable)       W tall grass (walkable, rolls encounters)
//   S sign (blocked, readable)                     X fence (blocked)
//   H house footprint (blocked, drawn by the house overlay image)

export const TILE_SIZE = 48; // 16px art at 3x

export const MAP = [
  'TTTTTTTTTTTTTTTT',
  'TGFGGGGGGGHHHHHT',
  'TGGGGXXGGGHHHHHT',
  'TGGGGGGGGGHHHHHT',
  'TGGGGGGGGGHHHHHT',
  'TFGGGGGGGGHHHHHT',
  'TSPPPPPPPPPPPPGT',
  'TWWWWGGGGGGGGGFT',
  'TWWWWGGGGGGGGGGT',
  'TWWWWGGGFGGGGGGT',
  'TTTTTTTTTTTTTTTT',
];

export const ROWS = MAP.length;
export const COLS = MAP[0].length;

export const BLOCKED_TILES = new Set(['T', 'S', 'X', 'H']);

export const PLAYER_START = { row: 6, col: 7, facing: 'down' };

// Chance of a wild encounter for each step onto a W tile.
export const ENCOUNTER_CHANCE = 0.25;

// House overlay image: 80x88 art at 3x, bottom-aligned to the end of row 5.
export const HOUSE = {
  left: 10 * TILE_SIZE,
  top: 6 * TILE_SIZE - 88 * 3,
  width: 80 * 3,
  height: 88 * 3,
};

export const NPCS = [
  {
    id: 'professor',
    name: 'PROF. WADHWA',
    sprite: '/sprites/professor.png',
    row: 3,
    col: 4,
    dialogue: [
      'Ah, a visitor! Welcome to WADHWA TOWN.',
      'The one you seek is VIVAAN — a 4th year Computer Science & Statistics student at UBC, and a Firmware Developer at ASTERA LABS in Vancouver.',
      'He started out in data engineering, but found his calling where software meets hardware — firmware, board bring-up, and the low-level systems that make modern infrastructure work.',
      'When he is not at a keyboard, he is on a Minecraft hardcore grind, flying his DJI Mini 4K, exploring cafés, or cooking.',
      'Rumor has it a wild VIVAAN lurks in the tall grass south-west of town...',
    ],
  },
  {
    id: 'skills',
    name: 'SKILLS TRAINER',
    sprite: '/sprites/knight.png',
    row: 2,
    col: 8,
    dialogue: [
      'A true trainer masters many types!',
      'VIVAAN’s language moves: C, C++, Python, and Bash.',
      'His testing arsenal: Pytest, Google Test, GMock, and Jenkins CI/CD pipelines.',
      'And his systems type: Linux (Ubuntu, RHEL), Yocto / OpenBMC, I2C, and GPIO. Super effective against firmware bugs!',
    ],
  },
  {
    id: 'experience',
    name: 'LAB SCIENTIST',
    sprite: '/sprites/scientist.png',
    row: 5,
    col: 3,
    dialogue: [
      'I keep the records of VIVAAN’s journey. Three gyms conquered so far!',
      'ASTERA LABS (Sept 2025 – now): builds the Cosmos unified SDK in C/C++ across three chip lines, cutting code duplication ~35%. Implemented UALINK SAI APIs pre-silicon with GMock, and helped bring up an AST2700 OpenBMC board.',
      'AVIGILON – MOTOROLA (Jan – Aug 2025): grew firmware validation coverage 20% with Pytest, built a Grafana dashboard watching 10,000+ tests, a network switch emulator that cut manual effort 60%, and wired Mistral 7B into log triage.',
      'UBC CAMPUS PLANNING (Apr – Dec 2024): automated 70% of work processes with Electron and Python, built ETL pipelines, and shipped Tableau dashboards.',
      'The full journal is on the /experience page!',
    ],
  },
  {
    id: 'projects',
    name: 'COOL DUDE',
    sprite: '/sprites/cooldude.png',
    row: 7,
    col: 7,
    dialogue: [
      'Yo! Wanna see what VIVAAN has been building?',
      'MOODFLOW — mood-based activity suggestions with a Mistral LLM, WeatherAPI and Google Maps. React, Express, MongoDB.',
      'WASTE NET — a React Native app fighting food waste with AWS Bedrock RAG recipes.',
      'CODING! TEACH YOURSELF — a dockerized Express + React learning platform with 10+ API endpoints.',
      'Plus NLP research (Dep2Phrase), a CNN face-recognition system, and more. Full roster on the /projects page!',
    ],
  },
  {
    id: 'education',
    name: 'ELDER MONK',
    sprite: '/sprites/monk.png',
    row: 8,
    col: 12,
    dialogue: [
      'Knowledge is the strongest badge of all, young one.',
      'VIVAAN trains at the UNIVERSITY OF BRITISH COLUMBIA — BSc in Computer Science & Statistics, September 2021 to May 2027.',
      'His studies: Algorithms & Data Structures, Applied Machine Learning, Computer Hardware & Operating Systems, and Software Engineering.',
    ],
  },
];

// Readable sign tiles keyed by "row,col".
export const SIGNS = {
  '6,1': {
    name: 'SIGN',
    dialogue: [
      'CAUTION: Tall grass ahead.',
      'Rare sightings of a wild VIVAAN reported in this area. Trainers, ready your ball!',
    ],
  },
};

export const CONTACT_LINKS = [
  { label: 'Email', href: 'mailto:wadhwa.vivaan@outlook.com' },
  { label: 'GitHub', href: 'https://github.com/VivaanWadhwa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/vivaanwadhwa' },
];
