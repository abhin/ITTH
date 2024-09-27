// function temp() {
//   let p = document.createElement("p");
//   p.innerText = "Hi";
//   document.getElementById("p").append(p);
// }

// setInterval(temp, 2000);
// setTimeout(temp, 5000);

// GAME STARTS HERER //

let images = [
  {
    src: "./img/1.png",
    name: "one",
    visible: false,
  },
  {
    src: "./img/3.png",
    name: "two",
    visible: false,
  },
  {
    src: "./img/5.png",
    name: "three",
    visible: false,
  },
  {
    src: "./img/7.png",
    name: "four",
    visible: false,
  },
  {
    src: "./img/9.png",
    name: "five",
    visible: false,
  },
  {
    src: "./img/11.png",
    name: "six",
    visible: false,
  },
  {
    src: "./img/1.png",
    name: "one",
    visible: false,
  },
  {
    src: "./img/3.png",
    name: "two",
    visible: false,
  },
  {
    src: "./img/5.png",
    name: "three",
    visible: false,
  },
  {
    src: "./img/7.png",
    name: "four",
    visible: false,
  },
  {
    src: "./img/9.png",
    name: "five",
    visible: false,
  },
  {
    src: "./img/11.png",
    name: "six",
    visible: false,
  },
];

function shuffle(cards) {
  let max = cards.length;
  let random = [];
  for (var i = 0; i < max; i++) {
    let randomIndex = Math.floor(Math.random() * max);
    if (random.indexOf(randomIndex) == -1) {
      random.push(randomIndex);
      [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    } else {
      i--;
    }
  }
  return cards;
}

const cards = shuffle(images);
var first = -1;
var second = -1;
var score = 0;

function flipImage(index) {
  if (first == -1) {
    first = index;
    cards[index]["visible"] = true;
  } else if (second == -1) {
    second = index;
    cards[index]["visible"] = true;
    setTimeout(validateImage, 1000);
  } else {
    cards[first]["visible"] = false;
    cards[second]["visible"] = false;
    first = -1;
    second = -1;
  }
  renderDataOnScreen();
}

function validateImage() {
  if (cards[first].name == cards[second].name) {
    score += 10;
    first = -1;
    second = -1;
    document.getElementById("score").innerText =
      "Your Score " + score.toString();
  } else {
    cards[first]["visible"] = false;
    cards[second]["visible"] = false;
    first = -1;
    second = -1;
    renderDataOnScreen();
  }
}
function renderDataOnScreen() {
  document.getElementById("t").innerHTML = "";

  cards.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("box");

    if (!item.visible) {
      div.addEventListener("click", () => flipImage(index));
    }

    if (item.visible == true) {
      let img = document.createElement("img");
      img.src = item.src;
      div.append(img);
    } else {
      div.style = "background-color: black";
    }

    document.getElementById("t").append(div);
  });
}

renderDataOnScreen();
