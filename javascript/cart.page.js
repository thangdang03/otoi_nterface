import { findcarbyid } from "../dbs/car.data.js";
import { checkloging } from "./authentication.js";
const content2 = document.getElementById('content2');
checkloging();
const cart = document.getElementById("cart");
cart.addEventListener('click',()=>{
    if(checkloging()){window.location ='http://127.0.0.1:5500/html/cart.page.html';}
});

//cart fuction;
const mapin=async()=>{
       await reder('gird_container',car);
       transition();
       redersalon();
       //add to cart click
       loginfunction();
}
mapin();

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
loginfunction();
const render = ()=>{
    let token = JSON.parse(window.localStorage.getItem("token"));
    let user = JSON.parse(window.localStorage.getItem('user'));
    //get index
    let index1 ;
    user.map((data,index)=>{
    if(data.email === token.email){
          index1 = index;
          return index;
    }});
    if(!user[index1].user_car.length){
        content2.innerHTML = "<h1> ban chua them san pham nao<h1>"
        return;
    }
    const nearr =  user[index1].user_car.map( data=>{
       return  findcarbyid(data);
    })
    console.log(nearr);

    const maping = nearr.map(data=>{
        return(`
        <div class="nested">
                <ul class="ullist">
                    <li><img src="${data.car_thumb}" alt=""></li>
                    <li>${data.car_name}</li>
                    <li>
                        ${data.car_price} triệu
                    </li>
                    <li>
                        hãng xe: ${data.car_manufacture}
                    </li>
                    <li>
                        năm sản xuất: ${data.car_year}
                    </li>
                    <li>
                        <form action="">
                        <button type="submit" class='btn_cart' value="${data.id}">delete cart</button></form>
                    </li>
                </ul>
               </div>`
        )
    }).join(" ");
    content2.innerHTML = maping;
}
render();
//delete cart 
const deletecart=(id)=>{
    let token = JSON.parse(window.localStorage.getItem("token"));
    let user = JSON.parse(window.localStorage.getItem('user'));
    //get index
    let index1 ;
    user.map((data,index)=>{
    if(data.email === token.email){
          index1 = index;
          return index;
    }});
    const newcart = user[index1].user_car.filter(data=>{
        return data !== id
    });
    user[index1].user_car = newcart;
    console.log(user[index1]);
    window.localStorage.setItem('user',JSON.stringify(user));
}
// get lclass event 
const find = document.querySelectorAll(".btn_cart");

find.forEach(data=>{
    data.addEventListener('click', e=>{
        deletecart(data.value);
    });
})
