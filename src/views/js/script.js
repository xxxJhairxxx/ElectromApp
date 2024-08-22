/** @format */

window.addEventListener('load', function () {
    console.log('La página ha sido cargada completamente.');

    const movible = document.getElementById('movible');
    let offsetX, offsetY;


    movible.addEventListener('mousedown', function(e) {
        offsetX = e.clientX - movible.getBoundingClientRect().left;
        offsetY = e.clientY - movible.getBoundingClientRect().top;
        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopMoving);
        movible.style.cursor = 'grabbing';
    });

    function moveElement(e) {
        movible.style.left = e.clientX - offsetX + 'px';
        movible.style.top = e.clientY - offsetY + 'px';
    }

    function stopMoving() {
        document.removeEventListener('mousemove', moveElement);
        document.removeEventListener('mouseup', stopMoving);
        movible.style.cursor = 'grab';
    }

      
  }, false);
