interface Product{
    productId:number,
    productPartNo:number,
    productName:string,
    productDescription:string|number;
}
let productDetails: Product[] = [];
function onFormSubmit(event?:any):void{
    if(event!=null && event!=undefined){
        event.preventDefault();
    }
    let productId = document.getElementById("productId") as HTMLInputElement;
    let productIdError = document.getElementById("productIdError")as HTMLElement;
    let productPartNo=document.getElementById('productPartNo') as HTMLInputElement;
    let productPartNoError=document.getElementById('productPartNoError') as HTMLElement;
    let productName=document.getElementById('productName') as HTMLInputElement;
    let productNameError=document.getElementById('productNameError') as HTMLElement;
    let productDescription=document.getElementById('productDescription') as HTMLTextAreaElement;
    let productDescriptionError=document.getElementById('productDescriptionError') as HTMLElement;
    let updateBtn=document.getElementById('updateBtn') as HTMLButtonElement;
    let submitBtn=document.getElementById('submitBtn') as HTMLButtonElement;

    const productObj:Product = {
        productId: Number(productId.value),
        productPartNo:Number(productPartNo.value),
        productName:productName.value,
        productDescription:productDescription.value
    };
    
    let checkProductIdCond:boolean=checkStringEmpty(productId,productIdError,"Please Enter Product Id")  && checkPositive(Number(productId.value),productIdError) && checkFirstZero(Number(productId.value),productIdError) && checkSize(productId.value,productIdError);
    if(checkProductIdCond){
        hideDiv(productIdError);
    }
    
    let checkProductNameCond:boolean = checkStringEmpty(productName,productNameError,"Please Enter Product Name") && isSpace(productName.value, productNameError) && isLength(productName.value,productNameError) && isCharacter(productName.value, productNameError)
    if(checkProductNameCond){
        hideDiv(productNameError);
    }
   
    let checkProductPartNoCond:boolean=checkStringEmpty(productPartNo,productPartNoError,"Please Enter Product Part No")  && checkPositive(Number(productPartNo.value),productPartNoError) && checkFirstZero(Number(productPartNo.value),productPartNoError) && checkSize(productPartNo.value,productPartNoError);
    if(checkProductPartNoCond){
        hideDiv(productPartNoError);
    }
    
    let checkProductDescriptionCond:boolean=checkStringEmpty(productDescription,productDescriptionError,"Please Enter Product Description")&& isSpace(productDescription.value,productDescriptionError);
    if (checkProductDescriptionCond) {
        hideDiv(productDescriptionError);
    }
    
    if(checkProductIdCond && checkProductPartNoCond  && checkProductNameCond && checkProductDescriptionCond){
        let existId: Product | undefined = productDetails.find(product => product.productId === productObj.productId);
        let existingName: Product | undefined = productDetails.find(product => product.productName === productObj.productName);
        console.log("ExistId",existId);
        console.log("Exist Name",existingName);
        if (existId!==undefined && existingName!==undefined) {
            displayError(productIdError, "Product Id already exists.");
            displayError(productNameError, "Product Name already exists.");
            return; // Exit if both ID and Name exist
        }
        else if(existId!==undefined){
            displayError(productIdError, "Product Id already exists.");
            return;
        }
        else if(existingName!==undefined){
            displayError(productNameError, "Product Name already exists.");
            return; 
        }  
        
    let index:number = productDetails.findIndex(product => Number(product.productId) === Number(productId.value) || (product.productName) ===productName.value);
    
    if(index==-1){
        productDetails.push(productObj);
        updateBtn.style.display="none";
        submitBtn.style.display="block";
    }
    else{
        updateBtn.style.display="none";
        submitBtn.style.display="block";
        productId.disabled=false;
        productName.disabled=false;
        productDetails[index] = productObj;
        productId.disabled=false;
    }
    printData(productDetails);
    clearData();
    
    }
}
function searchProduct():void{
    let searchError = document.getElementById('searchData') as HTMLElement;
    let searchInput=document.getElementById('searchProduct') as HTMLInputElement;
    let searchProduct:string= searchInput.value.toLowerCase();
    
    let search:Product[] = productDetails.filter(function(product:Product):boolean {
        return (product.productName.toLowerCase().includes(searchProduct) || product.productId==+searchProduct);
    });
    if (search.length != 0) {
        searchError.style.display = 'none';
    } else {
        searchError.style.display = 'block';
        searchError.style.color="red";
        searchError.innerText = 'No data found.';
    }
    printData(search);
}

function modifyProduct():void{
    let modifyProduct:string|number|null = prompt("Please Enter Product Name or Product Id");
    let updateBtn=document.getElementById('updateBtn') as HTMLButtonElement;
    let submitBtn=document.getElementById('submitBtn') as HTMLButtonElement
    submitBtn.style.display="none";
    updateBtn.style.display="block";
    let index:number = productDetails.findIndex(product => (product.productId) === Number(modifyProduct) || product.productName===modifyProduct);
    if(index==-1){
        alert("No data for this ");
        submitBtn.style.display = "block"; 
        updateBtn.style.display="none";
        printData(productDetails);
    }
    else{
    if (modifyProduct !== null) {
        let data:Product|undefined|null= productDetails.find(product => (product.productId) === Number(modifyProduct) || (product.productName) === modifyProduct);
        if(data !== null && data !== undefined) {
            let productId=document.getElementById("productId") as HTMLInputElement;
            productId.value=data.productId.toString();
            let productPartNo=document.getElementById('productPartNo') as HTMLInputElement;
            productPartNo.value=data.productPartNo.toString();
            let productName=document.getElementById('productName') as HTMLInputElement;
            productName.value=data.productName;
            let productDescription=document.getElementById('productDescription') as HTMLInputElement;
            productDescription.value=data.productDescription.toString();
            productId.disabled=true;
            //document.getElementById('productName').disabled=true;
            submitBtn.style.display = "none";
        }         
    }
}
}
function sortingProduct():void{
    let select=document.getElementById('sortProduct') as HTMLSelectElement;
    let selectedValue:string=select.value;
    switch (selectedValue) {
        case "normal":
            printData(productDetails);
        case "productIdDESC":
            productDetails.sort((a:Product, b:Product):number => b.productId - a.productId);
            break;
        case "productIdASC":
            productDetails.sort((a:Product, b:Product):number => a.productId - b.productId);
            break;
        case "productPartNoASC":
            productDetails.sort((a:Product, b:Product):number => a.productPartNo - b.productPartNo);
            break; 
        case "productPartNoDESC":
            productDetails.sort((a:Product, b:Product):number => b.productPartNo - a.productPartNo);
            break;
        case "productNameASC":
            productDetails.sort((a:Product, b:Product):number =>a.productName.localeCompare(b.productName));
            break;
        case "productNameDESC":
            productDetails.sort((a:Product, b:Product):number =>b.productName.localeCompare(a.productName));
            break;
}
    printData(productDetails);
}
function removeProduct():void{
    
    let productDelete:string|number|null= prompt("Please enter Product Name or Product Id");
    if (productDelete != null) {
        let index:number = productDetails.findIndex(product => (product.productId) === Number(productDelete) || (product.productName) ===productDelete);
        console.log(index);
        if(index !== -1) {
            productDetails.splice(index, 1); 
            alert("Sucessfully data deleted");
            printData(productDetails);
            clearData();
        } 
        else{
            alert("No Data found");
        }
  }
}
function updateProduct():void{
    onFormSubmit();
}
function printData(productDetails:Product[],searchData?:[]):void{
    let data=document.getElementById('data') as HTMLElement;
    data.innerHTML=" ";
    let products:Product[] = searchData || productDetails;
    products.forEach((product)=>{
        const rowData:string=`<tr><td>${product.productId}</td>
        <td>${product.productPartNo}</td>
        <td>${product.productName}</td>
        <td>${product.productDescription}</td>
        </tr>`
        data.innerHTML+=rowData;
    });
}

function clearData():void{
    let productId=document.getElementById("productId") as HTMLInputElement;
    productId.value="";
    let productPartNo=document.getElementById('productPartNo') as HTMLInputElement;
    productPartNo.value="";
    let productName=document.getElementById('productName') as HTMLInputElement;
    productName.value="";
    let productDescription=document.getElementById('productDescription') as HTMLTextAreaElement;
    productDescription.value="";
}
function displayError(element: HTMLElement, message: string): void {
    
    element.innerHTML = message;
    element.style.display = "block";
    element.style.color = "red";
}
function hideDiv(error: HTMLElement): void {
    
    error.style.display = "none";
}
function checkStringEmpty(name: HTMLInputElement | HTMLTextAreaElement, errorBlock: HTMLElement, errorMessage: string): boolean {
    
    if (name.value.trim() === "") {
        displayError(errorBlock, errorMessage);
        name.focus();
        return false;
    }
    return true;
}

function checkSize(name:string,errorMsg:HTMLElement):boolean{
    
    if (!(name.trim().length >= 1 && name.trim().length <= 7)) {
        displayError(errorMsg,"minimum lenth should be 1 or maximum length should be 7");
        return false;
    }
    return true;
}
function checkPositive(name:number,errorMsg:HTMLElement):boolean{
    
    if (name.toString()[0] === '-') {
        displayError(errorMsg,"Please Provide Positive Number")
        return false;
    }
    return true;
}
function checkFirstZero(name:number,errorMsg:HTMLElement):boolean{
    
    if (name.toString()[0] === '0') {
        displayError(errorMsg,"The first digit of the number cannot be zero.")
        return false;
    }
    return true;
}
function isCharacter(name:string, errorMsg:HTMLElement):boolean {
    var alphabetRegEx = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    if (!name.match(alphabetRegEx)) {
        displayError(errorMsg,"Only Contain Alphabetic with one space between words");
        return false;
    }
    return true;
}
function isLength(name:string, errorMsg:HTMLElement):boolean{
    if (!(name.trim().length >= 1 && name.trim().length <= 10)) {
        displayError(errorMsg,"Please provide length between 1 to 10")
        return false;
    }
    return true;
}
function isSpace(name:string, errorMsg:HTMLElement):boolean{
    if (name.startsWith(" ")) {
        displayError(errorMsg,"First Letter should not be space");
        return false;
    }
    return true;
}