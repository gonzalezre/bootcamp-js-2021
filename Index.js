const form  = document.getElementsByTagName("form")[0]; //zero because i want to select the first form in this page
const tbody = document.getElementsByTagName("tbody")[0];
const inputName = document.getElementsByTagName("input")[0];
const tdTotalQuantity = document.getElementById("totalQuantity");
const tdTotalPrice = document.getElementById("totalPrice");
const tdGrandTotal = document.getElementById("grandTotal");

/** @type {HTMLInputElement} */
const txtId = document.getElementById("txtId");
/** @type {HTMLInputElement} */
const txtName = document.getElementById("txtName");
/** @type {HTMLInputElement} */
const txtQuantity = document.getElementById("txtQuantity");
/** @type {HTMLInputElement} */
const txtPrice = document.getElementById("txtPrice");
/** @type {HTMLInputElement} */
const selectCategory = document.getElementById("selectCategory");


let id = 0;
let totalQuantity = 0;
let totalPrice = 0;
let grandTotal = 0;
let currentRow;

form.addEventListener("submit", onSubmit);

/**
 * for knowing the type of the parameter!!! important, and useful!
 * @param {Event} event 
 */
function onSubmit(event){
    //blue cube: atributos
    //purple cube: metodos
    //any word: without figure, just ABC
    
    
    event.preventDefault(); //prevents default actions of the element assigned to this method
                            //when pressing save, by default if i have some variables, this will ease the data that is not saved
    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [frmCode, frmName, frmQuantity, frmPrice, frmCategory] = values;
    //const name = values[0][1];
    //const quantity = values[1][1];
    //const price = values [2][1];
    //const category = values[3][1];
    //console.log(data);
    let code = frmCode[1];
    const name = frmName[1];
    const quantity = frmQuantity[1];
    const price = frmPrice[1];
    const category = frmCategory[1];
    const total = quantity*price;
    console.log(category);
    id++;
    totalQuantity = parseFloat(quantity) + totalQuantity;
    totalPrice = parseFloat(price)+ totalPrice;
    grandTotal = parseFloat(total) + grandTotal;

    let tr;
    if(!code){
        code = id++;
        tr = document.createElement("tr"); //permite crear elementos html
        tbody.appendChild(tr);
    }
    else{
        tr = currentRow;
    }




    tr.dataset.category = category;
    
    /*tr.innerHTML = "<td>x</td>"+
    "<td>"+name+"</td>"+
    "<td>"+quantity+"</td>"+
    "<td>"+price+"</td>"+
    "<td>"+quantity*price+"</td>"+
    '<td><a href="#">Editar</a><a href="#">Eliminar</a></td>';*/

    tr.innerHTML = `
    <td>${code}</td>
    <td>${name}</td>
    <td>${quantity}</td>
    <td>${price}</td>
    <td>${quantity*price}</td>
    <td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onClick="onDelete(event)">Eliminar</a></td>
    `;

    tdTotalQuantity.innerHTML = totalQuantity.toString();
    tdTotalPrice.innerHTML = totalPrice.toString();
    tdGrandTotal.innerHTML = grandTotal.toString();

    

    //cleaning form data
    form.reset();
    inputName.focus();
}


/**
 * 
 * @param {Event} event 
 */
function onEdit(event){
    event.preventDefault();

    /** @type {HTMLElement} */
    const anchor = event.target;

    const tr = anchor.parentElement.parentElement; 
    const td = tr.getElementsByTagName("td");
    const [tdCode, tdName, tdQuantity, tdPrice, tdCategory] = td;
    console.log(td);
    txtId.value = tdCode.innerText;
    txtName.value = tdName.innerText;
    txtQuantity.value = tdQuantity.innerText;
    txtPrice.value = tdPrice.innerText;
    selectCategory.value = tr.dataset.category;

    currentRow = tr;
}

/**
 * 
 * @param {Event} event 
 */
function onDelete(event){
    event.preventDefault();

    /** @type {HTMLElement} */
    const anchor = event.target;

    const tr = anchor.parentElement.parentElement; //elemento donde esta ubicado en el nivel superior
    tbody.removeChild(tr);
}



