document.addEventListener('DOMContentLoaded', function() {
  const gridSizeInput = document.querySelector('#grid-size');
  const gridSizeText = document.querySelector('#grid-size-value');
  const canvasContainer = document.querySelector('#canvas-container');
  const resetBtn = document.querySelector('#resetBtn');
  const blackBtn = document.querySelector('#blackBtn');
  const rainbowBtn = document.querySelector('#rainbowBtn');

  let isBlack = true;
  let isRainbow = false;
  let mousePressed = false;

  function updateGridSizeText(value) {
    gridSizeText.textContent = `${value}x${value}`;
  }

  function updateCanvas(value) {
    const totalDivs = value * value;
    canvasContainer.innerHTML = '';

    for (let i = 0; i < totalDivs; i++) {
      const div = document.createElement('div');
      div.classList.add('defaultChild');
      div.style.width = `calc(100% / ${value})`;
      div.style.height = div.style.width;
      div.style.backgroundColor = 'rgb(255, 255, 255)';  // Set initial background color
      canvasContainer.appendChild(div);
    }

    // Add event listeners to new divs
    addDivListeners();
  }

  function addDivListeners() {
    const canvasDivs = canvasContainer.querySelectorAll('div');
    canvasDivs.forEach((div) => {
      div.addEventListener('mouseenter', () => {
        if (mousePressed) {
          color(div);
        }
      });
      div.addEventListener('mousedown', () => {
        color(div);
      });
    });
  }

  function color(div) {
    if (isBlack) {
      if (div.style.backgroundColor === 'rgb(255, 255, 255)') {
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      } else {
        let opacity = parseFloat(div.style.backgroundColor.split(',')[3]);
        opacity = opacity + 0.2 > 1 ? 1 : opacity + 0.2;
        div.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      }
    } else if (isRainbow) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      div.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  }

  updateGridSizeText(gridSizeInput.value);
  updateCanvas(gridSizeInput.value);

  gridSizeInput.addEventListener('input', function() {
    updateGridSizeText(this.value);
    updateCanvas(this.value);
  });

  resetBtn.addEventListener('click', () => {
    updateCanvas(gridSizeInput.value);
  });

  blackBtn.addEventListener('click', () => {
    isBlack = true;
    isRainbow = false;
  });

  rainbowBtn.addEventListener('click', () => {
    isRainbow = true;
    isBlack = false;
  });

  document.addEventListener('mousedown', () => {
    mousePressed = true;
  });

  document.addEventListener('mouseup', () => {
    mousePressed = false;
  });

  // Prevent default drag behavior
  canvasContainer.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
});