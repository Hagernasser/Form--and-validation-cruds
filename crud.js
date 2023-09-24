let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let countInput = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
// global variable
let tmp;

//=============== get total=============================================
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";}
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(211, 0, 0)";
    }
}
// ===============create product=======================================
    let datapro;

    const savedProduct = localStorage.getItem('product');
    
    if (savedProduct && savedProduct !== "undefined") {
        try {
            datapro = JSON.parse(savedProduct);
        } catch (error) {
            console.error('Error parsing product from localStorage:', error);
            datapro = [];
        }
    } else {
        datapro = [];
    }
    
    submit.onclick = function(){
        let count = parseInt(document.getElementById('count').value, 10) || 1;
        let newpro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            category: category.value.toLowerCase(),
        }
// ===============count==========================================================
        if(mood === 'create'){
            if(count > 1){
                for(let i = 0 ; i < count ; i++){
                    datapro.push(newpro);
                }
            
            }else{
                datapro.push(newpro); 
            }
        }else{
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            countInput.style.display = 'block';
        }
    
 // ================Save Data In Local_Storage========
        localStorage.setItem('product', JSON.stringify(datapro));
        console.log(datapro);
        clearData();
        showpro();

    };
// ===============clear inputs data==========
    function clearData(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    }

//========================read===========================
function showpro() {
    let table = '';

    // Start from index 36 where the actual data begins
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i] !== null) {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatePro(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
        }
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">delete All (${datapro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}

showpro();


//====================  delete one product====================
function deleteData(i){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showpro();

}
//  ======================Delete All Products==================
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showpro();
}


// ===============update===========================
function updatePro(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// ============search mood{title or catergory}============
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search')
    if(id == 'searchbytitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title'
    
    }else{
        searchMood = 'category'
        search.placeholder = 'Search By Category'
    }
    search.focus();

}
// ============================search function==============
function searchDta(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0 ; i < datapro.length ; i++){
            if(datapro[i].title.includes(value)){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatePro(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
                
            }

        }
    
    }
    else{
        for(let i = 0 ; i < datapro.length ; i++){
            if(datapro[i].category.includes(value)){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatePro(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
                
            }

        }
    }
    document.getElementById('tbody').innerHTML = table;
}


