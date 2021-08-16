
//     console.log(nameProduct.value);
//     console.log(prizeProduct.value);
//     console.log(detailProduct.value);
//     console.log(imageProduct.files[0].name);
//     console.log(idProduct.value);
//     console.log(typeProduct.value);
var nameProduct, prizeProduct, detailProduct, imageProduct, typeProduct, idProduct,urlImage;
function Ready() {
    nameProduct = document.getElementById("name-product");
    prizeProduct = document.getElementById("prize-product");
   
    ///imageProduct=document.getElementById("image-product");
    typeProduct = document.getElementById("type-product");
    idProduct = document.getElementById("id-product");

}






function addDresstoDB(type) {
    Ready();
    
    firebase.database().ref(`${type}/${idProduct.value}/`).set({
        name: nameProduct.value,
        prize: prizeProduct.value,

    })
    
    getUrlImage(type,idProduct.value); 
}


function addProductToServer() {
    console.log(10);
    typeProduct1 = document.getElementById("type-product");


    if (typeProduct1.value == 'dress') {
        addDresstoDB('dress');
    }
    if (typeProduct1.value == 'shirt') {
        addDresstoDB('shirt');
    }


}
function getUrlImage(type,idProduct) {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#image-product").files;
    const metadata = [{
        contentType: file[0].type
    },
    {
        contentType: file[1].type
    },
    {
        contentType: file[2].type
    },
    {
        contentType: file[3].type
    }
    ]
    
    const task = ref.child(file[0].name).put(file[0], metadata[0]);
    task
        .then(snapshot => snapshot.ref.getDownloadURL()         

           
        )
        .then((url) => {  

        firebase.database().ref(`${type}/${idProduct}/urlImage`).update({
            url1:`${url}`,

    });
                

        })
    const task1 = ref.child(file[1].name).put(file[1], metadata[1]);
    task1
        .then(snapshot => 
            snapshot.ref.getDownloadURL()
        
            )
        .then(url => {

            firebase.database().ref(`${type}/${idProduct}/urlImage`).update({
                url2:`${url}`,

        });  


        })
    const task2 = ref.child(file[2].name).put(file[2], metadata[2]);
    task2
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            firebase.database().ref(`${type}/${idProduct}/urlImage`).update({
                url3:url,

        });  
           


        })
    const task3 = ref.child(file[3].name).put(file[3], metadata[3]);
    task3
        .then(snapshot => snapshot.ref.getDownloadURL()
       )
        .then((url) => {
            firebase.database().ref(`${type}/${idProduct}/urlImage`).update({
                url4:url,

        });            

        })
        
    


}
function logout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href='../login/index.html';
      }).catch((error) => {
        // An error happened.
      });
}
function chooseType(){
    let type1_product=document.getElementById("type1-product").value;
    
        firebase.database().ref(`${type1_product}`).on("value",(snapshot)=>{
            let data=snapshot.val();
            document.getElementById("code1-product").innerHTML='';

            for(let i in data){
                document.getElementById("code1-product").innerHTML+=`
                <option value="${i}">${i}</option>
                `

            }
        })

    

}
function deletePr(){
    let type1_product=document.getElementById("type1-product").value;
    let code1_product=document.getElementById("code1-product").value;
    alert("Đã xóa thành công sản phẩm");
    console.log(type1_product+code1_product);
    //firebase.database().ref(`${type1_product}/${code1_product}`).remove();



}

