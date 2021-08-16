var nameProductFeatured = [
    { name: "Áo dài cổ tàu tay zaclang thêu hình con thỏ ADEU1366", price: 480000,url:"../images/products/featuredProduct/adeu1366/adeu1366-1.jpg",detail:"Shirt_ADEU1366", },
    { name: "Váy cổ tròn ren hoa DAV123", price: 480000,url:"../images/products/featuredProduct/DAV123/dav123-1.jpg",detail:"Dress_DAV123", },
    { name: "Váy cổ v tay bèo vạt rủ ren eo đính nơ DAV138", price: 425000,url:"../images/products/featuredProduct/DAV138/dav138-1.jpg",detail:"Dress_DAV138", },
    { name: "Áo dạ tweed cổ v nẹp ren cơi ngực 2 nắp túi đai eo HCA95", price: 790000,url:"../images/products/featuredProduct/hca95/hca95-1.jpg",detail:"Shirt_HCA95", },

    
    
  ];
function renderProducts(){
    getData();

}
function getData(){
    firebase.database().ref('Chosen').on("value",function(snapshot){
        for(let i in snapshot.val()){
            if(i=="Dress"){
                Type=i;
                code=snapshot.val()[i].code;
                renderData(Type,code);
            }else{
                Type=i;
                code=snapshot.val()[i].code;
                renderData(Type,code);
            }
        }
    })

}
function renderData(x,y){//y=HCA195
    firebase.database().ref(`${x.toLowerCase()}/${y}`).on('value',function(snapshot){
        
        document.getElementsByClassName("detail-product")[0].innerHTML=`
        <div class="col-lg-6">
                    <img src="${snapshot.val()['urlImage'].url1}" class="img-fluid my-3 w-75  mx-auto d-block" id="productImg" alt="">
                    <div class="d-flex flex-row">
                    <img src="${snapshot.val()['urlImage'].url1}" class="img-fluid mr-2 smallImg w-25 " style="cursor: pointer;" alt="">
                    <img src="${snapshot.val()['urlImage'].url2}" class="img-fluid mr-2 smallImg w-25  " style="cursor: pointer;" alt="">
                    <img src="${snapshot.val()['urlImage'].url3}" class="img-fluid mr-2 smallImg w-25  " style="cursor: pointer;" alt="">
                    <img src="${snapshot.val()['urlImage'].url4}" class="img-fluid mr-2 smallImg w-25  " style="cursor: pointer;" alt="">


                    </div>

                </div>
                <div class="col-lg-6"> 
                    <div class=" text-center text-lg-left   ">
                        <h4 class="font-weight-bold  my-3 ">${snapshot.val()['name']}</h4>
                        <p class="font-italic  font-weight-bold my-3 ">${snapshot.val()['prize']}₫</p>
                        <h4 class="h4 my-3 " >Chi tiết sản phẩm</h4>
                    </div>
                    <div class=" text-center text-lg-left ">
                    <button type="button" class="btn btn-danger my-3   " onclick="addToCart('${x}_${y}')" >Thêm vào giỏ</button>

                    </div>


                </div>
        `
        let productimg = document.getElementById("productImg");
        let small_img = document.getElementsByClassName("smallImg");
        repeatImg();

    })
    //firebase.database().ref(`Chosen`).remove();
};
function repeatImg(){
    let productimg = document.getElementById("productImg");
    let small_img = document.getElementsByClassName("smallImg");
    small_img[0].onclick = function () {
        productimg.src = small_img[0].src;
    };
    small_img[1].onclick = function () {
        productimg.src = small_img[1].src;
    };
    small_img[2].onclick = function () {
        productimg.src = small_img[2].src;
    };
    small_img[3].onclick = function () {
        productimg.src = small_img[3].src;
    };
    
}
function renderFeatureProducts(){
    for(let i=0;i<nameProductFeatured.length;i++){
        document.getElementsByClassName("Featured-products")[0].innerHTML+=`
        <div class=" col-sm-6 col-lg-3 " onclick="goDetail('${nameProductFeatured[i].detail}')"  style="cursor: pointer;">
                    <img src="${nameProductFeatured[i].url}" class="img-fluid my-3 w-75  mx-auto d-block"
                        alt="">
                    <h4 class="font-weight-light text-center ">${nameProductFeatured[i].name}</h4>
                    <p class="font-italic text-center">${nameProductFeatured[i].price}₫</p>
                </div>
        `
    }
}
renderProducts();
renderFeatureProducts();
function addToCart(data){
    if (data.indexOf("Dress") == 0) {
        type = data.substr(0, 5);
        code1 = data.substr(6, data.length);
      } else {
        type = data.substr(0, 5);
        code1 = data.substring(6, data.length);
      }
    firebase.database().ref(`chosenProduct/${type}/${code1}`).set({
        num:1,
    })
    alert("Đã thêm sản phẩm vào giỏ hàng");

}
function goDetail(typeProduct){

    
    if (typeProduct.indexOf("Dress") == 0) {
        type = typeProduct.substr(0, 5);
        code1 = typeProduct.substr(6, typeProduct.length);
      } else {
        type = typeProduct.substr(0, 6);
        code1 = typeProduct.substring(6, typeProduct.length);
      }
     if(type=="Dress"){
        firebase.database().ref('Chosen/').remove();

        firebase.database().ref('Chosen/Dress').set({
                code: code1,
            })

     }else {
        firebase.database().ref('Chosen/').remove();

        firebase.database().ref('Chosen/Shirt').set({
            code: code1,
        })
         
     }
    alert("Vui lòng chờ!");
    
    window.location.href="../product-detail/index.html";

    
    
}



    

