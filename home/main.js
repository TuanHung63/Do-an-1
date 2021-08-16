var nameProductFeatured = [
    { name: "Áo dài cổ tàu tay zaclang thêu hình con thỏ ADEU1366", price: 480000,url:"../images/products/featuredProduct/adeu1366/adeu1366-1.jpg",detail:"Shirt_ADEU1366", },
    { name: "Váy cổ tròn ren hoa DAV123", price: 480000,url:"../images/products/featuredProduct/DAV123/dav123-1.jpg",detail:"Dress_DAV123", },
    { name: "Váy cổ v tay bèo vạt rủ ren eo đính nơ DAV138", price: 425000,url:"../images/products/featuredProduct/DAV138/dav138-1.jpg",detail:"Dress_DAV138", },
    { name: "Áo dạ tweed cổ v nẹp ren cơi ngực 2 nắp túi đai eo HCA95", price: 790000,url:"../images/products/featuredProduct/hca95/hca95-1.jpg",detail:"Shirt_HCA95", },

    
    
  ];

function renderDressProducts(){
    firebase.database().ref(`dress`).on('value',function(snapshot){
       var data=snapshot.val();
      for( let i in data) {
          document.getElementsByClassName("dress-products")[0].innerHTML+=`
          <div class="col-md-3" onclick="goDetail('Dress_${i}')">
                        <img src="${data[i].urlImage.url1}" class="img-fluid my-3 w-75  mx-auto d-block"
                            alt="">
                        <h4 class="font-weight-light text-center ">${data[i].name}</h4>
                        <p class="font-italic text-center">${data[i].prize}₫</p>
                    </div>`
        
           
       }
  
    })

}
function renderFeatureProducts(){
    for(let i=0;i<nameProductFeatured.length;i++){
        document.getElementsByClassName("Featured-products")[0].innerHTML+=`
        <div class="col-md-3" onclick="goDetail('${nameProductFeatured[i].detail}')">
                    <img src="${nameProductFeatured[i].url}" class="img-fluid my-3 w-75  mx-auto d-block"
                        alt="">
                    <h4 class="font-weight-light text-center ">${nameProductFeatured[i].name}</h4>
                    <p class="font-italic text-center">${nameProductFeatured[i].price}₫</p>
                </div>
        `
    }
}
function renderShirtProducts(){
    firebase.database().ref(`shirt`).on('value',function(snapshot){
       var data=snapshot.val();
      for( let i in data) {
          document.getElementsByClassName("shirt-products")[0].innerHTML+=`
          <div class="col-md-3" onclick="goDetail('Shirt_${i}')">
                        <img src="${data[i].urlImage.url1}" class="img-fluid my-3 w-75  mx-auto d-block"
                            alt="">
                        <h4 class="font-weight-light text-center ">${data[i].name}</h4>
                        <p class="font-italic text-center">${data[i].prize}₫</p>
                    </div>`
        
           
       }
  
    })

}
function goDetail(typeProduct){

    // })
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
renderFeatureProducts()
renderDressProducts()
renderShirtProducts()