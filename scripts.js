const selected_grid_div = document.getElementById('grid')
const time = document.getElementById('time')
const logo = 'img/roma.jpg'
const selected_score_span = document.getElementById('score')
const attemp = document.getElementById('attempts')
let new_array = []
let score = 0
let attemps = 0
let choices = []
let save = []
let data = ''
let statusConente = false

//time
let content_div = document.querySelector('.content-time-general')
let content_div_general = document.querySelector('.content-general')
let h5 = document.getElementsByTagName('h5')[0]
let start = document.getElementById('strt')
let stop = document.getElementById('stp')
let sec = 0
let min = 0
let hrs = 0
let t

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
  if (statusConente != true) {
    console.log(statusConente)
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
    console.log(statusConente)
    selected_grid_div.getAttribute('class')
    selected_grid_div.classList.add('show-grip')

    content_div_general.getAttribute('id')
    content_div_general.classList.add('hola')
  }

  clearTimeout(t)
}

const getData = () =>
  //hide button start
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
  console.log(capture_img_all)
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
    score++
    selected_score_span.textContent = score
    sum_attemp()
  }
  if (save.length === 16) {
    const win = document.createElement('h2')
    win.textContent = 'You win!'
    document.body.appendChild(win)
    const new_game_button = document.createElement('button')
    new_game_button.textContent = 'Jugar nuevamente'
    document.body.appendChild(new_game_button)
    new_game_button.addEventListener('click', () =>
      newGame(new_game_button, win)
    )
    youWin()
  }
}
console.log(content_div)

const sum_attemp = () => {
  attemps++
  attemp.textContent = attemps
}

const newGame = (new_game_button, win) => {
  selected_grid_div.innerHTML = ''
  win.remove()
  img_filter = []
  save = []
  choices = []
  new_array = []
  score = 0
  attemps = 0
  attemp.textContent = attemps
  selected_score_span.textContent = score
  getData()
  new_game_button.remove()
}

function youWin () {
  clearTimeout(t)
  content_div.getAttribute('class')
  content_div.classList.add('time')

  hiddeButtonStop()
}

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
}
