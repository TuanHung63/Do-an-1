var total_price=document.getElementsByClassName("total-price1");
document.getElementById("cartPage").style.display='none';
document.getElementById("Delivery_Information").style.display='none';
document.getElementById("noneProduct").style.display='block';


function renderProducts(){
    getData();

}
function getData(){
    firebase.database().ref('chosenProduct').on("value",function(snapshot){
        if(snapshot.val()!=null){
            document.getElementById("cartPage").style.display='block';
            document.getElementById("Delivery_Information").style.display='none';
            document.getElementById("noneProduct").style.display='none';

        }else {
            document.getElementById("cartPage").style.display='none';
            document.getElementById("Delivery_Information").style.display='none';
            document.getElementById("noneProduct").style.display='block';

        }
        

        for(let i in snapshot.val()){
            if(i=="Dress"){
                Type=i;
                for(let j in snapshot.val().Dress){
                    renderData(Type,j);
                }
            }else if(i=="Shirt"){
                Type=i.substr(0,5);
                for(let j in snapshot.val().Shirt){
                    renderData(Type,j);
                }
            } 
        }
    })

}
function renderData(x,y){//y=HCA195
    firebase.database().ref(`${x.toLowerCase()}/${y}`).on('value',function(snapshot){

        
        document.getElementsByClassName("list-products")[0].innerHTML+=`
        <tr>
        <td class="list-products-name">${snapshot.val().name}</td>
        <td > <input type="number"  value='0' min="0" id="${y}2" class="list-products-num"  onchange="myFunction('${y}',${snapshot.val().prize})"></td>
        <td >${snapshot.val().prize} đ</td>
        <th class="${y}">0 đ</th>
        <td ><span class="badge badge-danger" onclick="deleteP('${y}')" > x</span></td>
      </tr>      

        `
        

    })
    //firebase.database().ref(`Chosen`).remove();
};
renderProducts();
function myFunction(type,price){
    let _price=document.getElementById(`${type}2`).value*price;
   document.getElementsByClassName(`${type}`)[0].innerHTML=_price +"đ";
   Total();


}
function Total(){
    let x_total=document.querySelectorAll("tbody.list-products tr th");
    let price_1total=0;
    for(let i=0;i< x_total.length ;i++){
        x1_total=x_total[i].innerHTML;
        x1_total=parseInt(x1_total.substring(0,x1_total.length-1));
        price_1total+=x1_total
    }
    total_price[0].innerHTML=price_1total + " đ";
    total_price[1].innerHTML=price_1total*0.1 + " đ";
    total_price[2].innerHTML=Math.round(price_1total*1.1) + " đ";
}

function BuyFunction() {
    document.getElementById("cartPage").style.display= 'none';
document.getElementById("Delivery_Information").style.display='block';

}
function getInfoCustomer(){
    inputName=document.getElementById("inputName");
    inputPhone=document.getElementById("inputPhone");
    inputAddress=document.getElementById("inputAddress");
    nameP=document.getElementsByClassName("list-products-name");
    numP=document.getElementsByClassName("list-products-num");

}

document.getElementById("Submition").addEventListener("click",()=>{
    getInfoCustomer();
    alert("Mua hàng thành công!")
    if(inputName.value==''||inputPhone.value==''||inputAddress.value==''){
        alert("Điền lại nhanhhh !!");
        
    }else {
        firebase.database().ref("Customer/"+inputPhone.value).update({
            name:inputName.value,
            Address:inputAddress.value,
            Total:total_price[2].innerHTML,
            status:'Chưa xử lý',
        })
        for(let i=0;i<nameP.length;i++){

            firebase.database().ref("Customer/"+inputPhone.value+"/products/"+nameP[i].innerHTML).update({
                count:numP[i].value,            
            })
        }        
    }

})
function deleteP(code){
    firebase.database().ref('chosenProduct').on("value",function(snapshot){
        for(let i in snapshot.val()){
            if(i=="Dress"){                
                for(let j in snapshot.val().Dress){
                    if(j==code){
                        firebase.database().ref(`chosenProduct/Dress/${code}`).remove();
                        alert("Đã xóa sản phẩm theo yêu cầu");
                        location.reload();
                    }
                }
            }else if(i=="Shirt"){
                for(let j in snapshot.val().Shirt){
                    if(j==code){
                        firebase.database().ref(`chosenProduct/Shirt/${code}`).remove();
                        alert("Đã xóa sản phẩm theo yêu cầu");
                        location.reload();
                    }
                }
            }
        }
    })

}