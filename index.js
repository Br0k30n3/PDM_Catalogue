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
        max: 18000000,
        values: [15, 180],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });

    $("#amount").val(" $" + $(" #slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
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
                            if ((data.cars[i].price >= minPrice && data.cars[i].price <= maxPrice)) {



                                output += "<h1>" + data.cars[i].name + "</h1>" + "<h2><li>" + "$" + data.cars[i].price + "</li></h2>" + "<p>" + data.cars[i].speedLevel + "</p>" + "<p>" + data.cars[i].maxSpeed + "</p>";
                                console.log(output)
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