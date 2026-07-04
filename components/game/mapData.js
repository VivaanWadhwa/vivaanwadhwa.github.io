// Hardcoded town layout, NPC placement/dialogue, and encounter tuning.
//
// Tile legend:
//   T tree (blocked)        G grass (walkable)     F flowers (walkable)
//   P path (walkable)       W tall grass (walkable, rolls encounters)
//   S sign (blocked, readable)                     X fence (blocked)
//   H house footprint (blocked, drawn by the house overlay image)
//   B bush (blocked)        R rock (blocked)       L lake (blocked)

export const TILE_SIZE = 64; // 16px art at 4x

export const MAP = [
  'TTBTTTRTTTBBTTTRTTTTBBRTTTTBTTTT',
  'TGGGGGGGGGGGGGGGGBBGGGGGGGLLLRTT',
  'BGGFGGGXXGGGGGGGGGHHHHHLLLLLLTTT',
  'TGGGGGGGGGGPPPPPPGHHHHHGGLLLBTTT',
  'TGGGGGGGGGPPGGGGGGHHHHHGGLLLTTTT',
  'TGGGGBGGPPPGGFFGGGHHHHHGGGGGRTTT',
  'RFGGGGGPPGGGGGGGGGHHHHHGBGGGTTTT',
  'TGGGGPPPGGGGGGGGGGHHHHHGGGGGBTTT',
  'TGSPPPPPPPPPPPPPPPPPGGGGGFGGTTTT',
  'TGWWWWGGGGGGGGGPPPGGGGGGGGGGTTTT',
  'BGWHHHHHHGGFGGGPGGGGGGXXXGGRRTTT',
  'TGGHHHHHHGGGGGPPGGGFGGGGGGGTTTTT',
  'TGGHHHHHHGBGGPPGGGGGGGGRGGGTTTTT',
  'TGGHHHHHHGGPPPGGGGGGGGGGGGGBTTTT',
  'TTGHHHHHHPPGGGGGBGGGWWWWGGGRTTTT',
  'TBGHHHHHHPGGGRGGGGGGWWWWWWGTTTTT',
  'TTBGGPPPPPGGGGGGGGGGGWWWWGGRRTTT',
  'TTTBTRTTTBBTTTTBTTTRTTTBBTTTTTTT',
];

export const ROWS = MAP.length;
export const COLS = MAP[0].length;

export const BLOCKED_TILES = new Set(['T', 'S', 'X', 'H', 'B', 'R', 'L']);

export const PLAYER_START = { row: 8, col: 14, facing: 'down' };

// A wild encounter triggers after a random number of tall-grass steps (1-4).
export const rollEncounterThreshold = () => Math.floor(Math.random() * 4) + 1;

// House overlay image: 80x88 art at 4x, bottom-aligned to the end of row 5.
export const HOUSE = {
  id: 'main-house',
  left: 18 * TILE_SIZE,
  top: 8 * TILE_SIZE - 88 * 4,
  width: 80 * 4,
  height: 88 * 4,
};

export const BUILDINGS = [
  HOUSE,
  {
    id: 'southwest-lodge',
    left: 3 * TILE_SIZE,
    top: 16 * TILE_SIZE - 88 * 4,
    width: 80 * 4,
    height: 88 * 4,
  },
];

export const NPCS = [
  {
    id: 'professor',
    name: 'PROF. WADHWA',
    sprite: '/sprites/professor.png',
    row: 5,
    col: 8,
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
    row: 4,
    col: 14,
    patrol: { axis: 'col', min: 12, max: 16, intervalMs: 900 },
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
    row: 7,
    col: 9,
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
    row: 10,
    col: 15,
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
    row: 12,
    col: 22,
    dialogue: [
      'Knowledge is the strongest badge of all, young one.',
      'VIVAAN trains at the UNIVERSITY OF BRITISH COLUMBIA — BSc in Computer Science & Statistics, September 2021 to May 2027.',
      'His studies: Algorithms & Data Structures, Applied Machine Learning, Computer Hardware & Operating Systems, and Software Engineering.',
    ],
  },
  {
    id: 'town-guide',
    role: 'guide',
    name: 'TOWN GUIDE',
    sprite: '/sprites/adventurer.png',
    row: 8,
    col: 6,
    dialogue: [
      'New in town? The important folks all know a piece of VIVAAN’s story.',
      'PROF. WADHWA has the big overview, and the patrolling knight up north talks about skills.',
    ],
  },
  {
    id: 'career-guide',
    role: 'guide',
    name: 'ROUTE GUIDE',
    sprite: '/sprites/adventurer.png',
    row: 13,
    col: 12,
    dialogue: [
      'If you are tracking VIVAAN’s work history, find the LAB SCIENTIST near the west path.',
      'For side quests and builds, COOL DUDE hangs around the south trail.',
    ],
  },
  {
    id: 'lake-guide',
    role: 'guide',
    name: 'LAKE WATCHER',
    sprite: '/sprites/adventurer.png',
    row: 9,
    col: 25,
    dialogue: [
      'The ELDER MONK by the eastern grove knows about VIVAAN’s studies at UBC.',
      'And if you brave the tall grass, you might even run into VIVAAN himself.',
    ],
  },
];

// Readable sign tiles keyed by "row,col".
export const SIGNS = {
  '8,2': {
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
