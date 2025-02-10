export const rooms = [
  {
    id: 'foyer',
    name: 'Grand Foyer',
    description: 'The opulent entrance to Greystone Manor. Crystal chandeliers cast eerie shadows on marble floors.',
    x: '50%',
    y: '75%',
    connections: ['library', 'ballroom', 'dining_room']
  },
  {
    id: 'library',
    name: 'Library',
    description: 'Walls of ancient books and a lingering scent of pipe tobacco. Mr. Black was found here.',
    x: '28%',
    y: '35%',
    connections: ['study', 'foyer']
  },
  {
    id: 'dining_room',
    name: 'Dining Room',
    description: 'An elaborate feast lies untouched. Wine glasses bear traces of the last supper.',
    x: '65%',
    y: '30%',
    connections: ['kitchen', 'foyer', 'ballroom', 'study']
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Steam still rises from pots. A knife is conspicuously missing from the block.',
    x: '85%',
    y: '35%',
    connections: ['dining_room', 'servants_quarters']
  },
  {
    id: 'study',
    name: 'Study',
    description: 'Papers scattered everywhere. The safe stands open and empty.',
    x: '65%',
    y: '20%',
    connections: ['library', 'dining_room']
  },
  {
    id: 'ballroom',
    name: 'Ballroom',
    description: 'Dusty mirrors reflect moonlight. Footprints cross the polished floor.',
    x: '55%',
    y: '45%',
    connections: ['dining_room', 'foyer', 'conservatory']
  },
  {
    id: 'conservatory',
    name: 'Conservatory',
    description: 'Exotic plants loom in darkness. A broken window lets in the cold night air.',
    x: '40%',
    y: '55%',
    connections: ['study', 'ballroom']
  },
  {
    id: 'servants_quarters',
    name: 'Servants\' Quarters',
    description: 'Simple quarters with complex secrets. Someone left in a hurry.',
    x: '80%',
    y: '25%',
    connections: ['kitchen']
  }
];

export const mapFeatures = {
  walls: [
    { x1: '20%', y1: '15%', x2: '80%', y2: '15%' },
    { x1: '20%', y1: '15%', x2: '20%', y2: '85%' },
    { x1: '80%', y1: '15%', x2: '80%', y2: '85%' },
    { x1: '20%', y1: '85%', x2: '80%', y2: '85%' }
  ],
  doors: [
    { x: '50%', y: '85%', rotation: '0deg' },
    { x: '35%', y: '40%', rotation: '90deg' },
    { x: '65%', y: '45%', rotation: '90deg' }
  ]
};
