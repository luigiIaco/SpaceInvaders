const CELL_ROW=15;
const CELL_TOT=CELL_ROW*CELL_ROW;
var GRID=[];
const ALIEN_ROW=3;
const ALIEN_COL=9;
const ALIEN_SCORE=100;
var SHIP_AREA=[];
var SHIP_POS=0;
var cont=1;
var conta=0;
var conta_uno=0;
var numero=0;
var ALIENS=[];
var ALIEN_DIR='DX';
var scatolo=[];
var p=0;
var array=[];
var ALIENS_DUE=[];
var lista=[];
var timer=0;
var termo=1;
var SCORE=0;
var contatore=0;
var int;
let ALIEN_TIMER;



function init() {
  
  game_init();
  game_start();
  document.addEventListener('keydown',KeyPress);
  alien_init();
  setAttDestra();
  setAttributo();
  setclass();
  ALIEN_TIMER=setInterval(alien_move,200);

  
  
 
}


function game_init() {
let board=document.getElementById("game_area");
for(let i=0;i<CELL_TOT;i++) {
let div=document.createElement('DIV');
div.setAttribute('_pos',i);
board.appendChild(div);
GRID.push(div);

}
for(let i=CELL_TOT-CELL_ROW;i<CELL_TOT;i++){
  SHIP_AREA.push(GRID[i]);

}

}
function setclass() {
    GRID[211].classList.add('over');
  
}

function setAttributo() {
  GRID[0].setAttribute('border','SX');  
    GRID[15].setAttribute('border','SX');  
    GRID[30].setAttribute('border','SX');  
    GRID[45].setAttribute('border','SX');  
    GRID[60].setAttribute('border','SX');  
    GRID[75].setAttribute('border','SX');  
    GRID[90].setAttribute('border','SX');  
    GRID[105].setAttribute('border','SX');  
    GRID[120].setAttribute('border','SX');  
    GRID[135].setAttribute('border','SX');  
    GRID[150].setAttribute('border','SX');  
    GRID[165].setAttribute('border','SX');  
    GRID[180].setAttribute('border','SX');  
    GRID[195].setAttribute('border','SX');   
    GRID[210].setAttribute('border','SX');   
  }

  function setAttDestra () {
    GRID[14].setAttribute('border','DX');  
    GRID[29].setAttribute('border','DX');  
    GRID[44].setAttribute('border','DX');  
    GRID[59].setAttribute('border','DX');  
    GRID[74].setAttribute('border','DX');  
    GRID[89].setAttribute('border','DX');  
    GRID[104].setAttribute('border','DX');  
    GRID[119].setAttribute('border','DX');  
    GRID[134].setAttribute('border','DX');  
    GRID[149].setAttribute('border','DX');  
    GRID[164].setAttribute('border','DX');  
    GRID[179].setAttribute('border','DX');  
    GRID[194].setAttribute('border','DX');  
    GRID[209].setAttribute('border','DX');  
    }
      
  
function game_start () {
ship_init();
}

function ship_init() {
SHIP_POS=Math.round(SHIP_AREA.length/2)-1;
SHIP_AREA[SHIP_POS].classList.add('ship');
}


function KeyPress (event) {
  
var key=event.which;
switch(key) {
case 37:
  ship_move('LEFT');
  break;
  case 39:
    ship_move('RIGHT');
    break;
    case 32:
      ship_laser(); 
      break;
}
}

function ship_clear () {
SHIP_AREA[SHIP_POS].classList.remove('ship');
}
function ship_add () {
  SHIP_AREA[SHIP_POS].classList.add('ship');
  }

  function ship_move (mode) {
  switch(mode) {
  case 'LEFT':
    if (SHIP_POS==0) 
    return true;
    ship_clear();
    SHIP_POS--;
    ship_add ();
    
    
    break;
    
    
    
    case 'RIGHT':
      if(SHIP_POS==SHIP_AREA.length-1) 
      return true;
      ship_clear();
      SHIP_POS++;
      ship_add();
      break;
      
      
  }
  }
  function moveRight() {
    let app=[];
    for(let i=0;i<ALIENS.length;i++) {
      let pos=parseInt(ALIENS[i].getAttribute('_pos'));
      app.push(GRID[pos+1]);
      ALIENS[i].classList.remove('alien');
      ALIENS[i].removeAttribute('id');
    }  
  alien_dispose(app);
    
  }

  function moveLeft () {
    let app=[];
    for(let i=0;i<ALIENS.length;i++) {
      let pos=parseInt(ALIENS[i].getAttribute('_pos'));
      app.push(GRID[pos-1]);
      ALIENS[i].classList.remove('alien');
      ALIENS[i].removeAttribute('id');
    }
    alien_dispose(app);
  }

  function moveDown () {
    let app=[];
    for(let i=0;i<ALIENS.length;i++) {
      let pos=parseInt(ALIENS[i].getAttribute('_pos'),10);
      app.push(GRID[pos+CELL_ROW]);
      ALIENS[i].classList.remove('alien');
      ALIENS[i].removeAttribute('id');
  }
  alien_dispose(app);
  if(ALIEN_DIR=='DX') {
    ALIEN_DIR='SX'
  } 
  else {
    ALIEN_DIR='DX';
  }
}

  function alien_dispose(vett) { 
    ALIENS=[];
    ALIENS=vett;
    for(let v=0;v<ALIENS.length;v++) {
      if(ALIENS[v].classList.contains('over')) {
        clearInterval(ALIEN_TIMER);
        alert('GAMEOVER');
      }
      
    }
    for(let i=0;i<ALIENS.length;i++){
      ALIENS[i].classList.add('alien');
      ALIENS[i].setAttribute('id',i);
    }
   
    
    for(let j=0;j<lista.length;j++){ 
    ALIENS[lista[j]].classList.remove('alien');
    }
    
    
  
  
  }
    
  
  



  function alien_move() {
    switch (ALIEN_DIR) {
      case 'DX':
        for(let i=0;i<ALIENS.length;i++) {
          if(ALIENS[i].getAttribute('border')=='DX' && ALIENS[i].classList.contains('alien')) {
            return moveDown();
          }
        }
        moveRight();
        break;
        case 'SX':
          for(let i=0;i<ALIENS.length;i++) {
            if(ALIENS[i].getAttribute('border')=='SX' && ALIENS[i].classList.contains('alien')) {
              return moveDown();
            }
          }
          moveLeft();
    }
  }
  
  function alien_init () {
  let offset=Math.round((CELL_ROW-ALIEN_COL)/2);
  for(let i=0;i<ALIEN_ROW;i++) {
  let pos_start=(i*CELL_ROW)+offset;
  for(let j=pos_start; j<pos_start+ALIEN_COL;j++) {
  GRID[j].classList.add('alien');
  ALIENS.push(GRID[j]);   
  }
  }
  for(let a=0; a<ALIENS.length;a++) {
    ALIENS[a].setAttribute('id',a);
  }
  
  }





  

  

  function ship_laser () {
  let laser_pos=CELL_TOT-(CELL_ROW*2)+SHIP_POS;
  var old_pos=1;
  var laser_time=false;

 function laser_move () {
  if(GRID[old_pos].classList.length!=0) {
    GRID[old_pos].classList.remove('fuoco');
  }
  
  if(GRID[laser_pos].classList.length==0) {
    GRID[laser_pos].classList.add('fuoco');
    old_pos=laser_pos;
    laser_pos-=CELL_ROW;
    }
    else { 
      if(GRID[laser_pos].classList.contains('alien')) { 
        
        alien_boom(laser_pos);
        clearInterval(laser_time);
        
      
      }
  
      }
    
   }
   
   
   laser_time=setInterval(laser_move,200); 
  }
  function alien_boom(pos) {
    if(!GRID[pos].classList.contains("alien")) 
    {return true;}
    else {
  GRID[pos].classList.remove('alien');
  GRID[pos].classList.add("kaboom");
  setTimeout(function() {
  GRID[pos].classList.remove('kaboom');
  },300);
  var posizione=GRID[pos].getAttribute('id');
  var conv=parseInt(posizione);
    lista.push(conv); 
    conta++;
    conta_uno++;
}
if(conta==27) {
  ALIEN_DIR='DX';
  lista=[];
  ALIENS=[];
  let offset=Math.round((CELL_ROW-ALIEN_COL)/2);
for(let i=0;i<4;i++) {
let pos_start=(i*CELL_ROW)+offset;
for(let j=pos_start; j<pos_start+ALIEN_COL;j++) {
GRID[j].classList.add('alien');
ALIENS.push(GRID[j]);   
}
}
for(let a=0; a<ALIENS.length;a++) {
  ALIENS[a].setAttribute('id',a);
}
cont++;
document.getElementById("spLevel").innerHTML=cont;
setInterval(alien_move,800);
}
if(conta_uno==63) {
ALIEN_DIR='DX';
lista=[];
ALIENS=[];
let offset=Math.round((CELL_ROW-ALIEN_COL)/2);
for(let i=0;i<5;i++) {
let pos_start=(i*CELL_ROW)+offset;
for(let j=pos_start; j<pos_start+ALIEN_COL;j++) {
GRID[j].classList.add('alien');
ALIENS.push(GRID[j]);   
}
}
for(let a=0; a<ALIENS.length;a++) {
ALIENS[a].setAttribute('id',a);
}
cont++;
document.getElementById("spLevel").innerHTML=cont;
setInterval(alien_move,2000);
}
let line=Math.floor(pos/CELL_ROW);
let plus=(CELL_ROW-line)/100;
SCORE+=ALIEN_SCORE+(ALIEN_SCORE*plus);
document.getElementById("spScore").innerHTML=SCORE;
}