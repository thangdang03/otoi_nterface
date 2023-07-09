import {car}from "../dbs/index.dbs.js";
import{filter_car}from"../dbs/car.data.js";

import salon from "../dbs/salon.data.js";
import { checkloging } from "./authentication.js";
//render html
const reder=async(emlement,data)=>{
      const maping = await data?.map(data=>{
           if(data.id>8){
            return 
           }
           return`
           <div class="grid_item">
               <img src="${data.car_thumb}" alt="img_gird">
               <div class="text_grid">
                   <div><a href="http://127.0.0.1:5500/html/detail.page.html?id=${data.id}">${data.car_name}</a></div>
                   <span>2018 . Tự động .50.000 km</span>
                   <h3>${data.car_price} triệu</h3>
                   <p> ${data.car_form} - ${data.car_year}</p>
                   <button class="addtocart" value="${data.id}"> thêm vào giỏ hàng</button>
               </div>
           </div>`
      }).join(" ");
      document.getElementById(emlement).innerHTML = maping;
      addtocart();
}

//add to card
const addtocart =async()=>{
    const find = document.querySelectorAll(".addtocart");
       find?.forEach(async (box)=>{
             box.addEventListener('click',()=>{
                 checkloging();
                 let token = JSON.parse(window.localStorage.getItem("token"));
                 let user = JSON.parse(window.localStorage.getItem('user'));
                 //get index
                 let index1 ;
                 user.map((data,index)=>{
                    console.log({data,index});
                    if(data.email === token.email){
                        index1 = index;
                        return index;
                    }
                 });
                 
                 //check value
                 if(user[index1].user_car.includes(box.value)){
                    alert('ban da them vao gio hang');
                    return;
                 }
                 //update
                user[index1].user_car.push(box.value);
                window.localStorage.setItem("user",JSON.stringify(user));
                alert('da them vao gio hang');
             })
        })
}
const rederv2=async(emlement,data)=>{
    const maping = await data?.map(data=>{
         return`
         <div class="grid_item">
             <img src="${data.car_thumb}" alt="img_gird">
             <div class="text_grid">
                 <div><a href="http://127.0.0.1:5500/html/detail.page.html?id=${data.id}">${data.car_name}</a></div>
                 <h3>${data.car_price} triệu</h3>
                 <p> ${data.car_form} - ${data.car_year}</p>
                 <button class="addtocart" value="${data.id}"> thêm vào giỏ hàng</button>
                 </div>
         </div>`
    }).join(" ");
     document.getElementById(emlement).innerHTML = maping;
     addtocart()
}

//envent 
//get data
let filter ={
    send_formst:``,
    car_pricest:``,
    car_yearst:``,
    car_manufacturest:``
}

var send_form = document.getElementById("send_form");
send_form.addEventListener("change",(data)=>{
    filter.send_formst =send_form.value;
    console.log(filter.send_formst);
})

var car_yearst = document.getElementById("car_year");
car_yearst.addEventListener("keyup",(data)=>{
    if(car_yearst.value >= 2024){
        alert('vượt quáhoặc nhỏ hơn năm sản xuất');
        car_yearst.value = 2023;
    }
    filter.car_yearst =car_yearst.value;
    console.log(filter.car_yearst);
    
})

car_yearst.addEventListener("change",(data)=>{
    if(car_yearst.value >= 2024) alert('vượt quá năm sản xuất');
    filter.car_yearst =car_yearst.value;
    console.log(filter.car_yearst);
})

var car_manufacture = document.getElementById("car_manufacture");
car_manufacture.addEventListener("change",(data)=>{
    filter.car_manufacturest =car_manufacture.value;
    console.log(filter.car_manufacturest);
})
var car_price = document.getElementById("car_price");
const price_value = document.querySelector(".price_value");
car_price.addEventListener("change",(data)=>{
    price_value.innerHTML  = `${car_price.value}triệu`
    filter.car_pricest =car_price.value;
    console.log(filter.car_pricest);
});
//ultil fucntion  
function notfoud (){
    const gird_root =document.getElementById("gird_container");
    gird_root.innerHTML="<h3>không tìm thấy sản phẩm</h3>";
}
function styleroot(array){
    const gird_root =document.getElementById("gird_container");
    if(array.length === 3 ){gird_root.style.gridTemplateColumns= "300px 300px 300px";}
    if(array.length === 2 ){gird_root.style.gridTemplateColumns= "300px 300px ";}
    if(array.length === 1 ){gird_root.style.gridTemplateColumns= "300px ";}
    showmore.style.display ='none';
}

//fitler function
const icon = document.getElementById('filter_icon');
icon.addEventListener('click',async()=>{
    console.log(filter);
    if(filter.send_formst ==="" && filter.car_manufacturest ===""&&filter.car_yearst ===""&&filter.car_pricest ==="") {
        alert('vui long dien dien vao form de co the tim kiem');
        showmore.style.display ='none';
        return
    }
    const gird_root =document.getElementById("gird_container");
    const result = await filter_car({
        car_year: filter.car_yearst
        ,car_manufacture:filter.car_manufacturest,
        car_price:filter.car_pricest ,
        car_form:filter.send_formst
    });

    if(result.length===0){
        notfoud()
        showmore.style.display ='none';
        return;
    }
    rederv2('gird_container',result);
    styleroot(result);
    addtocart()
});

// showmore fucntion
const showmore= document.getElementById("showmore");
showmore.addEventListener('click',()=>{
    rederv2("gird_container",car);
    showmore.style.display ='none';
});

//search fuction 
const keysearchv1 = document.getElementById("keysearch");
const form = document.getElementById("form");

form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const findcar = await car.filter((data)=>{
        return (data.car_name.toLocaleUpperCase().includes(keysearchv1.value.toLocaleUpperCase().trim()) || data.car_manufacture.toLocaleUpperCase().includes(keysearchv1.value.toLocaleUpperCase().trim()));
    });

    if(!findcar.length){
        keysearchv1.value =""
        notfoud();
        console.log("asdfwer");
        showmore.style.display ='none';
        return;
    }
    console.log(findcar);
    rederv2("gird_container",findcar);
    styleroot(findcar);
})


//transition fucnion
const ul_filter = document.querySelector("#filter > ul");
const transition =()=>{
    ul_filter.style.transform = 'translate(60px, 0px)';
}
//reder salon 
const redersalon = async()=>{
      const maping = await salon?.map((data,index)=>{
           if(index >3) return;
           return`
           <div class="grid_item_salon">
                            <img src="${data.salon_thumn}" alt="">
                            <div class="text_salon">
                                <a href="#">${data.salon_name}</a>
                                    <p> <i class="fa-solid fa-location-dot"></i> ${data.salon_adress}</p>
                                    <p><i class="fa-solid fa-phone"></i>${data.salon_phone}</p>
                            </div>
            </div>`
      }).join(" ");
      document.getElementById("salon_gird").innerHTML = maping;
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
//cart fuction
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



