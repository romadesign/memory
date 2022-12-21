const selected_grid_div = document.getElementById('grid');
const logo = "img/roma.jpg";
const selected_score_span = document.getElementById('score');
const attemp = document.getElementById('attempts');
let new_array = [];
let score = 0;
let attemps = 0;
let choices = [];
let save = [];
let data = ""

const getData = () =>
  fetch('./data.json')
    .then(response => response.json())
    .then(json => {
      data = json.data
      for (let i = 0; i < data.length; i++) {
        let img = document.createElement("img");
        img.setAttribute("src", logo);
        selected_grid_div.appendChild(img);
        img.addEventListener("click", () => {
          onClick_img(img, i)
        });
      }
      while (new_array.length < data.length) {
        let random_number = Math.floor(Math.random() * data.length);
        let exists = false;
        for (var i = 0; i < new_array.length; i++) {
          if (new_array[i] == random_number) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          new_array[new_array.length] = random_number;
        }
      }
    })


getData();

const onClick_img = (img, i) => {
  const capture_img_all = document.querySelectorAll("img");
  console.log(capture_img_all)
  img.setAttribute("src", data[new_array[i]].img);
  img.setAttribute("id", data[new_array[i]].id);
  choices.push(img.src);
  save.push(img.id);

  if (choices.length === 2 && choices[0] !== choices[1]) {
    choices = [];
    save.pop();
    save.pop();
    setTimeout(() => {
      const new_img_arr = Array.from(capture_img_all);
      const img_filter = new_img_arr.filter((img) => !save.includes(img.id));
      for (let i = 0; i < img_filter.length; i++) {
        img_filter[i].setAttribute("src", logo);
      }
    }, 700);
    sum_attemp();
  } else if (choices.length === 2 && choices[0] === choices[1]) {
    choices = [];
    score++;
    selected_score_span.textContent = score;
    sum_attemp();
  }
  if (save.length === 16) {
    const win = document.createElement("h2");
    win.textContent = "You win!";
    document.body.appendChild(win);
    const new_game_button = document.createElement("button");
    new_game_button.textContent = "Jugar nuevamente";
    document.body.appendChild(new_game_button);
    new_game_button.addEventListener("click", () => newGame(new_game_button, win));
  }
};

const sum_attemp = () => {
  attemps++;
  attemp.textContent = attemps;
};

const newGame = (new_game_button, win) => {
  selected_grid_div.innerHTML = "";
  win.remove();
  img_filter = [];
  save = [];
  choices = [];
  new_array = [];
  score = 0;
  attemps = 0;
  attemp.textContent = attemps;
  selected_score_span.textContent = score;
  getData();
  new_game_button.remove();
};