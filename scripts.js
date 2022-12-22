//capture id &&  class 
const selected_grid_div = document.getElementById('grid')
const time = document.getElementById('time')
const logo = 'img/logo.jpg'
const happyImg = 'img/happy.gif'
const attemp = document.getElementById('attempts')
const content_div = document.querySelector('.content-time-general')
const content_div_general = document.querySelector('.content-general')
const buttonRestar = document.getElementById('buttonRestar')
const h5 = document.getElementsByTagName('h5')[0]
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const contentTimeGame = document.querySelector('.content-time-game')

let totalTime = 3
let new_array = []
let attemps = 0
let img_selected = []
let save = []
let data = ''
let clockStatus = false
let sec = 0
let min = 0
let hrs = 0
let t

//when the page loads the function is called startGame()
window.onload = startGame

function tick () {
  sec++
  if (sec >= 60) {
    sec = 0
    min++
    if (min >= 60) {
      min = 0
      hrs++
    }
  }
}

function add () {
  tick()
  h5.textContent =
    (hrs > 9 ? hrs : '0' + hrs) +
    ':' +
    (min > 9 ? min : '0' + min) +
    ':' +
    (sec > 9 ? sec : '0' + sec)
  timer()
}

function timer () {
  showButtonStop()
  hiddeButtonStart()
  buttonRestar.style.display = 'none'
  if (clockStatus != true) {
    selected_grid_div.getAttribute('class')
    selected_grid_div.classList.remove('show-grip')
  }
  t = setTimeout(add, 1000)
}

start.onclick = timer
stop.onclick = function () {
  showButtonStart()
  hiddeButtonStop()

  if (clockStatus != true) {
    selected_grid_div.getAttribute('class')
    selected_grid_div.classList.add('show-grip')
  }
  clearTimeout(t)
}

//
function startGame () {
  document.getElementById('countdown').innerHTML = totalTime
  if (totalTime == 0) {
    contentTimeGame.getAttribute('class')
    contentTimeGame.classList.remove('content-time-game')
    contentTimeGame.classList.add('time_new')

    fetch('./data.json')
      .then(response => response.json())
      .then(json => {
        timer()
        data = json.data

        //looping through json to capture the position of each image and adding the click event to select the clicked image
        data.map(function (item) {
          //creating label to display on screen and capturing its attribute to add the image
          const img = document.createElement('img')
          img.setAttribute('src', logo)
          selected_grid_div.appendChild(img)
          //adding a function to each image and passing the position of each one as a parameter
          img.addEventListener('click', () => {
            onClick_img(img, item.id - 1)
          })
        })
        
        //validating the length of each array
        while (new_array.length < data.length) {
          //change the data from data to save it in another new array randomly
          let random_number = Math.floor(Math.random() * data.length)
          let exists = false
          for (var i = 0; i < new_array.length; i++) {
            if (new_array[i] == random_number) {
              exists = true
              break
            }
          }
          if (!exists) {
            new_array[new_array.length] = random_number
          }
        }
      })
  } else {
    totalTime -= 1
    //set timeout to show game
    setTimeout('startGame()', 1000)
  }
}


//capturando la etique elegida 
const onClick_img = (img, i) => {
  const capture_img_all = document.querySelectorAll('img')
  img.setAttribute('src', data[new_array[i]].img)
  img.setAttribute('id', data[new_array[i]].id)
  img_selected.push(img.src)
  save.push(img.id)

  //validating if the array has 2 items && validating if the position 0 and 1 are different and cleaning the array for a new selection of items
  if (img_selected.length === 2 && img_selected[0] !== img_selected[1]) {
    img_selected = []
    save.pop()
    save.pop()
    //adding method to return the initial image if the selection is not correct and going through the array to add the logo
    setTimeout(() => {
      const new_img_arr = Array.from(capture_img_all)
      const img_filter = new_img_arr.filter(img => !save.includes(img.id))
      for (let i = 0; i < img_filter.length; i++) {
        img_filter[i].setAttribute('src', logo)
      }
    }, 700)
    //adding attempts
    sum_attemp()
    //validating if the 2 images are the same to clean and add attempts
  } else if (img_selected.length === 2 && img_selected[0] === img_selected[1]) {
    img_selected = []
    sum_attemp()
  }


  //validation if we guess all the images
  if (save.length === 16) {
    //add new tag html <img/>
    const imgHappy = document.createElement('img')
    imgHappy.setAttribute('src', happyImg)
    content_div_general.appendChild(imgHappy)

    //add new tag html <button>
    const new_game_button = document.createElement('button')
    new_game_button.textContent = 'Play again'
    content_div_general
      .appendChild(new_game_button)
      .classList.add('button-restart-game')

    //add click event to restart game
    new_game_button.addEventListener('click', _ => {
      location.reload()
    })
    youWin()
  }
}

//function to add every time we click 2
const sum_attemp = () => {
  attemps++
  attemp.textContent = attemps
}

//Function to show button to restart or continue playing && stop the timer
function youWin () {
  clearTimeout(t)
  selected_grid_div.getAttribute('class')
  selected_grid_div.classList.add('show-grip')
  hiddeButtonStop()
}


//////////function reusable show and hide bottons//////////
function hiddeButtonStop () {
  stop.getAttribute('class')
  stop.classList.add('stop_new')
}

function showButtonStop () {
  stop.getAttribute('class')
  stop.classList.remove('stop_new')
}

function hiddeButtonStart () {
  start.getAttribute('class')
  start.classList.add('start_new')
}

function showButtonStart () {
  start.getAttribute('class')
  start.classList.remove('start_new')
  buttonRestar.style.display = 'block'

  //Star game again
  buttonRestar.addEventListener('click', _ => {
    location.reload()
  })
}
