var productDetails = [];
function onFormSubmit(event) {
    if (event != null && event != undefined) {
        event.preventDefault();
    }
    var productId = document.getElementById("productId");
    var productIdError = document.getElementById("productIdError");
    var productPartNo = document.getElementById('productPartNo');
    var productPartNoError = document.getElementById('productPartNoError');
    var productName = document.getElementById('productName');
    var productNameError = document.getElementById('productNameError');
    var productDescription = document.getElementById('productDescription');
    var productDescriptionError = document.getElementById('productDescriptionError');
    var updateBtn = document.getElementById('updateBtn');
    var submitBtn = document.getElementById('submitBtn');
    var productObj = {
        productId: Number(productId.value),
        productPartNo: Number(productPartNo.value),
        productName: productName.value,
        productDescription: productDescription.value
    };
    var checkProductIdCond = checkStringEmpty(productId, productIdError, "Please Enter Product Id") && checkPositive(Number(productId.value), productIdError) && checkFirstZero(Number(productId.value), productIdError) && checkSize(productId.value, productIdError);
    if (checkProductIdCond) {
        hideDiv(productIdError);
    }
    var checkProductNameCond = checkStringEmpty(productName, productNameError, "Please Enter Product Name") && isSpace(productName.value, productNameError) && isLength(productName.value, productNameError) && isCharacter(productName.value, productNameError);
    if (checkProductNameCond) {
        hideDiv(productNameError);
    }
    var checkProductPartNoCond = checkStringEmpty(productPartNo, productPartNoError, "Please Enter Product Part No") && checkPositive(Number(productPartNo.value), productPartNoError) && checkFirstZero(Number(productPartNo.value), productPartNoError) && checkSize(productPartNo.value, productPartNoError);
    if (checkProductPartNoCond) {
        hideDiv(productPartNoError);
    }
    var checkProductDescriptionCond = checkStringEmpty(productDescription, productDescriptionError, "Please Enter Product Description") && isSpace(productDescription.value, productDescriptionError);
    if (checkProductDescriptionCond) {
        hideDiv(productDescriptionError);
    }
    if (checkProductIdCond && checkProductPartNoCond && checkProductNameCond && checkProductDescriptionCond) {
        var existId = productDetails.find(function (product) { return product.productId === productObj.productId; });
        var existingName = productDetails.find(function (product) { return product.productName === productObj.productName; });
        console.log("ExistId", existId);
        console.log("Exist Name", existingName);
        if (existId !== undefined && existingName !== undefined) {
            displayError(productIdError, "Product Id already exists.");
            displayError(productNameError, "Product Name already exists.");
            return; // Exit if both ID and Name exist
        }
        else if (existId !== undefined) {
            displayError(productIdError, "Product Id already exists.");
            return;
        }
        else if (existingName !== undefined) {
            displayError(productNameError, "Product Name already exists.");
            return;
        }
        var index = productDetails.findIndex(function (product) { return Number(product.productId) === Number(productId.value) || (product.productName) === productName.value; });
        if (index == -1) {
            productDetails.push(productObj);
            updateBtn.style.display = "none";
            submitBtn.style.display = "block";
        }
        else {
            updateBtn.style.display = "none";
            submitBtn.style.display = "block";
            productId.disabled = false;
            productName.disabled = false;
            productDetails[index] = productObj;
            productId.disabled = false;
        }
        printData(productDetails);
        clearData();
    }
}
function searchProduct() {
    var searchError = document.getElementById('searchData');
    var searchInput = document.getElementById('searchProduct');
    var searchProduct = searchInput.value.toLowerCase();
    var search = productDetails.filter(function (product) {
        return (product.productName.toLowerCase().includes(searchProduct) || product.productId == +searchProduct);
    });
    if (search.length != 0) {
        searchError.style.display = 'none';
    }
    else {
        searchError.style.display = 'block';
        searchError.style.color = "red";
        searchError.innerText = 'No data found.';
    }
    printData(search);
}
function modifyProduct() {
    var modifyProduct = prompt("Please Enter Product Name or Product Id");
    var updateBtn = document.getElementById('updateBtn');
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.style.display = "none";
    updateBtn.style.display = "block";
    var index = productDetails.findIndex(function (product) { return (product.productId) === Number(modifyProduct) || product.productName === modifyProduct; });
    if (index == -1) {
        alert("No data for this ");
        submitBtn.style.display = "block";
        updateBtn.style.display = "none";
        printData(productDetails);
    }
    else {
        if (modifyProduct !== null) {
            var data = productDetails.find(function (product) { return (product.productId) === Number(modifyProduct) || (product.productName) === modifyProduct; });
            if (data !== null && data !== undefined) {
                var productId = document.getElementById("productId");
                productId.value = data.productId.toString();
                var productPartNo = document.getElementById('productPartNo');
                productPartNo.value = data.productPartNo.toString();
                var productName = document.getElementById('productName');
                productName.value = data.productName;
                var productDescription = document.getElementById('productDescription');
                productDescription.value = data.productDescription.toString();
                productId.disabled = true;
                //document.getElementById('productName').disabled=true;
                submitBtn.style.display = "none";
            }
        }
    }
}
function sortingProduct() {
    var select = document.getElementById('sortProduct');
    var selectedValue = select.value;
    switch (selectedValue) {
        case "normal":
            printData(productDetails);
        case "productIdDESC":
            productDetails.sort(function (a, b) { return b.productId - a.productId; });
            break;
        case "productIdASC":
            productDetails.sort(function (a, b) { return a.productId - b.productId; });
            break;
        case "productPartNoASC":
            productDetails.sort(function (a, b) { return a.productPartNo - b.productPartNo; });
            break;
        case "productPartNoDESC":
            productDetails.sort(function (a, b) { return b.productPartNo - a.productPartNo; });
            break;
        case "productNameASC":
            productDetails.sort(function (a, b) { return a.productName.localeCompare(b.productName); });
            break;
        case "productNameDESC":
            productDetails.sort(function (a, b) { return b.productName.localeCompare(a.productName); });
            break;
    }
    printData(productDetails);
}
function removeProduct() {
    var productDelete = prompt("Please enter Product Name or Product Id");
    if (productDelete != null) {
        var index = productDetails.findIndex(function (product) { return (product.productId) === Number(productDelete) || (product.productName) === productDelete; });
        console.log(index);
        if (index !== -1) {
            productDetails.splice(index, 1);
            alert("Sucessfully data deleted");
            printData(productDetails);
            clearData();
        }
        else {
            alert("No Data found");
        }
    }
}
function updateProduct() {
    onFormSubmit();
}
function printData(productDetails, searchData) {
    var data = document.getElementById('data');
    data.innerHTML = " ";
    var products = searchData || productDetails;
    products.forEach(function (product) {
        var rowData = "<tr><td>".concat(product.productId, "</td>\n        <td>").concat(product.productPartNo, "</td>\n        <td>").concat(product.productName, "</td>\n        <td>").concat(product.productDescription, "</td>\n        </tr>");
        data.innerHTML += rowData;
    });
}
function clearData() {
    var productId = document.getElementById("productId");
    productId.value = "";
    var productPartNo = document.getElementById('productPartNo');
    productPartNo.value = "";
    var productName = document.getElementById('productName');
    productName.value = "";
    var productDescription = document.getElementById('productDescription');
    productDescription.value = "";
}
function displayError(element, message) {
    element.innerHTML = message;
    element.style.display = "block";
    element.style.color = "red";
}
function hideDiv(error) {
    error.style.display = "none";
}
function checkStringEmpty(name, errorBlock, errorMessage) {
    if (name.value.trim() === "") {
        displayError(errorBlock, errorMessage);
        name.focus();
        return false;
    }
    return true;
}
function checkSize(name, errorMsg) {
    if (!(name.trim().length >= 1 && name.trim().length <= 7)) {
        displayError(errorMsg, "minimum lenth should be 1 or maximum length should be 7");
        return false;
    }
    return true;
}
function checkPositive(name, errorMsg) {
    if (name.toString()[0] === '-') {
        displayError(errorMsg, "Please Provide Positive Number");
        return false;
    }
    return true;
}
function checkFirstZero(name, errorMsg) {
    if (name.toString()[0] === '0') {
        displayError(errorMsg, "The first digit of the number cannot be zero.");
        return false;
    }
    return true;
}
function isCharacter(name, errorMsg) {
    var alphabetRegEx = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    if (!name.match(alphabetRegEx)) {
        displayError(errorMsg, "Only Contain Alphabetic with one space between words");
        return false;
    }
    return true;
}
function isLength(name, errorMsg) {
    if (!(name.trim().length >= 1 && name.trim().length <= 10)) {
        displayError(errorMsg, "Please provide length between 1 to 10");
        return false;
    }
    return true;
}
function isSpace(name, errorMsg) {
    if (name.startsWith(" ")) {
        displayError(errorMsg, "First Letter should not be space");
        return false;
    }
    return true;
}
