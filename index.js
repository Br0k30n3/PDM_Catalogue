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
    $("#slider-range").slider({
        range: true,
        min: 1500,
        max: 5000000,
        values: [15, 180],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0].toLocaleString('en-us') + " - $" + ui.values[1].toLocaleString('en-us'));
        }
    });

    var minPriceString = $(" #slider-range").slider("values", 0).toLocaleString('en-us');

    var maxPriceString = $("#slider-range").slider("values", 1).toLocaleString('en-us');

    $("#amount").val(" $" + minPriceString + " - $" + maxPriceString);
});


$(function () {
    $("#Search").on("click", function () {

        var carType = $("#carType").val();
        var speedLevel = $("#speedLevel").val();
        var occupacy = $("#occupacy").val();
        var minPrice = $("#slider-range").slider("option", "values")[0];
        var maxPrice = $("#slider-range").slider("option", "values")[1];

        var output = "<ul>";
        $.getJSON('inventory.json', function (data) {
            for (var i in data.cars) {
                if ((carType == data.cars[i].carType) || (carType == "any")) {
                    if ((speedLevel == data.cars[i].speedLevel) || (speedLevel == "any")) {
                        if ((occupacy == data.cars[i].occupacy) || (occupacy == "any")) {
                            if ((data.cars[i].price || data.cars[i].Finance >= minPrice && data.cars[i].price || data.cars[i].Finance <= maxPrice)) {



                                output += "<div class='card'>" + "<h1>" + data.cars[i].name + "</h1>" + "<h2 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div><div class='price-section'> Finance Price<li class='price-list'>"+ "$" + data.cars[i].Finance.toLocaleString('en-us') + "</li></div></h2>" + "<h2>Speed Level</h2><p>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</p>" + "<h2>Max Speed</h2><p>" + data.cars[i].maxSpeed.toLocaleString('en-us') + "</p>" + "</div>";
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