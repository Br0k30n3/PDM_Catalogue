
$(function () {
    $("#Search").on("click", function () {
        let maxPrice            =  $("#maxAmount").val();
        var output = "<ul>";
        $.getJSON('inventory.json', function (data) {
            for (var i in data.cars) {   
                 if (data.cars[i].price <= maxPrice) {
                        output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                    }
                            
                }
            output += "</ul>";
            document.getElementById("Placeholder").innerHTML = output;
        });
    });

});