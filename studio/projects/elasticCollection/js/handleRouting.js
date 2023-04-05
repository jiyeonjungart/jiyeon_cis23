let isVisible = false;

const modalCtn = document.querySelector(".modal-ctn");
const modal = document.querySelector(".modal");
const textCtn = document.querySelector(".text-ctn");

const setVisibility = (data) => {
  textCtn.innerHTML = "";

  if (!isVisible) {
    modalCtn.className = `${modalCtn.className}-vis`;
    const locationText = document.createElement("p");
    locationText.innerText = `Location: ${data.location}`;
    const yearText = document.createElement("p");
    yearText.innerText = `Year: ${data.year}`;
    const schoolText = document.createElement("p");
    schoolText.innerText = `School: ${data.school}`;

    textCtn.appendChild(locationText);
    textCtn.appendChild(yearText);
    textCtn.appendChild(schoolText);
    modalCtn.onclick = () => setVisibility();
    modal.className = `${modal.className}-vis`;
    isVisible = true;
  } else {
    modalCtn.className = "modal-ctn";
    modal.className = "modal";
    isVisible = false;
  }
};

const handleRouting = (vcrData) => {
  const contentCtn = document.querySelector(".content-ctn");
  contentCtn.textContent = "";

  const tv = document.createElement("img");
  const tape = document.createElement("img");
  const audio = document.createElement("audio");
  const video = document.createElement("iframe");
  tv.className = "tv";
  tape.className = "tape";
  tv.src = "./public/overlay/monitor-01.png";
  tape.src = vcrData.img;
  tape.onclick = () => setVisibility(vcrData);
  audio.src = "./public/sounds/tape-sound.mp3";
  audio.autoplay = true;
  video.src = vcrData.link;
  contentCtn.appendChild(tv);
  contentCtn.appendChild(tape);
  contentCtn.appendChild(audio);

  setTimeout(() => {
    video.src += "?autoplay=1&mute=1";
  }, 2000);
  contentCtn.appendChild(video);
};

export default handleRouting;
