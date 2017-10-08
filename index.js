// First we import regl and call the constructor
const container = document.getElementById('container');
console.log(container);
var regl = require('regl')(container);

// Next, we create a new command.
//
// To do this, we call the main regl function and pass it an object giving a
// description of the rendering command and its properties:
//
var drawDolphin = regl({
  //
  // First we define a vertex shader.  This is a program which tells the GPU
  // where to draw the vertices.
  //
  vert: `
  precision mediump float;
  uniform vec2 translate, scale;
  uniform float tick;
  attribute vec2 position;
  attribute vec3 color;
  varying vec3 fcolor;
  void main () {
    fcolor = color;
    gl_Position = vec4(scale * position + translate, 0, 1);
  }
  `,

  //
  // Next, we define a fragment shader to tell the GPU what color to draw.
  //
  frag: `
  precision mediump float;
  varying vec3 fcolor;
  void main () {
    gl_FragColor = vec4(fcolor, 1);
  }
  `,

  // Finally we need to give the vertices to the GPU
  attributes: {
    position: [
      [1, 0],
      [0, 1],
      [-1, -1]
    ],

    color: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]

  },

  uniforms: {
    translate: ({tick}) => [ Math.cos(0.001 * tick), Math.sin(0.003 * tick) ],
    scale: ({tick}, {scale}) => [ 0.3 * Math.cos(0.008 * tick) + scale, scale ]
  },

  // And also tell it how many vertices to draw
  count: 3
})

// Now that our command is defined, we hook a callback to draw it each frame:
regl.frame(function () {
  // First we clear the color and depth buffers like before
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  })

  // Then we call the command that we just defined
  drawDolphin({
    htail: +document.querySelector('#htail-input').value,
    scale: 1
  })
})
