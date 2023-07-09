import { checkloging } from "./authentication.js";
const user_main = document.getElementById('user_main');
const user = JSON.parse(window.localStorage.getItem('token'));
const cart = document.getElementById("cart");



cart.addEventListener('click',()=>{
    if(checkloging()){window.location ='http://127.0.0.1:5500/html/cart.page.html';}
});

const render_password =()=>{
    const input_change = document.getElementById('input_change');
    if(!input_change){
        return;
    }
    const password = document.getElementById('password');
    const repassword = document.getElementById('repassword');
    const repassword2 = document.getElementById('repassword2');
    const uppdate = document.getElementById('uppdate');
    const icon_box = document.querySelectorAll('.input_information2 i');
    const input = document.querySelectorAll('.input_information2 input');
    for (let i = 0; i < icon_box.length; i++){
        icon_box[i].addEventListener('click',(e)=>{
            if (input[i].type === "password") {
                input[i].type = "text";
              } else {
                input[i].type = "password";
              }
            
        })
    }
    
    uppdate.addEventListener('click',(e)=>{
        if( password.value !== user.password){
            e.preventDefault();
            alert('mật khẩu cũ không đúng');
            return;
        }
        if(repassword.value !== repassword2.value){
            e.preventDefault();
            alert('mật mới không chùng khớp');
            return;
        }
        let user2= JSON.parse(window.localStorage.getItem('user'));
        //get index
        let index1 ;
        user2.map((data,index)=>{
           if(data.email === user.email){
               index1 = index;
               return index;
           }
        });
        user2[index1].password = repassword2.value;
         window.localStorage.setItem("user",JSON.stringify(user2));
         window.localStorage.setItem("token",JSON.stringify(user2[index1]));

    })

}

const logout =()=>{
    const logout = document.getElementById('logout');
    logout.addEventListener('click',(e)=>{
        window.localStorage.removeItem('token');
        window.location = 'http://127.0.0.1:5500/html/home.page.html';
    })
  
}

//login function
const login = document.getElementById('login');

login.addEventListener("click",()=>{
    const current = checkloging();
    if(current===true){
        return;
    }
    window.location ="http://127.0.0.1:5500/html/user.page.html"
})

const loginfunction = ()=>{
    const user = JSON.parse(window.localStorage.getItem('token'));
    if(user){
        login.innerHTML = `
        <img src="https://choxe.vn/assets/img/avatar_shape_white_20_20.png" alt="user">
        <span>
           ${user.username}
        </span> 
        `
    }
}
const renderv3 =()=>{
    if(user_main){
        user_main.innerHTML = `
        <img src="https://choxe.vn/assets/img/avatar_shape_white_20_20.png" alt="user">
        <div>
           <p>${user.username}</p>
            <span>${user.email}</span>
         </div>
        `
    }
}
const main = async()=>{
    checkloging();
    loginfunction();
    renderv3();
    render_password();
    logout();
}

main();