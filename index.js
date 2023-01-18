// const carTemplate = document.querySelector("[data-car-template]")
// const carContainer = document.querySelector("[data-car-container]")



// $.getJSON(data, function (data) {
//     $("#Search").on("click", function () {
//         var speedLevel = $("#speedLevel").val();
//         var minPrice = $("#slider-range").slider("option", "values")[0];
//         var maxPrice = $("#slider-range").slider("option", "values")[1];

//         var output = "<ul>"
//         data = JSON.parse(data)
//         data.forEach(car => {
//             const card = carTemplate.content.cloneNode(true).children[0]
//             const header = card.querySelector("[data-header]")
//             const body = card.querySelector("[data-body]")

//             header.textContent = car.name
//             body.textContent = car.price
//             if (carType == car.carType || carType == "Any") {
//                 if (speedLevel == car.speedLevel || speedLevel == "Any") {
//                     if ((car.price >= minPrice && car.price <= maxPrice)) {
//                         carContainer.append(card)
//                     }
//                 }
//             }

//         })
//     })

// })







$(function () {
    $("#carType").selectmenu();
});

$(function () {
    $("#speedLevel").selectmenu();
});

$(function () {
    $("#occupacy").selectmenu();
});
$(function () {
    $("#budget-type").selectmenu();
});

function formatPrice(obj) {
    obj = "$"+ obj.value.toLocaleString('en-us');
}

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





var minAmount = document.getElementById("minAmount");
var maxAmount = document.getElementById("maxAmount");



$(function () {
    $("#Search").on("click", function () {
        var maxPrice = $("#maxAmount").val();
        var car_list = [];
        var speed_list = [];
        var occupacy_list = [];
        var payment_list = [];
        $('#Type :input:checked').each(function(){
            var category = $(this).val();
            car_list.push(category);
        }); 
        $('#speedType :input:checked').each(function(){
            var category = $(this).val();
            speed_list.push(category);
        });
        $('#occupacy-container :input:checked').each(function(){
            var category = $(this).val();
            occupacy_list.push(category);
        });
        $('.priceInput :input:checked').each(function(){
            var category = $(this).val();
            payment_list.push(category);
        });
        var output = "<ul>";
        $.getJSON('inventory.json', function (data) {
            for (var i in data.cars) {
                if (car_list.includes(data.cars[i].carType)) {
                    if (speed_list.includes(data.cars[i].speedLevel) ) {
                        if (occupacy_list.includes(data.cars[i].occupacy)) {
                            if ((data.cars[i].price <= maxPrice) && payment_list.includes("purchase")) {
                                output += "<div class='card' data-tag='" + data.cars[i].name + "'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
                            } else if (data.cars[i].Finance <= maxPrice && payment_list.includes("finance")){
                                output += "<div class='card' data-tag='" + data.cars[i].name + "'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing' id='finance'><div class='price-section' > Finance Price<li class='price-list'>"+ "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy +"</div>";
                            } else if ((data.cars[i].price <= maxprice) && data.cars[i].Finance <= maxPrice && payment_list.includes("purchase") && payment_list.includes("finance")) {
                                output += "<div class='card' data-tag='" + data.cars[i].name + "'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2>Car Type: " + data.cars[i].carType + "</h2>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h2>"  + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "<h2>Max Occupacy</h2><p>"+ data.cars[i].occupacy + "</div>";
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