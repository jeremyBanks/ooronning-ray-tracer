'use strict';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.getElementById('target').appendChild(canvas);

const context = canvas.getContext('2d');
context.fillStyle = 'red';
context.fillRect(10, 10, 480, 480);
