'use strict';

var NUMBER_PICTURES = 25;
var MAX_LIKES = 200;
var MIN_LIKES = 15;
var pictures = [];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var getRandomItem = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomComments = function (number) {
  var comments = [];
  for (var i = 0; i < number; i++) {
    comments[i] = getRandomItem(COMMENTS);
  }
  return comments;
};

var getRandomPictures = function () {
  var randomPictures = [];
  for (var i = 0; i < NUMBER_PICTURES; i++) {
    var commentsNumber = getRandomInteger(1, 2);
    randomPictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getRandomComments(commentsNumber)
    };
  }
  return randomPictures;
};

var renderPictures = function (picturesData) {
  var wrapper = document.createDocumentFragment();
  for (var i = 0; i < picturesData.length; i++) {
    var pictureElement = template.content.cloneNode(true);
    var img = pictureElement.querySelector('img');
    var likesElement = pictureElement.querySelector('.picture-likes');
    likesElement.textContent = picturesData[i].likes;
    img.src = picturesData[i].url;
    pictureElement.querySelector('.picture-comments').textContent = picturesData[i].comments.length;
    wrapper.appendChild(pictureElement);
  }

  picturesBlock.appendChild(wrapper);
  picturesBlock.classList.remove('hidden');
};


var renderOverlay = function (data) {
  overlayElement.classList.remove('hidden');
  overlayElement.querySelector('.gallery-overlay-image').src = data.url;
  overlayElement.querySelector('.likes-count').textContent = data.likes;
  overlayElement.querySelector('.comments-count').textContent = data.comments.length;
};
// ------------------------------------------

var template = document.querySelector('#picture-template');

var picturesBlock = document.querySelector('.pictures');

var overlayElement = document.querySelector('.gallery-overlay');

// ----------------------------------------

pictures = getRandomPictures();

renderPictures(pictures);

renderOverlay(pictures[0]);
