import _ from 'lodash';
// import './style.css';
// import Icon from './icon.png';
// import Data from './data.xml';
import printMe from './print.js';
import './styles.css';

import webpackLogoImg from './img/webpack.svg';
console.log(webpackLogoImg); // by file-loader, webpackLogoImg is just a path string

// Json
import json from './json/config.json';
console.log('json:', json, 'json.logo:', json.logo); // json will be a javascript object

console.log(require('./img/logo.png')); // work
// var Logo = require(json.logo); // do not work
// console.log(Logo);

// Json by file-loader
import json2 from './json/config.fl.json';
console.log('json2=', json2); // based on webpack rule '.fl.json' will be loaded by file-loader. So json2 will be just a file path.


function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello');

  // Add the image
  var myIcon = new Image(100, 100);
  myIcon.src = webpackLogoImg;
  element.appendChild(myIcon);

  // console.log(Data);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

// document.body.appendChild(component());
let element = component(); // Store the eçlement to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    // printMe();
    document.body.removeChild(element);
    element = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(element);
  })
}

