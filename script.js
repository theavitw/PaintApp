const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const reset_btn = document.getElementById('reset');
const txt = document.getElementById('txt');
let isDraw = false;
let circles = [];

canvas.addEventListener('mousedown', (e) => {
  isDraw = true;
  const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  const X = e.clientX - canvas.getBoundingClientRect().left;
  const Y = e.clientY - canvas.getBoundingClientRect().top;

  circles.push({
    x: X,
    y: Y,
    color,
    radius: 0
  });
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDraw) return;
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  if (circles.length > 0) {
    const currentCircle = circles[circles.length - 1];
    currentCircle.radius = Math.sqrt(Math.pow(mouseX - currentCircle.x, 2) + Math.pow(mouseY - currentCircle.y, 2));
  }
  draw();
});

canvas.addEventListener('mouseup', () => {
  isDraw = false;
});

reset_btn.addEventListener('click', () => {
  circles = [];
  reset();
});

canvas.addEventListener('click', (e) => {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;
  
  const isHit = check_click(mouseX, mouseY);
  txt.textContent = isHit;
});

canvas.addEventListener('dblclick', (e) => {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;
  delete_cir(mouseX, mouseY);
});

function draw() {
  reset();
  circles.forEach(circle => {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    context.fillStyle = circle.color;
    context.fill();
    context.closePath();
  });
}

function reset() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function check_click(x, y) {
  let result = 'miss';
  for (let i = 0; i < circles.length - 1; i++) {
    const circle = circles[i];
    const distancefromX = x - circle.x;
    const distancefromY = y - circle.y;
    const distance = Math.sqrt(distancefromX * distancefromX + distancefromY * distancefromY); // <-- Used Math For Finding Distance
    
    if (distance <= circle.radius) {
      result = 'hit';
      break;
    }
  }
  return result;
}


function delete_cir(x, y) {
  circles = circles.filter(circle => {
    const distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
    return !(distance <= circle.radius);
  });
  draw();
}
