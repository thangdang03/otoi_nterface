const email = document.getElementById('email');
const username = document.getElementById("username");
const hadelemail = document.getElementById("hadelemail");
const hadelpasswordl = document.getElementById("hadelpasswordl");
const password = document.getElementById("password");
const submit = document.getElementById("btn_login");
const register =()=>{
  let emailstr =  email.value;
  let usernamestr = username.value;
  const passwordstr = password.value;
  //valuedate
  if(emailstr === '' || usernamestr ==='' ||password==='') alert("bạn phải hoàn thành fomr");
  const userstr ={
    email: email.value,
    username: username.value,
    password: password.value,
    user_car: []
  }
  const user = JSON.parse( window.localStorage.getItem("user"));
  // check user in localstole
  if(!user){
    window.localStorage.setItem("user",JSON.stringify([userstr]));
    alert('dawng ky thanh cong');
     window.location = "http://127.0.0.1:5500/html/login.page.html";
    return;
  }
// check email and username 
  let current = false;
  user?.map(data=>{
        if(data.email === emailstr){
            current = true
        }
  })
  if(current){
          hadelemail.style.display = 'block';
          hadelemail.innerHTML = '<p> email da duoc dang ky</p>' ;
          console.log(hadelemail)
    return;
  }

// set new user 
  const newuser = [...user,userstr];
  window.localStorage.setItem("user",JSON.stringify(newuser));

  alert('dang ky thanh cong');

  window.location = "http://127.0.0.1:5500/html/login.page.html";
}
const linkhome = document.getElementById('icon');

linkhome.addEventListener('click',(e)=>{
    window.location = ' http://127.0.0.1:5500/html/home.page.html';
})
submit.addEventListener('click',e=>{
    e.preventDefault();
    register();
})


