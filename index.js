$(function () {
    $("#Search").on("click", function () {
        // Pricing Checks
        let maxPrice = $("#maxAmount").val();
        let maxPriceLength = $("#maxAmount").val().length;
        let price = false;
        let paymentOption = false;


        // If Maximimum Price text Input has any characters in it, price is set to true, if not, it's set to false
        if (maxPriceLength > 0) {
            price = true
            console.log("price = true")
        } else if (maxPriceLength == 0) {
            price = false
        }


        // Check if Payment Option checkboxes are checked, if so, the payment option checkbox filters are enabled,if not, the search ignores them
        console.log($('[name="paymentOption"]:checked').length)
        if ($('[name="paymentOption"]:checked').length > 0) {
            paymentOption = true;
            console.log("Payment Options are enabled")
        } else if ($('[name="paymentOption"]:checked').length == 0) {
            paymentOption = false;
        }
        // Pricing Checks END


        // Category Check
        let carType = false;
        let carChecked = false;

        // Check if Car type Checkboxes are checked
        if ($('[name="cars"]:checked').length > 0) {
            carType = true
        } else if ($('[name="cars"]:checked').length == 0) {
            carType = false
        }

        // Category Check END







        var output = "<ul>";
        $.getJSON('inventory.json', function (data) {
            for (var i in data.cars) {
                if (carType == true) {
                    $('[name="cars"]:checked').each(function (checkbox) {
                        if ($(this).val() == data.cars[i].carType) {
                            // If only one of the checkboxes are marked
                            if ($('[name="paymentOption"]:checked').length == 1) {
                                // if the checkbox marked is for purchase onlyy
                                if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                    if (data.cars[i].price <= maxPrice || price == false) {
                                        output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='financing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>" + data.cars[i].occupacy + "</div>";
                                    }
                                } else {
                                    // If the checkbox checked is for Finance only 
                                    if (data.cars[i].Finance <= maxPrice || price == false) {
                                        output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='financing'><div class='price-section'>Finance Price<li class='price-list'>" + "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>" + data.cars[i].occupacy + "</div>";
                                    }
                                }
                            } else {
                                // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                if (data.cars[i].price <= maxPrice || price == false) {
                                    output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div>" + "<div class='price-section'>Finance Price<li class='price-list'>" + "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>" + data.cars[i].occupacy + "</div>";
                                }
                            }
                        } else {
                            
                        }
                    });
                } else {
                    // If only one of the checkboxes are marked
                    if ($('[name="paymentOption"]:checked').length == 1) {
                        // if the checkbox marked is for purchase onlyy
                        if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                            if (data.cars[i].price <= maxPrice || price == false) {
                                output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='financing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>" + data.cars[i].occupacy + "</div>";
                            }
                        } else {
                            // If the checkbox checked is for Finance only 
                            if (data.cars[i].Finance <= maxPrice || price == false) {
                                output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='financing'><div class='price-section'>Finance Price<li class='price-list'>" + "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>" + data.cars[i].occupacy + "</div>";
                            }
                        }
                    } else {
                        // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                        if (data.cars[i].price <= maxPrice || price == false) {
                            output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div>" + "<div class='price-section'>Finance Price<li class='price-list'>" + "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeedUpgraded + "</p>" + "<h2>Max Occupacy</h2><p>" + data.cars[i].occupacy + "</div>";
                        }
                    }
                }



            }
            output += "</ul>";
            document.getElementById("Placeholder").innerHTML = output;
        });
    });

});