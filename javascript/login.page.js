const button_login = document.getElementById("btn_login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const hadelemail = document.getElementById("hadelemail");
const hadelpasswordl = document.getElementById("hadelpasswordl");
const linkhome = document.getElementById('icon');

button_login.addEventListener('click',(e)=>{
    const emailstr = email.value;
    const passwordstr = password.value;
    if(emailstr === ''|| passwordstr ===""){alert('vui long nhap du thong tin tren form');return;}
    e.preventDefault();
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(!user){
        alert('dang nhap khong thanh cong');
        hadelemail.style.display = 'block';
        email.value ="";
        hadelemail.innerHTML = "<p>email chưa được đăng ký</p> "
    }
    //find user
    let current = false;
    const check = user.filter(data=>{return data.email  === emailstr});
    
    if(!check.length){
        alert('dang nhap khong thanh cong');
        hadelemail.style.display = 'block';
        email.value ="";
        hadelemail.innerHTML = "<p>email chưa được đăng ký</p> "
        return;
    }

    //check password
    check.map(data=>{
        if(data.password === passwordstr){ current=true}
    });

    console.log(current);
    if(current ===false){
        hadelpasswordl.style.display = 'block';
        password.value ="";
        hadelpasswordl.innerHTML = "<p>mat khau khong khop</p> "
        return;
    }
    
    const token = window.localStorage.setItem('token',JSON.stringify(check[0]));
    console.log(token);
    
    alert('dang nhap thanh cong');
    window.location = 'http://127.0.0.1:5500/html/home.page.html';
});

linkhome.addEventListener('click',(e)=>{
    window.location = ' http://127.0.0.1:5500/html/home.page.html';
})
