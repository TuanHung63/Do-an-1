getData();
function getData(){
    firebase.database().ref("Customer/").on('value',(snapshot)=>{
        let data=snapshot.val();
        for(let i in data){
            let text='';
            for(let j in data[i].products){
                text+=`<p>${j} : ${data[i].products[j].count} sản phẩm</p>`

            
            }
            let cl="P"+i;
        document.getElementsByClassName("list-products")[0].innerHTML+=`
        <tr>
              <td class="list-id-product p-1">${i}</td>
              <td class="list-info-product p-1">
                    <p>Họ tên: ${data[i].name}</p>
                        <p>Địa chỉ: ${data[i].Address}
                        </p>
                </td>
              <td class="list-info-customer p-1" > ${text}</td>
              <td class="list-total p-1" >${data[i].Total}</td>
              <th class="list-process p-1 text-center"><button type="button" class="btn btn-outline-danger " id="${cl}" onclick="processProduct(${cl})">${data[i].status}</button> </th>
            </tr> 
        `
        
    }
    })
}
function processProduct(index){   
    let x= index.id;
    x=x.substring(1,x.length);
    firebase.database().ref("Customer/"+x).update({
        status:"Đã xử lý",
    })
    location.reload();
    
}
function logout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href='../login/index.html';
      }).catch((error) => {
        // An error happened.
      });
}
