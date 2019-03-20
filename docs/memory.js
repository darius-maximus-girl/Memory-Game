
const imgs = ['100/000000/smurf.png',
'96/000000/cookie-monster.png', 
'96/000000/chewbacca.png', 
'96/000000/avatar.png', 
'100/000000/smurf.png', 
'96/000000/cookie-monster.png', 
'96/000000/chewbacca.png', 
'96/000000/avatar.png'];

let boardIsLocked = false;
let cardFlipped = false;
let cardOne, cardTwo;
let counter = 0;

$(document).ready(function() {

shuffle();

//ADD IMG SRC TO THE CARDS
function shuffle() {
  const imgsCopy = imgs.slice();
  $('img').each((i, item) => {
     $(item).attr('src', () => {
         const src = imgsCopy.splice(Math.floor(Math.random() * imgsCopy.length), 1);
         return 'https://img.icons8.com/color/' + src
     });  
 });
};

//FLIP THE CARD AND CHECK THE MATCH
const flipCard = (e) => {
  if (boardIsLocked) return;
  if ($(e.currentTarget) === cardOne) return;
  $(e.currentTarget).addClass('flip disabled');
  if (!cardFlipped) {
      cardFlipped = true;
      cardOne = $(e.currentTarget);
      return; 
  }

  cardTwo = $(e.currentTarget);
  checkIfMatch();
}

// 'CHECK THE MATCH' FUNCTION
const checkIfMatch = () => {
  let match = $(cardOne).find('img').attr('src') === $(cardTwo).find('img').attr('src');
  match && cardTwo !== cardOne ? hideCards() : unflip();
}

// 'HIDE CARDS' FUNCTION CALLED WHEN CARDS ARE MATCHED
const hideCards = () => {
  counter += 2;
  if (counter === 8) {
setTimeout( () => {
$('#result').addClass('visible animated zoomIn')}, 1500)
  };
  boardIsLocked = (true);
  setTimeout( () => {
  $(cardOne).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
  $(cardTwo).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
  }, 1500);
  
  setTimeout( () => {
  resetBoard();
  }, 2000);
  console.log(`This is the counter ${counter}`);

 $(cardOne).removeClass('disabled');
 $(cardTwo).removeClass('disabled');
}

// 'UNFLIP' FUNCTION CALLED WHEN CARDS ARE NOT MATCHED
const unflip = () => {
  boardIsLocked = true;

  $(cardOne).removeClass('disabled');
  $(cardTwo).removeClass('disabled');

  setTimeout(() => {
      $(cardOne).removeClass('flip');
      $(cardTwo).removeClass('flip');
      resetBoard();
  }, 1500);
}

//'BOARD RESET' FUNCTION
const resetBoard = () => {
  [cardFlipped, boardIsLocked] = [false, false];
  [cardOne, cardTwo] = [null, null];
}


$('.card').each((i, item) => {
  item.addEventListener('click', flipCard);
});

//'PLAY AGAIN' BUTTON
$('button').on('click', () => {

  $('#result').removeClass('visible animated zoomIn');

  resetBoard();
  counter = 0;

  $('button').html('PLAY AGAIN');

  shuffle();

  $('.card').removeClass('flip');
  setTimeout( () => {
  $('.card').css({visibility:"visible", opacity: 0}).animate({opacity: 1}, 200);
  }, 500);
});
});
