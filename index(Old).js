

// priceInput = document.querySelectorAll(".price-container input")

// $(function () {
//     let priceGap = 1000;
//     $("#slider-range").slider({
//         range: true,
//         min: 1500,
//         max: 5000000,
//         values: [15, 50],
//         slide: function (event, ui) {
//             $("#minAmount").val("$" + ui.values[0].toLocaleString('en-us'));
//             $("#maxAmount").val("$" + ui.values[1].toLocaleString('en-us'));
//    
//     }
// })
//     var minPriceString = $(" #slider-range").slider("values", 0).toLocaleString('en-us');
//     var maxPriceString = $("#slider-range").slider("values", 1).toLocaleString('en-us');
//     $("#amount").val(" $" + minPriceString + " - $" + maxPriceString);

// });









$(function () {
    $("#Search").on("click", function () {
        let maxPrice            =  $("#maxAmount").val();
        let maxPriceLength      =  $("#maxAmount").val().length;
        let price               =  false;
        let carType             =  false;
        let speedLevel          =  false;
        let occupacy            =  false;
        let paymentOption       =  false;
        

        // Check if price is enabled
        if (maxPriceLength > 0) {
            price = true
        } else if (maxPriceLength == 0) {
            price = false
        }
        
        // Check if Car type Checkboxes are checked
        if($('[name="cars"]:checked').length > 0) {
            carType = true
            console.log("Car type true " + $(this).val())
        } else if ($('[name="cars"]:checked').length == 0) {
            carType = false
        }
        // Check if Speed Level checkboxes are checked
        if($('[name="speedLevels"]:checked').length > 0) {
            speedLevel = true
        } else if ($('[name="speedLevels"]:checked').length == 0){
            speedLevel = false
        }
        // Check if Occupacy checkboxes are checked
        if($('[name="occupacies"]:checked').length > 0) {
            occupacy = true
        } else if ($('[name="occupacies"]:checked').length == 0) {
            occupacy = false
        }
        // Check if Payment Option checkboxes are checked 
        if ($('[name="paymentOption"]:checked').length > 0) {
            paymentOption = true;
        } else if ($('[name="paymentOption"]:checked').length == 0) {
            paymentOption = false;
        }
        
        var output = "<ul>";
        $.getJSON('inventory.json', function (data) {
            for (var i in data.cars) {
                console.log("Car Type Before: " + data.cars[i].carType)
                function checkCar() {
                    $('[name="cars"]:checked').each(function (checkbox) {
                        console.log($(this).val() + " " + data.cars[i].carType + " Passing")
                        if ( $(this).val() == data.cars[i].carType) {
                            console.log(data.cars[i].name + " " + data.cars[i].carType +" Success")
                            return true
                        } else {
                            console.log(data.cars[i].name + " " + data.cars[i].carType + " false")
                        }
                    });
                  }
                function checkSpeed() {
                    $('[name="speedLevel"]:checked').each(function (checkbox) {
                        console.log($(this).val() + " Passing")
                        if ($(this).val() == data.cars[i].speedLevel) {
                            console.log($(this).val() + " Success")
                            return true
                        } else {
                            
                        }
                    });
                }
                function checkOccupacy() {
                    $('#occupacy-container [type="checkbox"]:checked').each(function (checkbox) {
                        console.log($(this).val() + " Passing")
                        if ($(this).val() == data.cars[i].occupacy) {
                            console.log($(this).val() + " Success")
                        } else {
                            
                        }
                    });
                }
               
                if ((carType == true && checkCar() === true) || carType == false) {
                        console.log("Success")
                    if ((speedLevel === true && checkSpeed() === true) || speedLevel === false) {
                        if ((occupacy === true && checkOccupacy() === true) || occupacy === false) {
                            if (paymentOption == true) {
                                if ($('[name="paymentOption"]:checked').length == 1 && $('[name="paymentOption"]:checked').val() == 'purchase') {
                                        if (price == true) {
                                            if (maxPrice >= data.cars[i].price) {
                                                output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                                            } 
                                        } else {
                                            output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                                        }
                                        
                                } else if ($('#price [type="checkbox"]:checked').val() == 'finance' && $('[name="paymentOption"]:checked').length == 1) {
                                        if (price == true) {
                                            if (maxPrice >= data.cars[i].finance) {
                                                output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing' id='finance'><div class='price-section' > Finance Price<li class='price-list'>"+ "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy +"</div>";
                                            } 
                                        }
                                }
                                    
                                else if ((data.cars[i].price <= maxprice) && data.cars[i].Finance <= maxPrice) {
                                output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + + "<h2 class='pricing' id='finance'><div class='price-section' > Finance Price<li class='price-list'>"+ "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                                } else {
                                    console.log("err")
                            }
                            } else if (paymentOption == false) {
                                if (price == true) {
                                    if (maxPrice >= data.cars[i].price || maxPrice >= data.cars[i].finance) {
                                        output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                                    }
                                } else if (price == false) {
                                    output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                                }
                            }
                        } 
                    }  
                } 
                    

            }
            output += "</ul>";
            document.getElementById("Placeholder").innerHTML = output;
        });
    });

});