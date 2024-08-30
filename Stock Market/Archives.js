document.getElementById("companyName").addEventListener("change", (event) => {
    var companyName = event.target.value;
    console.log(companyName);
    companyName = companyName.substring(0, 3).toUpperCase();
    console.log(companyName);
    document.getElementById("stockSymbol").value = companyName;
});

function Administrator() {
    var companyPrototype = {
        companyName: "",
        stockSymbol: "",
        stockPrice: 0,
        availableStocks: 0,
    };

    var companyList = [];

    var messages = {
        successMessage: "Company listed successfully!",
        errorMessage: "Error adding company!",
        companyNotFound: "Company not found!",
        modificationSuccessful: "Company modified successfully!"
    }

    var validationFunctions = {
        validateDetails: function (
            companyName,
            stockSymbol,
            stockPrice,
            availableStocks
        ) {
            return (
                (companyName !== "") &&
                (stockSymbol !== "") &&
                (stockPrice !== 0) &&
                (availableStocks !== 0) 
            )
        },
    };

    var renderFunctions = {
        appendCompany: () => {
            var framgment = document.createDocumentFragment();
            var companyRow = document.createElement('tr');

            for (var [key, value] of Object.entries(companyList)) {
                var companyCell = document.createElement("td");
                companyCell.textContent = value;
                companyRow.appendChild(companyCell);
            }

            console.log(companyRow);
            framgment.appendChild(companyRow);
            document.getElementById("stockListing").appendChild(framgment);
        }
    };

    var modificationFunctions = {
        modifyCompany: (
            companyName,
            stockSymbol,
            stockPrice,
            availableStocks
        ) => {
            let companyToBeModified = companyList.find((company) => (company.companyName === companyName));

            if(companyToBeModified !== undefined) {
                companyToBeModified.companyName = companyName;
                companyToBeModified.ststockSymbol = stockSymbol;
                companyToBeModified.stockPrice = stockPrice;
                companyToBeModified.availableStocks = availableStocks;

                return messages.modificationSuccessful;
            } else {
                return messages.companyNotFound;
            }
        } 
    };

    var updateFunctions = {
        addCompany: (
            companyName,
            stockSymbol,
            stockPrice,
            availableStocks
        ) => {
            if (
                validationFunctions.validateDetails(
                    companyName,
                    stockSymbol,
                    stockPrice,
                    availableStocks
                )
            ) {
                var currentCompany = Object.create(companyPrototype);
                
                currentCompany.companyName = companyName;
                currentCompany.stockSymbol = stockSymbol;
                currentCompany.stockPrice = stockPrice;
                currentCompany.availableStocks = availableStocks;

                companyList.push(currentCompany);
                return messages.successMessage;
            } else {
                return messages.errorMessage;
            }
        },
    };

    return {
        renderFunctions , 
        updateFunctions , 
        modificationFunctions
    }
}
