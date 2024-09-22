function changeMood(mood) {
  let moods = {
    happy: "&#128514;",
    smile: "&#128513;",
    cry: "&#128557;",
  };

  document.getElementById("showMood").innerHTML = moods[mood];
}

document
  .getElementById("makeHappy")
  .addEventListener("click", (e) => changeMood("happy"));
document
  .getElementById("makeSmile")
  .addEventListener("click", (e) => changeMood("smile"));
document
  .getElementById("makeCry")
  .addEventListener("click", (e) => changeMood("cry"));
