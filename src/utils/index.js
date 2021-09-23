export function getDate(date){
  let time = new Date(date);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  return `${year}-${month}-${day}`;
}

export function getTime(date){
  let time = new Date(date);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  let second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
  return `${year}-${month}-${day} - ${hour}:${min}:${second}`
}