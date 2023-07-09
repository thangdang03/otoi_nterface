import car from "../dbs/car.data.js";
import detail_car from "../dbs/detail.data.js";
import { checkloging } from "./authentication.js";
const urlstring = window.location.href;
const newurl = new URL(urlstring);
const value_id = newurl.searchParams.get("id");
//test slider 
const slider_img = document.getElementsByClassName('slider_img');
const slider_child = document.getElementsByClassName("columt");
const pre = document.getElementsByClassName("pre");
const next = document.getElementsByClassName("next");

let siderindex = 1;

const showslider =(n)=>{
    let i;
    //set max value array 
    if(n > slider_img.length) {siderindex= 1};
    //set min value array 
    if(n < 1)  siderindex = slider_img.length ;
    //remove class 
    for(let i = 0 ; i<slider_img.length;i++){
         slider_img[i].style.display = 'none';
    }
    for (i = 0; i < slider_child.length; i++) {
        slider_child[i].className = slider_child[i].className.replace(" active", " ");
    }
    console.log({siderindex})
    //set value
    slider_img[siderindex-1].style.display = 'block';
    slider_child[siderindex-1].className +=' active';
} 

const asd =()=>{

    for(let i = 0 ; i < slider_child.length;i++){
        slider_child[i].addEventListener('click',()=>{
            showslider(siderindex = (Number(slider_child[i].title)+1));
            slider_child[i].style.cursor = 'grab';
        })
    }

    for(let i = 0 ; i < pre.length;i++){
        pre[i].addEventListener('click',()=>{
            showslider( siderindex += -1 );
        })
    }

    for(let i = 0 ; i < next.length;i++){
        next[i].addEventListener('click',()=>{
            showslider(siderindex+=1);
        })
    }
}
const list_link = document.getElementById('list_link');
const render=()=>{
console.log('cehck',value_id);
     const cardetail = detail_car.filter(data=>{
        return data.car_id == value_id;
     });
     console.log(cardetail[0]);
     list_link.innerHTML =` 
     <a href="http://127.0.0.1:5500/html/home.page.html">trang chủ</a> > <a href="">chi tiết sản phẩm</a> > 
     <a href="">${cardetail[0]?.car_manufacture}</a>  > <a href="">${cardetail[0]?.car_name}</a>
     `
     const img_detail = cardetail[0].car_imge.map(data=>{
           return(`
           <div class="slider_img">
                    <img src="${data}" alt="">
            </div>
           `)
     }).join(" ")
     const img_child = cardetail[0].car_imge.map((data,index)=>{
        return(`
            <div class="columt" title=${index}>
                <img src="${data}" alt="">
            </div>
        `) 
    }).join(' ');
    const slider_content = document.getElementById("slider_content");
    //render silder
    slider_content.innerHTML = `${img_detail} 
                        <button class="pre font"> &#8249 </button>
                          <button class="next font"> &#8250 </button>
                          <div id="slider_child">${img_child}</div>`
     console.log(img_detail);
    //reder text
    const text = document.getElementById('text');
    text.innerHTML = `<p> <i class="fa-solid fa-location-dot"></i> gửi từ ${cardetail[0].car_form}</p>
    <h2>${cardetail[0].car_name}</h2>
    <h3 class="car_price">giá ${cardetail[0].car_price}</h3>
    <h3>mô tả </h3>
    <p>${cardetail[0].car_decription}</p>
    <h3>chi tiết</h3>
    <br>
    <table>
        <tr>
            <td><i class="fa-solid fa-tag"></i> Hãng xe</td>
            <td>${cardetail[0].car_manufacture}</td>
        </tr>
        <tr>
            <td><i class="fa-solid fa-tachograph-digital"></i> Dòng xe</td>
            <td>${cardetail[0].car_Vehicles}</td>
        </tr>
        <tr>
            <td><i class="fa-regular fa-calendar"></i> Năm sản xuất</td>
            <td>${cardetail[0].car_year}</td>
        </tr>
        <tr>
            <td><i class="fa-sharp fa-solid fa-gauge"></i> Số km đã đi</td>
            <td>${cardetail[0].car_km}</td>
        </tr>
        <tr>
            <td><i class="fa-solid fa-gas-pump"></i> Nhiên liệu</td>
            <td>${cardetail[0].car_fuel}</td>
        </tr>
        <tr>
            <td><i class="fa-sharp fa-solid fa-newspaper"></i> Xuất xứ</td>
            <td>${cardetail[0].car_origin}</td>
        </tr>
        <tr>
            <td><i class="fa-duotone fa-person-seat"></i> Số chỗ</td>
            <td>${cardetail[0].car_place}</td>
        </tr>
        <tr>
            <td><i class="fa-solid fa-car-side"></i> Kiểu dáng</td>
            <td>${cardetail[0].car_designs}</td>
        </tr>
        
    </table>`
    const product  = document.getElementById("gird_container");
    const product2  = document.getElementById("gird_container2");
    const strrender = car.filter(data=>{
        return data.car_manufacture  ===  cardetail[0].car_manufacture;
    });
    const maping = strrender?.map(data=>{
        return`
        <div class="grid_item">
            <img src="${data.car_thumb}" alt="img_gird">
            <div class="text_grid">
                <div><a href="http://127.0.0.1:5500/html/detail.page.html?id=${data.id}">${data.car_name}</a></div>
                <h3>${data.car_price} triệu</h3>
                <p> ${data.car_form} - ${data.car_year}</p>
            </div>
        </div>`
   }).join(" ");

    if(strrender.length === 3 ){product.style.gridTemplateColumns= "300px 300px 300px";}
    if(strrender.length === 2 ){product.style.gridTemplateColumns= "300px 300px ";}
    if(strrender.length === 1 ){product.style.gridTemplateColumns= "300px ";}
    product.innerHTML =maping;

    const strrender2 = car.filter(data=>{
        return data.car_price <=  cardetail[0].car_price;
    });
    const maping2 = strrender2?.map(data=>{
        return`
        <div class="grid_item">
            <img src="${data.car_thumb}" alt="img_gird">
            <div class="text_grid">
                <div><a href="http://127.0.0.1:5500/html/detail.page.html?id=${data.id}">${data.car_name}</a></div>
                <h3>${data.car_price} triệu</h3>
                <p> ${data.car_form} - ${data.car_year}</p>
            </div>
        </div>`
   }).join(" ");
   if(strrender2.length === 3 ){product2.style.gridTemplateColumns= "300px 300px 300px";}
    if(strrender2.length === 2 ){product2.style.gridTemplateColumns= "300px 300px ";}
    if(strrender2.length === 1 ){product2.style.gridTemplateColumns= "300px ";}
    product2.innerHTML = maping2;
    
}

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


const main=async()=>{
    await render();
    asd();
    showslider(siderindex);
    loginfunction();
    mapin();
    console.log(window.localStorage)
}

main();

