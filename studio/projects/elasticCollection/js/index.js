import handleRouting from "./handleRouting.js";
import { removeAllChildNodes } from "./helpers.js";

//JSON FETCH
import vcrData from "../public/data/data.json" assert { type: "json" };

//HANDLE HOMEPAGE BUTTON
const homeBtn = document.querySelector(".home-button");
homeBtn.onclick = () => (window.location = "/vcr-shelf");

let vcrDataToRead = vcrData.slice();

const yearSelectionDiv = document.querySelector(".year-selections");
const decades = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s"];

yearSelectionDiv.addEventListener("wheel", (e) => {
  yearSelectionDiv.scrollLeft -= e.deltaY;
});

//HANDLE DECADE BUTTON FILTER
const handleFilterByDecade = (year) => {
  const newVCRData = vcrData.map((data) => {
    return data.year.slice(0, 3) === year.slice(0, 3) ? data : null;
  });

  const firstShelf = newVCRData.slice(0, 7).map((data) => {
    const tapeCtn = document.createElement("div");
    tapeCtn.className = "tape-ctn";

    if (data === null) {
      const tape = document.createElement("div");
      tape.style = {
        display: "none",
      };
      tapeCtn.appendChild(tape);
      return tapeCtn;
    }

    const tape = document.createElement("img");
    tape.onclick = () => handleRouting(data);
    tape.src = data?.img || "";
    tapeCtn.appendChild(tape);
    return tapeCtn;
  });

  const secondShelf = newVCRData.slice(7, 13).map((data) => {
    const tapeCtn = document.createElement("div");
    tapeCtn.className = "tape-ctn";

    if (data === null) {
      const tape = document.createElement("div");
      tape.style = {
        display: "none",
      };
      tapeCtn.appendChild(tape);
      return tapeCtn;
    }

    const tape = document.createElement("img");
    tape.onclick = () => handleRouting(data);
    tape.src = data?.img || "";
    tapeCtn.appendChild(tape);
    return tapeCtn;
  });

  const thirdShelf = newVCRData.slice(13, 20).map((data) => {
    const tapeCtn = document.createElement("div");
    tapeCtn.className = "tape-ctn";

    if (data === null) {
      const tape = document.createElement("div");
      tape.style = {
        display: "none",
      };
      tapeCtn.appendChild(tape);
      return tapeCtn;
    }

    const tape = document.createElement("img");
    tape.onclick = () => handleRouting(data);
    tape.src = data?.img || "";
    tapeCtn.appendChild(tape);
    return tapeCtn;
  });

  const fourthShelf = newVCRData.slice(20, 25).map((data) => {
    const tapeCtn = document.createElement("div");
    tapeCtn.className = "tape-ctn";

    if (data === null) {
      const tape = document.createElement("div");
      tape.style = {
        display: "none",
      };
      tapeCtn.appendChild(tape);
      return tapeCtn;
    }

    const tape = document.createElement("img");
    tape.onclick = () => handleRouting(data);
    tape.src = data?.img || "";
    tapeCtn.appendChild(tape);
    return tapeCtn;
  });

  const shelves = document.querySelectorAll(".shelf");

  shelves.forEach((shelf, index) => {
    switch (index) {
      case 0:
        removeAllChildNodes(shelf);
        shelf.append(...firstShelf);
        return;
      case 1:
        removeAllChildNodes(shelf);
        shelf.append(...secondShelf);
        return;
      case 2:
        removeAllChildNodes(shelf);
        shelf.append(...thirdShelf);
        return;
      case 3:
        removeAllChildNodes(shelf);
        shelf.append(...fourthShelf);
        return;
      default:
        return;
    }
  });
};

decades.forEach((year) => {
  const yearsElement = document.createElement("div");
  yearsElement.className = "years";
  yearsElement.innerText = year;
  yearsElement.onclick = () => handleFilterByDecade(year);
  yearSelectionDiv.appendChild(yearsElement);
});

// ================== MAIN ====================

const firstShelf = vcrDataToRead.slice(0, 7).map((data) => {
  const tapeCtn = document.createElement("div");
  tapeCtn.className = "tape-ctn";

  const tape = document.createElement("img");
  tape.onclick = () => handleRouting(data);
  tape.src = data.img;
  tapeCtn.appendChild(tape);
  return tapeCtn;
});

const secondShelf = vcrDataToRead.slice(7, 13).map((data) => {
  const tapeCtn = document.createElement("div");
  tapeCtn.className = "tape-ctn";

  const tape = document.createElement("img");
  tape.onclick = () => handleRouting(data);
  tape.src = data.img;
  tapeCtn.appendChild(tape);
  return tapeCtn;
});

const thirdShelf = vcrDataToRead.slice(13, 20).map((data) => {
  const tapeCtn = document.createElement("div");
  tapeCtn.className = "tape-ctn";

  const tape = document.createElement("img");
  tape.onclick = () => handleRouting(data);
  tape.src = data.img;
  tapeCtn.appendChild(tape);
  return tapeCtn;
});

const fourthShelf = vcrDataToRead.slice(20, 25).map((data) => {
  const tapeCtn = document.createElement("div");
  tapeCtn.className = "tape-ctn";

  const tape = document.createElement("img");
  tape.onclick = () => handleRouting(data);
  tape.src = data.img;
  tapeCtn.appendChild(tape);
  return tapeCtn;
});

const shelves = document.querySelectorAll(".shelf");

shelves.forEach((shelf, index) => {
  switch (index) {
    case 0:
      shelf.append(...firstShelf);
      return;
    case 1:
      shelf.append(...secondShelf);
      return;
    case 2:
      shelf.append(...thirdShelf);
      return;
    case 3:
      shelf.append(...fourthShelf);
      return;
    default:
      return;
  }
});
