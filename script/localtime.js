function getTime() {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    return `${(h < 10 ? '0' + h : h)}:${(m < 10 ? '0' + m : m)}:${(s < 10 ? '0' + s : s)}`;
  }
  
function getDate() {
  let d = new Date().getDate();
  let m = new Date().getMonth() + 1;
  let y = new Date().getFullYear();
  return `${(d < 10 ? '0' + d : d)}/${(m < 10 ? '0' + m : m)}/${y}`;
}

setInterval(() => {
    document.getElementById('local-time').innerHTML = `Current Date : ${getDate()} || Current Time : ${getTime()}`
}, 1000);