const checkloging= async ()=>{
      const token = window.localStorage.getItem("token");
      if(!token){
          await alert('ban chua dang nhap');
          window.location = "http://127.0.0.1:5500/html/login.page.html";
          return false;
      };

      return true
 }


export {checkloging}