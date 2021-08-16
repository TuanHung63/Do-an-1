function renderDressProducts(){
    firebase.database().ref(`dress`).on('value',function(snapshot){
       var data=snapshot.val();
      for( let i in data) {
          document.getElementsByClassName("dressProducts")[0].innerHTML+=`
          
                    <div class="col-md-4 col-sm-6 col-lg-3 dress_filter" onclick="goDetail('Dress_${i}')" > 
                    <img src="${data[i].urlImage.url1}" class="img-fluid my-3 w-75  mx-auto d-block" alt="">
                    <h4 class="font-weight-light text-center ">${data[i].name}</h4>
                    <p class="font-italic text-center">${data[i].prize}₫</p>
                </div>`
       }
  
    })

}
function renderShirtProducts(){
    firebase.database().ref(`shirt`).on('value',function(snapshot){
       var data=snapshot.val();
      for( let i in data) {
          document.getElementsByClassName("shirtProducts")[0].innerHTML+=`
          
                    <div class="col-md-4 col-sm-6 col-lg-3 shirt_filter" onclick="goDetail('Shirt_${i}')">
                    <img src="${data[i].urlImage.url1}" class="img-fluid my-3 w-75  mx-auto d-block" alt="">
                    <h4 class="font-weight-light text-center ">${data[i].name}</h4>
                    <p class="font-italic text-center">${data[i].prize}₫</p>
                </div>`
        
           
       }
  
    })

}
function goDetail(typeProduct){

    // firebase.database().ref('Chosen/').set({
    //     code: type,
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
renderDressProducts();
renderShirtProducts();
// filter
$(document).ready(function () {
    $(".btn").click(function () {
      const value = $(this).attr("data-filter");
      if (value == "all") {
        $(".col-md-4").show("1000");
      } else {
        $(".col-md-4")
          .not("." + value)
          .hide("1000");
        $(".col-md-4")
          .filter("." + value)
          .show("1000");
      }
    });
    $(".btn").click(function () {
      $(this).addClass("all");
    });
  });
