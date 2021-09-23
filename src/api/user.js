export async function setStorage(user){
  localStorage.setItem('user',user)
}
export  function whoAmI(){
  return localStorage.getItem('user')
}
export  function loginOut(){
  localStorage.removeItem('user')
}
