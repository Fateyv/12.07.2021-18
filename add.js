const listPhotos = document.querySelector(`.list__photos`);
const pagination = document.querySelector(`.pagination`);

let PHOTOS_URL = `https://jsonplaceholder.typicode.com/photos`;

let photos = [];

pagination.addEventListener(`click`, onPaginationClick);

function onPaginationClick(e) {
    if (e.target.classList.contains(`page`)) {
        getPagesPhotos(e.target.id);
    }
}

init();

function init() {
    getPhotos().then(getFirstPagePhotos);
}

function getPhotos() {
    return fetch(PHOTOS_URL)
    .then((resp) => resp.json())
    .then((data) => (photos = data))
    .then((data) => {
      getPagination(data);
      return data;
    });
}

function getPagination(photos) {
    let pages = photos.length / 50;
    for (let index = 1; index <= pages; index++) {
        createPagination(index);
    }
}

function createPagination(index) {
    link = document.createElement(`a`);
    link.className = `page`;
    link.innerHTML = index;
    link.id = index;

    pagination.appendChild(link);
}

function renderPhotos(list) {
    listPhotos.innerHTML = ``;
    list.forEach((item) => renderPhoto(item));
}

function renderPhoto(photo) {
    const li = document.createElement(`li`);
    const img = document.createElement(`img`);
    img.src = photo.thumbnailUrl;

    li.appendChild(img);
    listPhotos.appendChild(li);
}

function getFirstPagePhotos(data) {
    if (data.length) {
        getPagesPhotos(data[0].id);
    }
}
function getPagesPhotos(num) {
    let newPhotos = photos.filter((item) => item.albumId === +num);
    renderPhotos(newPhotos);
}