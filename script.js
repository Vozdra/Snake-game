// Creating a field and cells
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 101; i++) {
  let excel = document.createElement('div');
  field.appendChild(excel);
  excel.classList.add('excel');
}
// Set coordinates for each cell
let cells = document.getElementsByClassName('excel');
let x = 1,
    y = 10;

for (let i = 0; i < cells.length; i++) {
  if (x > 10) {
    x = 1;
    y--;
  }
  cells[i].setAttribute('posX', x);
  cells[i].setAttribute('posY', y);
  x++;
}
// Create cat body ("snake")
function generateCatBody () {
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let coords = generateCatBody();
let cellCatHead = document.querySelector('[posX = "'+ coords[0] +'"][posY = "'+ coords[1] +'"]');
let cellCatBody = document.querySelector('[posX = "'+ (coords[0] - 1) +'"][posY = "'+ coords[1] +'"]');
let cellCatTail = document.querySelector('[posX = "'+ (coords[0] - 2) +'"][posY = "'+ coords[1] +'"]');

let wholeCatBody = [
  cellCatHead,
  cellCatBody,
  cellCatTail
];

for (let i = 0; i < wholeCatBody.length; i++) {
  wholeCatBody[i].classList.add('catBody');
}
wholeCatBody[0].classList.add('catHead');

// Create mouse
let cellMouse;

function createMouse() {
  function generateMouse () {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }

  let mouseCoords = generateMouse();
  cellMouse = document.querySelector('[posX = "'+ mouseCoords[0] +'"][posY = "'+ mouseCoords[1] +'"]');

  while (cellMouse.classList.contains('catBody')) {
    let mouseCoords = generateMouse();
    cellMouse = document.querySelector('[posX = "'+ mouseCoords[0] +'"][posY = "'+ mouseCoords[1] +'"]');
  }

  cellMouse.classList.add('mouse');
}

createMouse();

let direction = 'right';
let steps = false;
let score = 0;

let input = document.createElement('input');

document.body.appendChild(input);
input.classList.add('result');
input.value = `Ваши очки: ${score}`;

let WrapBtn = document.createElement('div');
WrapBtn.classList.add('WrapBtn');
document.body.insertBefore(WrapBtn, document.body.firstChild);

let BtnStart = document.createElement('input');
BtnStart.type = 'button';
BtnStart.value = 'Start';
BtnStart.classList.add('BtnStart');
WrapBtn.appendChild(BtnStart);

let BtnEnd = document.createElement('input');
BtnEnd.type = 'button';
BtnEnd.value = 'Stop';
BtnEnd.classList.add('BtnEnd');
WrapBtn.appendChild(BtnEnd);

// Movement cat ("snake")
function move() {
  // Getting the coordinates of the cat's head
  let coordsCatHead = [wholeCatBody[0].getAttribute('posX'), wholeCatBody[0].getAttribute('posY')];
  let newCellCatHead;

  // Remove classes that identify the head and tail of the cat
  wholeCatBody[0].classList.remove('catHead');
  wholeCatBody[wholeCatBody.length-1].classList.remove('catBody');
  wholeCatBody.pop();

  if (direction == 'right') {
    if(coordsCatHead[0] < 10) {
      // Getting a new cell for a cat's head
      newCellCatHead = document.querySelector('[posX = "'+ (+coordsCatHead[0] + 1) +'"][posY = "'+ coordsCatHead[1] +'"]');
    } else {
      newCellCatHead = document.querySelector('[posX = "1"][posY = "'+ coordsCatHead[1] +'"]');
    }
    // //Adding a new first element to an array (new cat head)
    wholeCatBody.unshift(newCellCatHead);

  } else if (direction == 'left') {
      if(coordsCatHead[0] > 1) {
        newCellCatHead = document.querySelector('[posX = "'+ (+coordsCatHead[0] - 1) +'"][posY = "'+ coordsCatHead[1] +'"]');
      } else {
        newCellCatHead = document.querySelector('[posX = "10"][posY = "'+ coordsCatHead[1] +'"]');
      }
      wholeCatBody.unshift(newCellCatHead);

  } else if (direction == 'down') {
    if(coordsCatHead[1] > 1) {
      newCellCatHead = document.querySelector('[posX = "'+ coordsCatHead[0] +'"][posY = "'+ (+coordsCatHead[1] - 1) +'"]');
    } else {
      newCellCatHead = document.querySelector('[posX = "'+ coordsCatHead[0] +'"][posY = "10"]');
    }
    wholeCatBody.unshift(newCellCatHead);
  } else if (direction == 'up') {
    if(coordsCatHead[1] < 10) {
      newCellCatHead = document.querySelector('[posX = "'+ coordsCatHead[0] +'"][posY = "'+ (+coordsCatHead[1] + 1) +'"]');
    } else {
      newCellCatHead = document.querySelector('[posX = "'+ coordsCatHead[0] +'"][posY = "1"]');
    }
    wholeCatBody.unshift(newCellCatHead);
  }

  // Cat eating mouse
  if (coordsCatHead[0] == cellMouse.getAttribute('posX') && coordsCatHead[1] == cellMouse.getAttribute('posY')) {
    cellMouse.classList.remove('mouse');
    let a = wholeCatBody[wholeCatBody.length-1].getAttribute('posX');
    let b = wholeCatBody[wholeCatBody.length-1].getAttribute('posY');
    let newLastElement = document.querySelector('[posX = "'+ a +'"][posY = "'+ b +'"]');
    wholeCatBody.push(newLastElement);
    createMouse();
    score++;
    input.value = `Ваши очки: ${score}`;
  }

  if (wholeCatBody[0].classList.contains('catBody')) {
    setTimeout(() => {
      alert(`Игра окончена! Ваши очки: ${score}`);
      permissionChangeLevel = true;
      setTimeout(() => {
        window.location.reload();
      },0)
    }, 200)
    clearInterval(interval);
    wholeCatBody[0].style.background = "url('evil-tom.jpg') center no-repeat";
    wholeCatBody[0].style.backgroundSize = "cover";
  }

  wholeCatBody[0].classList.add('catHead');
  for (let i = 0; i < wholeCatBody.length; i++) {
    wholeCatBody[i].classList.add('catBody');
  }

  steps = true;
}

let interval,
    level = 300,
    inputLevel,
    WrapInputLevel,
    permissionChangeLevel = true;

WrapInputLevel = document.createElement('div');
WrapInputLevel.classList.add('wrapLevel');
document.body.insertBefore(WrapInputLevel, document.body.firstChild);

for (let i = 1; i < 4; i++) {
  inputLevel = document.createElement('input');
  inputLevel.type = 'button';
  inputLevel.value = `Уровень ${i}`;
  inputLevel.setAttribute('level', i);
  inputLevel.classList.add('level');
  WrapInputLevel.appendChild(inputLevel);
}

let wrapLevel = document.getElementsByClassName('wrapLevel');

  wrapLevel[0].addEventListener('click', function(e) {
    let elem = e.target;
    let lvl = 300/(elem.getAttribute('level'));

    if (permissionChangeLevel) {
      level = lvl;
      for (let i = 0; i < wrapLevel[0].children.length; i++) {
        if(wrapLevel[0].children[i] != elem) {
          wrapLevel[0].children[i].classList.remove('selected');
        }
      }
      elem.classList.add('selected');

    } else {
      console.log("You cannot change the level if the game has already begun.");
    }
  })

  function gameLaunch() {
    interval = setInterval(move, level);
    permissionChangeLevel = false;
  }

  function gameStop() {
    clearInterval(interval);
    setTimeout(() => {
        window.location.reload();
    },0)
  }

BtnStart.addEventListener('click', gameLaunch);
BtnEnd.addEventListener('click', gameStop);

window.addEventListener('keydown', function(e) {
  if (steps == true) {
    if (e.keyCode == 37 && direction != 'right') {
      direction = 'left';
      steps = false;
    }
    if (e.keyCode == 38 && direction != 'down') {
      direction = 'up';
      steps = false;
    }
    if (e.keyCode == 39 && direction != 'left') {
      direction = 'right';
      steps = false;
    }
    if (e.keyCode == 40 && direction != 'up') {
      direction = 'down';
      steps = false;
    }
  }
})