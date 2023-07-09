import { checkloging } from "./authentication.js";
const user_main = document.getElementById('user_main');
const user = JSON.parse(window.localStorage.getItem('token'));
const cart = document.getElementById("cart");
const changeinput = ()=>{
    const input_change = document.getElementById('input_change');
    if(!input_change){
        window.location = 'http://127.0.0.1:5500/html/user.page.html';
        return;
    }
    input_change.innerHTML = `
    <h2>Thông tin tài khoản </h2>
                         <img src="https://choxe.vn/assets/img/avatar_shape_white_20_20.png" alt="">
                         <form action="" id="form_change">
                            <div class="input_information">
                                <label for="username">tên tài khoản </label>
                                <input type="text" name="username" id="username" value="${user.username}">
                            </div>
                            <div class="input_information">
                                <label for="phone">số điện thoại </label>
                                <input type="text" name="phone" id="phone" value="${user.phone || ''}">
                            </div>
                            <div class="input_information">
                                <label for="email">email </label>
                                <input type="email" name="email" id="email" value="${user.email}">
                            </div>
                            <button id="uppdate"> cập nhật</button>
    </form>`;
    const username = document.getElementById('username');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const uppdate = document.getElementById('uppdate');
    uppdate.addEventListener('click',async( e)=>{
        if(phone.value.length > 20){
            alert('số điện thoại không khớp')
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
        user2[index1].username = username.value;
        user2[index1].phone = phone.value;
        user2[index1].email = email.value;
        console.log(user2)

        await window.localStorage.setItem("user",JSON.stringify(user2));
        await window.localStorage.setItem("token",JSON.stringify(user2[index1]));
    });
}

const logout =()=>{
    const logout = document.getElementById('logout');
    logout.addEventListener('click',(e)=>{
        window.localStorage.removeItem('token');
        window.location = 'http://127.0.0.1:5500/html/home.page.html';
    })
  
}

cart.addEventListener('click',()=>{
    if(checkloging()){window.location ='http://127.0.0.1:5500/html/cart.page.html';}
});



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
    changeinput();
    logout();
}

main();