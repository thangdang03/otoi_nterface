import car from "../dbs/car.data.js";
import { checkloging } from "./authentication.js";
import detail_car from "../dbs/detail.data.js";
//login function
const login = document.getElementById('login');
const loginfucntion = login.addEventListener("click",()=>{
    const current = checkloging();
    if(current===true){
        return;
    }
    window.location ="http://127.0.0.1:5500/html/user.page.html"
})

//cart fuction
const cart = document.getElementById("cart");
const cartfucntion =cart.addEventListener('click',()=>{
    if(checkloging()){window.location ='http://127.0.0.1:5500/html/cart.page.html';}
});

const keysearchv1 = document.getElementById("keysearch");
const form = document.getElementById("form");
const searchfucion = form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const findcar = await car.filter((data)=>{
        return (data.car_name.toLocaleUpperCase().includes(keysearchv1.value.toLocaleUpperCase()) || data.car_manufacture.toLocaleUpperCase().includes(keysearchv1.value.toLocaleUpperCase()));
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

export {
    searchfucion,
    loginfucntion,
    cartfucntion
}