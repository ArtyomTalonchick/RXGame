export default [
    [
      "X-axis and move in different directions", //name
      [[0, 0], [0, 0]],       //first object: position[]; speed[]; options{}
      [[10, 0], [1, 0]],      //second object: position[]; speed[]
      [[0, 0], [1, 0]],       //result speed
    ],
    [
      "X-axis and move towards each other",
      [[0, 0], [0, 0]],
      [[10, 0], [-1, 0]],
      [[-1, 0], [0, 0]],
    ],
    [
      "X-axis and move towards each other (with different weight)",
      [[0, 0], [1, 0], { weight: 2 }],
      [[10, 0], [-1, 0], { weight: 1 }],
      [[-1/3, 0], [5/3, 0]],
    ],
    [
      "X-axis and move towards each other (with different speed)",
      [[0, 0], [2, 0]],
      [[10, 0], [-1, 0]],
      [[-1, 0], [2, 0]],
    ],
    [
      "X-axis and the first catches up with the second (with different speed)",
      [[0, 0], [2, 0]],
      [[10, 0], [1, 0]],
      [[1, 0], [2, 0]],
    ],
    // by y
    [
      "Y-axis and move in different directions",
      [[0, 0], [0, 0]],
      [[0, 10], [0, 1]],
      [[0, 0], [0, 1]],
    ],
    [
      "Y-axis and move towards each other",
      [[0, 0], [0, 0]],
      [[0, 10], [0, -1]],
      [[0, -1], [0, 0]],
    ],
    [
      "Y-axis and move towards each other (with different weight)",
      [[0, 0], [0, 1], { weight: 2 }],
      [[0, 10], [0, -1], { weight: 1 }],
      [[0, -1/3], [0, 5/3]],
    ],
    [
      "Y-axis and move towards each other (with different speed)",
      [[0, 0], [0, 2]],
      [[0, 10], [0, -1]],
      [[0, -1], [0, 2]],
    ],
    [
      "Y-axis and the first catches up with the second (with different speed)",
      [[0, 0], [2, 0]],
      [[10, 0], [1, 0]],
      [[1, 0], [2, 0]],
    ],
    // defferent speed
    [
      "XY-axis and move in different directions (only the second moves)",
      [[0, 0], [0, 0]],
      [[5, 5], [0, 1]],
      [[0, 0], [0, 1]],
    ],
    [
      "XY-axis and move towards each other (only the second moves)",
      [[0, 0], [0, 0]],
      [[5, 5], [0, -1]],
      [[-.5, -.5], [.5, -.5]],
    ],
    [
      "XY-axis and move towards each other (with different weight) (only the second moves)",
      [[0, 0], [0, 1], { weight: 2 }],
      [[5, 5], [0, -1], { weight: 1 }],
      [[-2/3, 1/3], [4/3, 1/3]],
    ],
    // defferent speed2
    [
      "XY-axis and move in different directions (both move)",
      [[0, 0], [1, 0]],
      [[5, 5], [0, 1]],
      [[1, 0], [0, 1]],
    ],
    [
      "XY-axis and move towards each other (both move)",
      [[0, 0], [1, 0]],
      [[5, 5], [0, -1]],
      [[0, -1], [1, 0]],
    ],
    [
      "XY-axis and move towards each other (with different weight) (both move)",
      [[0, 0], [1, 1], { weight: 2 }],
      [[5, 5], [0, -1], { weight: 1 }],
      [[0, 0], [2, 1]],
    ],
    // defferent position
    [
      "angle of 50 to 60 degrees",
      [[0, 0], [1, 0]],
      [[5, 4], [0, 1]],
      [[0.87804878, -0.09756098], [0.12195122, 1.09756098]],
    ],
    [
      "angle of 60 to 70 degrees",
      [[0, 0], [1, 0]],
      [[5, 3], [0, 1]],
      [[0.70588235, -0.17647059], [0.29411765, 1.17647059]],
    ],
    [
      "angle of 70 to 80 degrees",
      [[0, 0], [1, 0]],
      [[5, 2], [0, 1]],
      [[0.48275862, -0.20689655], [0.51724138, 1.20689655]],
    ],
    [
      "angle of 80 to 90 degrees",
      [[0, 0], [1, 0]],
      [[5, 1], [0, 1]],
      [[0.23076923, -0.15384615], [0.76923077, 1.15384615]],
    ],
   
  ];