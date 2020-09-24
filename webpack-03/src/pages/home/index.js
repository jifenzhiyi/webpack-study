import '../../style/index.less';
import logoSrc from '../../assets/logo.jpg';
import success from '../../assets/success.png';

const root = document.getElementById('app');
root.innerHTML = `
<h1><img width="45" src="${success}" />标题 111</h1>
<p>hello 老韩</p>
<p>明月几时有，自己抬头瞅</p>
<p><img width="100" src="${logoSrc}" /></p>
`;

console.log(111111);
