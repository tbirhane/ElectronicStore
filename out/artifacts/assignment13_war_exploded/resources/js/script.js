var id;
/*
* Add to cart
*
* */
function addToCart(clicked_id) {
    id =clicked_id;
    console.log(id);
    var siblings = $('#'+id).siblings().not('img');
    var item = {id: id,
        name: siblings[0].innerText,
        description: siblings[1].innerText.split(":")[1].trim(),
        quantity: siblings[4].value,
        price: siblings[3].innerText.split(":")[1].split("$")[1].trim(),
       // number:siblings[4].value
    };
    $.post('order', {item: JSON.stringify(item)}).done(saveToCart).fail(fail);
}
function removeItemFromCart(clicked_id) {
   alert(clicked_id);
    id = clicked_id;
    id = clicked_id.split("-")[1];
    $.get("removeitem",{removeitem:JSON.stringify(id)}).done(removed).fail(fail);
//continue
}
function removed(data) {
    alert(data);
   $('#item-'+data).parent().css("display","none").remove();
      //parent.remove();
}
function saveToCart(data) {

    console.log(parseInt(data.price.trim()));
    console.log(parseInt(data.quantity));
    var td1 =  $('<td>').append($('<button>').addClass("btn btn-danger")
        .attr("id","item-"+data.id)
        .attr("onclick","removeItemFromCart(this.id)")
        .text("Remove"));
    var td2 =  $('<td>').text(data.id);
    var td3 =  $('<td>').text(data.name);
    var td4 =  $('<td>').text("$" + data.price);
    var td5 =  $('<td>').text(data.quantity);
    var td6 =  $('<td>').text("$" + parseFloat(data.price) * parseInt(data.quantity));
    var tr = $('<tr>').append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
    $('#order-table').append(tr);
}
function fail(data) {
     alert("fail");
    console.log(data);
}
$(function () {

    'use strict';
    //display add product form
    $('#btn_add').click(displayPage);
    //add product to store
    $('#btn_add_product').click(sendProductDetails);
    //load login page
    $('#login').click(loadLoginPage);
    //add
    //$('.btn').click(addToCart,id);
    $('#checkout').click(checkout);

    function sendProductDetails() {
        var productName = $('#product-name').val();
        var productDescription = $('#product-description').val();
        var productQuantity = $('#product-quantity').val();
        var productPrice = $('#product-price').val();

        //var product = {name:productName, price:productPrice};
        var product = new Product(productName,productDescription,productQuantity,productPrice);
        $.post('products',{product: JSON.stringify(product)}, addProduct, "json");
}
    function addProduct(data) {
        console.log("add called");
        //var form = $("<form>").attr("action","order").attr("method","post");
        var prodiv = $("<div>").addClass("products");
        var img = $("<img>").attr("src","resources/images/mobile.png").attr("alt","iPhone").addClass("img-responsive"); // continue worikin
        //var prod_id = $("<input>").attr("type","hidden").attr("value",data.id);
        var prod_name = $("<h4>").text(data.name).addClass("text-info");
        var prod_info = $("<h4>").text("Description: "+data.description);
        var prod_quantity = $("<h4>").text("Quantity: "+data.quantity);
        var prod_price = $("<h4>").text("Price: "+data.price);
        var quantity = $("<input>").attr("type","text").attr("name","quantity").attr("value","1").addClass("form-control");
        var addtocart = $("<button>").addClass("btn btn-info").attr("id",data.id).attr("onclick", "addToCart(this.id)").text("Add To Cart ");
        // var price = $("<input>").attr("type","text").attr("name","price").attr("value","1");
        prodiv.append(img).append(prod_name)
           // .append(prod_id)
            .append(prod_info).append(prod_quantity)
            .append(prod_price).append(quantity)
            .append().append(addtocart);
        //form.append(prodiv);
        $("#container").prepend($("<div>").addClass("col-sm-4 col-md-3 products").append(prodiv));
        $('#add-prouduct').addClass("hide");
    }
    function displayPage() {
        $('#add-prouduct').removeClass("hide");
    }
    /*
    * Constructor function
    * */
    function Product(name,description,quantity,price) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    function checkout() {
        window.location.href = "billing.jsp";
    }

    function processData(data) {
        alert(data.id);
    }

    //login
    function loadLoginPage(){
        //$.ajax({ "url": "login.jsp", "type": "GET", "success": myAjaxSuccessFunction, "error": ajaxFailure});
        window.location.href = "login.jsp";
    }
    function myAjaxSuccessFunction() {
       // alert("page loaded");
        $.get('login.jsp')

    }

});

