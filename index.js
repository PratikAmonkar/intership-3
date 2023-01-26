let wordsData = [
  {
    word: "HINTS",
    hint: "Something that you suggest in an indirect way",
  },
  {
    word: "MANGO",
    hint: "It is fruit which is loved by most of the people",
  },
  {
    word: "ALONE",
    hint: "Someone is isolated from others",
  },
  {
    word: "ABOUT",
    hint: "A little more or less than or approximately",
  },
];

const data = wordsData[Math.floor(Math.random() * wordsData.length)];
var word = data.word;
var hint = data.hint;
var isGameOver = false;
var lengthOfColumn = 5;
var lengthOfRow = 5;
var row = 0;
var col = 0;
var modalMessage = "";

window.onload = function () {
  drawBoard();
};

function drawBoard() {
  for (let i = 0; i < lengthOfColumn; i++) {
    for (let j = 0; j < lengthOfRow; j++) {
      let box = document.createElement("span");
      box.id = i.toString() + "-" + j.toString();
      box.classList.add("tile");
      box.innerText = "";
      document.getElementById("board").appendChild(box);
    }
  }

  document.getElementById("cust_para").innerText = hint;

  document.addEventListener("keyup", (e) => {
    if (isGameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < lengthOfRow) {
        let currTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col <= lengthOfRow) {
        col -= 1;
      }
      let currTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      currTile.innerText = "";
    } else if (e.code == "Enter") {
      update();
      row += 1;
      col = 0;
    }

    if (!isGameOver && row == lengthOfColumn) {
      isGameOver = true;
      document.getElementById("answer").innerText = word;
      modalMessage = "Oops sorry you guess it wrong";
      showModal(modalMessage);
    }
  });
}

function update() {
  let counter = 0;
  for (let j = 0; j < lengthOfRow; j++) {
    let currTile = document.getElementById(row.toString() + "-" + j.toString());
    let tileText = currTile.innerText;

    if (word[j] == tileText) {
      currTile.classList.add("correctWord");
      counter += 1;
    } else if (word.includes(tileText)) {
      currTile.classList.add("misalignWord");
    } else {
      currTile.classList.add("inCorrectWord");
    }

    if (counter == lengthOfRow) {
      isGameOver = true;
      modalMessage = "Congratulations you won the game";
      showModal();
    }
  }
}

function showModal() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  document.getElementById("modal_para").innerText = modalMessage;
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
    window.location.reload();
    console.log("Click");
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
