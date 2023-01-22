
$(function () {
    $("#Search").on("click", function () {
        let maxPrice            =  $("#maxAmount").val();
        let maxPriceLength      =  $("#maxAmount").val().length;
        let price               =  false;
        let paymentOption       =  false;
        // if (maxPriceLength > 0) {
        //     price = true
        //     console.log("price = true")
        // } else if (maxPriceLength == 0) {
        //     price = false
        // }
        
        // Check if Payment Option checkboxes are checked
        console.log($('[name="paymentOption"]:checked').length)
        if ($('[name="paymentOption"]:checked').length > 0) {
            paymentOption = true;
            console.log("Payment Options are enabled")
        } else if ($('[name="paymentOption"]:checked').length == 0) {
            paymentOption = false;
        }



        var output = "<ul>";
        $.getJSON('inventory.json', function (data) {
            for (var i in data.cars) {
                if ($('[name="paymentOption"]:checked').length == 1) {
                    if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                        if (data.cars[i].price <= maxPrice) {
                            output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='financing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                        }
                    } else {
                        if (data.cars[i].Finance <= maxPrice) {
                            output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='financing'><div class='price-section'>Finance Price<li class='price-list'>" +  "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                        }
                    }
                }  
                else {
                    if (data.cars[i].price <= maxPrice) {
                        output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div>" + "<div class='price-section'>Finance Price<li class='price-list'>" + "$" + data.cars[i].Finance.toLocaleString('en-us')  + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                    }
                    }  
                
                            
            }
            output += "</ul>";
            document.getElementById("Placeholder").innerHTML = output;
        });
    });

});