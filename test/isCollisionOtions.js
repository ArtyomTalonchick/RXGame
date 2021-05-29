export default [
  [
    "X-axis no move", //name
    [[0, 0], [0, 0]],   //first object: position[]; speed[]
    [[10, 0], [0, 0]],  //second object: position[]; speed[]
    false,               //result
  ],
  [
    "X-axis move in different directions",
    [[0, 0], [0, 0]],
    [[10, 0], [1, 0]],
    false,
  ],
  [
    "X-axis move towards each other",
    [[0, 0], [0, 0]],
    [[10, 0], [-1, 0]],
    true,
  ],
  //
  [
    "X-axis crossing and no move",
    [[0, 0], [0, 0]],
    [[9, 0], [0, 0]],
    false,
  ],
  [
    "X-axis crossing and move in different directions",
    [[0, 0], [0, 0]],
    [[9, 0], [1, 0]],
    false,
  ],
  [
    "X-axis crossing and move towards each other",
    [[0, 0], [0, 0]],
    [[9, 0], [-1, 0]],
    true,
  ],
  //
  [
    "X-axis no touch and no move",
    [[0, 0], [0, 0]],
    [[11, 0], [0, 0]],
    false,
  ],
  [
    "X-axis no touch and move in different directions",
    [[0, 0], [0, 0]],
    [[11, 0], [1, 0]],
    false,
  ],
  [
    "X-axis no touch and move towards each other",
    [[0, 0], [0, 0]],
    [[11, 0], [-1, 0]],
    false,
  ],
    
  [
    "Y-axis no move",
    [[0, 0], [0, 0]],
    [[0, 10], [0, 0]],
    false,
  ],
  [
    "Y-axis move in different directions",
    [[0, 0], [0, 0]],
    [[0, 10], [0, 1]],
    false,
  ],
  [
    "Y-axis move towards each other",
    [[0, 0], [0, 0]],
    [[0, 10], [0, -1]],
    true,
  ],
  //
  [
    "Y-axis crossing and no move",
    [[0, 0], [0, 0]],
    [[0, 9], [0, 0]],
    false,
  ],
  [
    "Y-axis crossing and move in different directions",
    [[0, 0], [0, 0]],
    [[0, 9], [0, 1]],
    false,
  ],
  [
    "Y-axis crossing and move towards each other",
    [[0, 0], [0, 0]],
    [[0, 9], [0, -1]],
    true,
  ],
  //
  [
    "Y-axis no touch and no move",
    [[0, 0], [0, 0]],
    [[0, 11], [0, 0]],
    false,
  ],
  [
    "Y-axis no touch and move in different directions",
    [[0, 0], [0, 0]],
    [[0, 11], [0, 1]],
    false,
  ],
  [
    "Y-axis no touch and move towards each other",
    [[0, 0], [0, 0]],
    [[0, 11], [0, -1]],
    false,
  ],
   
  [
    "XY-axis no move",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2), 5*Math.sqrt(2)], [0, 0]],
    false,
  ],
  [
    "XY-axis move in different directions",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2), 5*Math.sqrt(2)], [0, 1]],
    false,
  ],
  [
    "XY-axis move towards each other",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2), 5*Math.sqrt(2)], [-10, -1]],
    true,
  ],
  //
  [
    "XY-axis crossing and no move",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2) - 1, 5*Math.sqrt(2)], [0, 0]],
    false,
  ],
  [
    "XY-axis crossing and move in different directions",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2), 5*Math.sqrt(2) - 1], [0, 1]],
    false,
  ],
  [
    "XY-axis crossing and move towards each other",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2) - 1, 5*Math.sqrt(2)], [0, -1]],
    true,
  ],
  //
  [
    "XY-axis no touch and no move",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2), 5*Math.sqrt(2) + 1], [0, 0]],
    false,
  ],
  [
    "XY-axis no touch and move in different directions",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2) + 1, 5*Math.sqrt(2)], [0, 1]],
    false,
  ],
  [
    "XY-axis no touch and move towards each other",
    [[0, 0], [0, 0]],
    [[5*Math.sqrt(2) + 1, 5*Math.sqrt(2)], [0, -1]],
    false,
  ],
];