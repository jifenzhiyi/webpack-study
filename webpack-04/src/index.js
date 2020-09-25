// import axios from 'axios';
// import './style/index.less';
// import logoSrc from './assets/logo.jpg';
// import success from './assets/success.png';

// axios.get('/api/info').then((res) => {
//   console.log('res', res);
// });

// const root = document.getElementById('app');
// root.innerHTML = `
// <h1><img width="45" src="${success}" />标题 new</h1>
// <p>hello 老韩!</p>
// <p>明月几时有，自己抬头瞅</p>
// <p><img width="100" src="${logoSrc}" /></p>
// `;

// console.log(111111);

// TODO css热更新
// import './style/index.css';

// console.log('111');

// const btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function () {
//   var div = document.createElement('div');
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// };

// TODO js热更新
// import counter from './utils/counter';
// import number from './utils/number';

// counter();
// number();

// if (module.hot) {
//   module.hot.accept('./utils/number', () => {
//     console.log('内容更新');
//     document.body.removeChild(document.getElementById('number'));
//     number();
//   });
// }

// babel
import '@babel/polyfill';
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map((item) => {
  console.log(item);
});
