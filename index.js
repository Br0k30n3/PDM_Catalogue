    $(function () {
        $("#minMaxCheckBox").on("click", function () {
            if ($(this).is(":checked")) {
                $("#minAmount").removeAttr("disabled");
                $("#maxAmount2").removeAttr("disabled");
                $("#maxAmount").attr("disabled", "disabled");
                $("#maxCheckBox").prop("checked", false);
            } 
        });
        $("#maxCheckBox").on("click", function () {
            if ($(this).is(":checked")) {
                $("#maxAmount").removeAttr("disabled");
                $("#minMaxCheckBox").prop("checked", false);
                $("#minAmount").attr("disabled", "disabled");
                $("#maxAmount2").attr("disabled", "disabled");
            } 
        });
    });




    $(function () {
        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });



        $("#Search").on("click", function () {
            // Pricing Checks
            const maxPrice = $("#maxAmount").val();
            const maxPriceLength = $("#maxAmount").val().length;
            let price = false;
            let paymentOption = false;

            // If Maximimum Price text Input has any characters in it, price is set to true, if not, it's set to false
            if (maxPriceLength > 0 && !disabled) {
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
            const carChecked = false;

            // Check if Car type Checkboxes are checked
            if ($('[name="cars"]:checked').length > 0) {
                carType = true
            } else if ($('[name="cars"]:checked').length == 0) {
                carType = false
            }

            // Category Check END

            // Speed Check
            let speedLevel = false;

            if ($('[name="speedLevels"]:checked').length > 0) {
                speedLevel = true;
            } else if ($('[name="speedLevels"]:checked').length == 0) {
                speedLevel = false;
            }
            // Speed Check END

            // Occupacy Check
            let occupacy = false;

            if ($('[name="occupacies"]:checked').length > 0) {
                occupacy = true;
            } else if ($('[name="occupacies"]:checked').length == 0) {
                occupacy = false;
            }




            let output = "<ul>";
            $.getJSON('inventory.json', function (data) {
                for (let i in data.cars) {
                    let carPrice = data.cars[i].price
                    const finance = Math.round(carPrice * 0.3333);

                    const purchaseCard = "<div class='card'>" + "<div class='vehicleImg'><img class='carImg' src=" + data.cars[i].carImg + "></div>" + "<div class='info'><h1 class='carName'>" + data.cars[i].name + "</h1>" + "<h2 class='carType'>Car Type: " + data.cars[i].carType + "</h2>" + "<h3 class='financing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h3>" + "<div class='speed-section'><div class='speed-container'><h3>Speed Level</h3><h3>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</h3></div>" + "<div class='speed-container'><h3>Max Speed</h3><h3>" + data.cars[i].maxSpeedUpgraded + "</h3></div></div>" + "<div class='Occupacy-container'><h3>Max Occupacy</h3><h3>" + data.cars[i].occupacy + "</h3></div></div></div>";

                    const financeCard = "<div class='card'>" + "<div class='vehicleImg'><img class='carImg' src=" + data.cars[i].carImg + "></div>" + "<div class='info'><h1 class='carName'>" + data.cars[i].name + "</h1>" + "<h2 class='carType'>Car Type: " + data.cars[i].carType + "</h2>" + "<h3 class='financing'><div class='price-section'>Finance Price<li class='price-list'>" + "$" + finance.toLocaleString('en-us') + "</li></div></h3>" + "<div class='speed-section'><div class='speed-container'><h3>Speed Level</h3><h3>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</h3></div>" + "<div class='speed-container'><h3>Max Speed</h3><h3>" + data.cars[i].maxSpeedUpgraded + "</h3></div></div>" + "<div class='Occupacy-container'><h3>Max Occupacy</h3><h3>" + data.cars[i].occupacy + "</h3></div></div></div>";

                    const card = "<div class='card'>" + "<div class='vehicleImg'><img class='carImg' src=" + data.cars[i].carImg + "></div>" + "<div class='info'><h1 class='carName'>" + data.cars[i].name + "</h1>" + "<h2 class='carType'>Car Type: " + data.cars[i].carType + "</h2>" + "<h3 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div>" + "<div class='price-section'>Finance Price<li class='price-list'>" + "$" + finance.toLocaleString('en-us') + "</li></div></h3>" + "<div class='speed-section'><div class='speed-container'><h3>Speed Level</h3><h3>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</h3></div>" + "<div class='speed-container'><h3>Max Speed</h3><h3>" + data.cars[i].maxSpeedUpgraded + "</h3></div></div>" + "<div class='Occupacy-container'><h3>Max Occupacy</h3><h3>" + data.cars[i].occupacy + "</h3></div></div></div>";

                    if (carType == true) {
                        $('[name="cars"]:checked').each(function (checkbox) {
                            if ($(this).val() == data.cars[i].carType) {
                                if (speedLevel == true) {
                                    $('[name="speedLevels"]:checked').each(function (checkbox) {
                                        if ($(this).val() == data.cars[i].speedLevel) {
                                            if (occupacy == true) {
                                                $('[name="occupacies"]:checked').each(function (checkbox) {
                                                    if ($(this).val() >= data.cars[i].occupacy) {
                                                        // If only one of the checkboxes are marked
                                                        if ($('[name="paymentOption"]:checked').length == 1) {
                                                            // if the checkbox marked is for purchase onlyy
                                                            if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                                                if (data.cars[i].price <= maxPrice || price == false) {
                                                                    output += purchaseCard
                                                                }
                                                            } else {
                                                                // If the checkbox checked is for Finance only 
                                                                if ((finance) <= maxPrice || price == false) {
                                                                    output += financeCard
                                                                }
                                                            }
                                                        } else {
                                                            // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                                            if (carPrice <= maxPrice || price == false) {
                                                                output += card
                                                            }
                                                        }
                                                    }
                                                })

                                            } else {
                                                // If only one of the checkboxes are marked
                                                if ($('[name="paymentOption"]:checked').length == 1) {
                                                    // if the checkbox marked is for purchase onlyy
                                                    if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                                        if (data.cars[i].price <= maxPrice || price == false) {
                                                            output += purchaseCard
                                                        }
                                                    } else {
                                                        // If the checkbox checked is for Finance only 
                                                        if ((finance) <= maxPrice || price == false) {
                                                            output += financeCard
                                                        }
                                                    }
                                                } else {
                                                    // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                                    if (carPrice <= maxPrice || price == false) {
                                                        output += card
                                                    }
                                                }
                                            }
                                        }
                                    })
                                } else {
                                    if (occupacy == true) {
                                        $('[name="occupacies"]:checked').each(function (checkbox) {
                                            if ($(this).val() == data.cars[i].occupacy) {
                                                // If only one of the checkboxes are marked
                                                if ($('[name="paymentOption"]:checked').length == 1) {
                                                    // if the checkbox marked is for purchase onlyy
                                                    if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                                        if (data.cars[i].price <= maxPrice || price == false) {
                                                            output += purchaseCard
                                                        }
                                                    } else {
                                                        // If the checkbox checked is for Finance only 
                                                        if ((finance) <= maxPrice || price == false) {
                                                            output += financeCard
                                                        }
                                                    }
                                                } else {
                                                    // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                                    if (carPrice <= maxPrice || price == false) {
                                                        output += card
                                                    }
                                                }
                                            }
                                        })

                                    } else {
                                        // If only one of the checkboxes are marked
                                        if ($('[name="paymentOption"]:checked').length == 1) {
                                            // if the checkbox marked is for purchase onlyy
                                            if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                                if (data.cars[i].price <= maxPrice || price == false) {
                                                    output += purchaseCard
                                                }
                                            } else {
                                                // If the checkbox checked is for Finance only 
                                                if ((finance) <= maxPrice || price == false) {
                                                    output += financeCard
                                                }
                                            }
                                        } else {
                                            // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                            if (carPrice <= maxPrice || price == false) {
                                                output += card
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    } else {
                        if (speedLevel == true) {
                            $('[name="speedLevels"]:checked').each(function (checkbox) {
                                if ($(this).val() >= data.cars[i].speedLevel) {
                                    if (occupacy == true) {
                                        $('[name="occupacies"]:checked').each(function (checkbox) {
                                            if ($(this).val() == data.cars[i].occupacy) {
                                                // If only one of the checkboxes are marked
                                                if ($('[name="paymentOption"]:checked').length == 1) {
                                                    // if the checkbox marked is for purchase onlyy
                                                    if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                                        if (data.cars[i].price <= maxPrice || price == false) {
                                                            output += purchaseCard
                                                        }
                                                    } else {
                                                        // If the checkbox checked is for Finance only 
                                                        if ((finance) <= maxPrice || price == false) {
                                                            output += financeCard
                                                        }
                                                    }
                                                } else {
                                                    // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                                    if (carPrice <= maxPrice || price == false) {
                                                        output += card
                                                    }
                                                }
                                            }
                                        })

                                    } else {
                                        // If only one of the checkboxes are marked
                                        if ($('[name="paymentOption"]:checked').length == 1) {
                                            // if the checkbox marked is for purchase onlyy
                                            if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                                if (data.cars[i].price <= maxPrice || price == false) {
                                                    output += purchaseCard
                                                }
                                            } else {
                                                // If the checkbox checked is for Finance only 
                                                if ((finance) <= maxPrice || price == false) {
                                                    output += financeCard
                                                }
                                            }
                                        } else {
                                            // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                            if (carPrice <= maxPrice || price == false) {
                                                output += card
                                            }
                                        }
                                    }
                                }
                            })
                        } else {
                            if (occupacy == true) {
                                $('[name="occupacies"]:checked').each(function (checkbox) {
                                    if ($(this).val() >= data.cars[i].occupacy) {
                                        // If only one of the checkboxes are marked
                                        if ($('[name="paymentOption"]:checked').length == 1) {
                                            // if the checkbox marked is for purchase onlyy
                                            if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                                if (data.cars[i].price <= maxPrice || price == false) {
                                                    output += purchaseCard
                                                }
                                            } else {
                                                // If the checkbox checked is for Finance only 
                                                if ((finance) <= maxPrice || price == false) {
                                                    output += financeCard
                                                }
                                            }
                                        } else {
                                            // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                            if (carPrice <= maxPrice || price == false) {
                                                output += card
                                            }
                                        }
                                    }
                                })

                            } else {
                                // If only one of the checkboxes are marked
                                if ($('[name="paymentOption"]:checked').length == 1) {
                                    // if the checkbox marked is for purchase onlyy
                                    if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                        if (data.cars[i].price <= maxPrice || price == false) {
                                            output += purchaseCard
                                        }
                                    } else {
                                        // If the checkbox checked is for Finance only 
                                        if ((finance) <= maxPrice || price == false) {
                                            output += financeCard
                                        }
                                    }
                                } else {
                                    // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                    if (carPrice <= maxPrice || price == false) {
                                        output += card
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