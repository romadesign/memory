const selected_grid_div = document.getElementById('grid')
const time = document.getElementById('time')
const logo = 'img/logo.jpg'
const happyImg = 'img/happy.gif'
const attemp = document.getElementById('attempts')
const content_div = document.querySelector('.content-time-general')
const content_div_general = document.querySelector('.content-general')
const buttonRestar = document.getElementById('buttonRestar')

let new_array = []
let attemps = 0
let choices = []
let save = []
let data = ''
let statusConente = false

let h5 = document.getElementsByTagName('h5')[0]
let start = document.getElementById('start')
let stop = document.getElementById('stop')
let sec = 0
let min = 0
let hrs = 0
let t

function tick() {
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

function add() {
  tick()
  h5.textContent =
    (hrs > 9 ? hrs : '0' + hrs) +
    ':' +
    (min > 9 ? min : '0' + min) +
    ':' +
    (sec > 9 ? sec : '0' + sec)
  timer()
}

function timer() {
  showButtonStop()
  hiddeButtonStart()
  buttonRestar.style.display = "none"
  if (statusConente != true) {
    selected_grid_div.getAttribute('class')
    selected_grid_div.classList.remove('show-grip')
  }
  t = setTimeout(add, 1000)
}

start.onclick = timer
stop.onclick = function () {
  showButtonStart()
  hiddeButtonStop()

  if (statusConente != true) {
    selected_grid_div.getAttribute('class')
    selected_grid_div.classList.add('show-grip')
  }

  clearTimeout(t)
}

const getData = () =>
  start.getAttribute('class')
  start.classList.add('start_new')

fetch('./data.json')
  .then(response => response.json())
  .then(json => {
    timer()
    data = json.data
    for (let i = 0; i < data.length; i++) {
      let img = document.createElement('img')
      img.setAttribute('src', logo)
      selected_grid_div.appendChild(img)
      img.addEventListener('click', () => {
        onClick_img(img, i)
      })
    }
    while (new_array.length < data.length) {
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

getData()

const onClick_img = (img, i) => {
  const capture_img_all = document.querySelectorAll('img')
  img.setAttribute('src', data[new_array[i]].img)
  img.setAttribute('id', data[new_array[i]].id)
  choices.push(img.src)
  save.push(img.id)

  if (choices.length === 2 && choices[0] !== choices[1]) {
    choices = []
    save.pop()
    save.pop()
    setTimeout(() => {
      const new_img_arr = Array.from(capture_img_all)
      const img_filter = new_img_arr.filter(img => !save.includes(img.id))
      for (let i = 0; i < img_filter.length; i++) {
        img_filter[i].setAttribute('src', logo)
      }
    }, 700)
    sum_attemp()
  } else if (choices.length === 2 && choices[0] === choices[1]) {
    choices = []
    sum_attemp()
  }

  if (save.length === 16) {
    let imgHappy = document.createElement('img')
    imgHappy.setAttribute('src', happyImg)
    content_div_general.appendChild(imgHappy)

    const new_game_button = document.createElement('button')
    new_game_button.textContent = 'Play again'
    content_div_general.appendChild(new_game_button).classList.add('button-restart-game')

    new_game_button.addEventListener('click', _ => {
      location.reload();
    })
    youWin()
  }
}

const sum_attemp = () => {
  attemps++
  attemp.textContent = attemps
}

function youWin() {
  clearTimeout(t)
  content_div.getAttribute('class')
  content_div.classList.add('time')
  //hide game
  selected_grid_div.getAttribute('class')
  selected_grid_div.classList.add('show-grip')
  hiddeButtonStop()
}

function hiddeButtonStop() {
  stop.getAttribute('class')
  stop.classList.add('stop_new')
}

function showButtonStop() {
  stop.getAttribute('class')
  stop.classList.remove('stop_new')

}

function hiddeButtonStart() {
  start.getAttribute('class')
  start.classList.add('start_new')
}

function showButtonStart() {
  start.getAttribute('class')
  start.classList.remove('start_new')
  buttonRestar.style.display = "block"
  buttonRestar.addEventListener('click', _ => {
    location.reload();
  })

}
