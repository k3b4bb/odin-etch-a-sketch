document.addEventListener('DOMContentLoaded', function() {
  const gridSizeInput = document.querySelector('#grid-size');
  const gridSizeText = document.querySelector('#grid-size-value');
  const canvasContainer = document.querySelector('#canvas-container')
  // Función para actualizar el texto
  function updateGridSizeText(value) {
    gridSizeText.textContent = `${value}x${value}`;
  };

  function updateCanvas(value) {
    const totalDivs = value * value
    canvasContainer.innerHTML = ''

    for (let i = 0; i < totalDivs; i++) {
      const div = document.createElement('div');
      div.classList.add('defaultChild')
      div.style.width = `calc(100% / ${value})`; 
      div.style.height = div.style.width;
      canvasContainer.appendChild(div)
    };
  };

  // Establecer el texto inicial correctamente
  updateGridSizeText(gridSizeInput.value);

  //Establecer el canvas
  updateCanvas(gridSizeInput.value)

  // Agregar el controlador de eventos
  gridSizeInput.addEventListener('input', function() {
    updateGridSizeText(this.value);
    updateCanvas(this.value);
  });
});

let canvasContainer = document.querySelector("#canvas-container")
