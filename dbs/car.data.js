const car = [
    {   id: 1,
        car_name: "Hyundai Tucson Hyundai Tucson 2.0L Đặc biệt 2021, Tự động, đã đi 10.000 km",
        car_price:850 ,
        car_thumb:"https://cdn1.otosaigon.com/data-resize/choxe/20230608/Ra3oYvPAc1l8qQoazgJXNxhy0sg6v38SMW06abk4.jpg?w=267",
        car_year:2021,
        car_form:"hà nội",
        car_manufacture: "Hyundai"
    },
    {   id: 2,
        car_name: "Toyota Vios 2008 2007, Số sàn, đã đi 200.000 km",
        car_price:118,
        car_thumb:"https://cdn1.otosaigon.com/data-resize/choxe/20230619/vHFFWe6K2nc33dFtYx2fuslv3BNEOlBQtqjwPeGT.jpg?w=267",
        car_year:2007,
        car_form:"hà nội",
        car_manufacture: "Toyota"
    },
    {   id: 3,
        car_name: "Toyota Veloz Cross Toyota Veloz Cross CVT 2022, Tự động, đã đi 19.000 km",
        car_price:655,
        car_thumb:"https://cdn1.otosaigon.com/data-resize/choxe/20230619/PgUbaoZZdis3iZoLyNMEKO1Kq1MFt1XR5W7NxXEd.jpg?w=267",
        car_year:2022,
        car_form:"hà nội",
        car_manufacture: "Toyota"
    },
    {   id: 4,
        car_name: "Hyundai Sonata y20 2010, Tự động, đã đi 120.000 km",
        car_price:365,
        car_thumb:"https://cdn1.otosaigon.com/data-resize/choxe/20230608/Ra3oYvPAc1l8qQoazgJXNxhy0sg6v38SMW06abk4.jpg?w=267",
        car_year:2010,
        car_form:"hưng yên",
        car_manufacture: "Hyundai"
    },
    {   id: 5,
        car_name: "Volkswagen Tiguan Facelift - 2023",
        car_price:1999,
        car_thumb:"https://cdn1.otosaigon.com/data/choxe/20230615/awTEXZmEmdqFPCXxT14uz7YIykFJdxNC78TkzTe2.jpg",
        car_year:2023,
        car_form:"hồ chí minh",
        car_manufacture: "Volkswagen"
    },
    {   id: 6,
        car_name: "Hyundai Starex 2003, xe 1 chủ dùng từ đầu gia hấp dẫn",
        car_price:120,
        car_thumb:"https://cdn1.otosaigon.com/data/choxe/20230614/ngaoPWgbT6sDAGBLGpYtIKbnyzx2Qi0NG3W3ywwG.jpg",
        car_year:2003,
        car_form:"hà nội",
        car_manufacture: "Hyundai"
    },
    {   id: 7,
        car_name: "Suzuki Ertiga Hybrid mới 2022- Chỉ 100 triệu lăn bánh",
        car_price:609 ,
        car_thumb:"https://cdn1.otosaigon.com/data/choxe/20230609/fGR8xtW3nLoknikGBrA2BmNRr8LoN7Gc1YISYWxB.jpg",
        car_year:2022,
        car_form:"hồ chí minh",
        car_manufacture: "Suzuki"
    },
    {   id: 8,
        car_name: "Hyundai i10 Sedan MT Full 2020, Odo 58.000km, Biển TP.HCM",
        car_price:318 ,
        car_thumb:"https://cdn1.otosaigon.com/data/choxe/20230610/15LORzToetk3E1FcB9TQGI9ii8Ib4iAihXa9veKw.jpg",
        car_year:	2020,
        car_form:"hồ chí minh",
        car_manufacture: "Hyundai"
    },
    {   id: 9,
        car_name: "Suzuki Swift GLX 2019, Tự động, đã đi 41000 km",
        car_price:455,
        car_thumb:"https://cdn1.otosaigon.com/data/choxe/20230608/Ra3oYvPAc1l8qQoazgJXNxhy0sg6v38SMW06abk4.jpg",
        car_year:	2019,
        car_form:"đà nẵng",
        car_manufacture: "Suzuki"
    },
    {   id: 10,
        car_name: "Hyundai Kona Hyundai Kona 2.0 AT Đặc biệt 2020, Tự động, đã đi 23.000 km",
        car_price:590,
        car_thumb:"https://cdn1.otosaigon.com/data/choxe/20230608/20pnX2KEu1dqYDtCy3ICTRVyFT2Cb9JOesWyeTdQ.jpg",
        car_year:	2020,
        car_form:"hồ chí minh",
        car_manufacture: "Hyundai"
    }
]
const search_card =async ({keysearch})=>{
    const findcar = await car.filter((data)=>{
        return (data.car_name.toLocaleUpperCase().includes(keysearch.toLocaleUpperCase()) || data.car_manufacture.toLocaleUpperCase().includes(keysearch.toLocaleUpperCase()));
    });
    console.lo
    return filter_car;
}

const findcarbyid =(carid)=>{
    const findcar = car.filter((data)=>{
        return data.id == carid;
    });
    return findcar[0];
}

// search_card({keysearch: "Hyundai"});

const filter_car=async({car_year,car_manufacture,car_price ,car_form})=>{
      console.log({car_year,car_manufacture,car_price,car_form})

      const findcar = await car.filter(data=>{
           return( data.car_manufacture === car_manufacture  && data.car_form === car_form && data.car_price <= car_price && data.car_year <= car_year)
      })
      console.log(findcar);
      return findcar
}

export {search_card,findcarbyid,filter_car};

export default car
