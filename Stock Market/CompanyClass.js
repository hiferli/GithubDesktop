export class Company {
    static companyList = [
        {
            companyName: "Tata Steel",
            stockSymbol: "TSC",
            currentStockPrice: 1000,
            availableStocks: 20,
        },
        {
            companyName: "Nifty",
            stockSymbol: "NIF",
            currentStockPrice: 2000,
            availableStocks: 100,
        },
    ];

    static getCompaniesList = () => {
        return this.companyList;
    };

    static pushCompany = (companyDetails) => {
        Company.companyList.push(companyDetails);
    };

    static performTransaction = (companyDetails, stockQuantity) => {
        var targetCompany = Company.companyList.find(
            (company) => company.companyName === companyDetails.companyName
        );
        // console.log(targetCompany);
        // console.log(stockQuantity);
        // console.log(companyName);

        if (targetCompany !== undefined) {
            targetCompany.availableStocks -= stockQuantity;

            console.log("Transaction Completed");
            alert("Transaction Successful!");
            // console.log(targetCompany);
            // console.log(Company.getCompaniesList());
        } else {
            alert("Transaction unsuccessful!");
        }
    };
}

export class CompanyAdministration extends Company {
    messages = {
        errorUploadCompanyMessage: "Error Uploading Company",
        successUploadCompanyMessage: "Company Uploaded Successfully",
    };

    fetchCompanyDetails() {
        const companyName = document.getElementById("companyName").value;
        const stockSymbol = document.getElementById("stockSymbol").value;
        const currentStockPrice =
            document.getElementById("currentStockPrice").value;
        const availableStocks =
            document.getElementById("availableStocks").value;

        return {
            companyName,
            stockSymbol,
            currentStockPrice,
            availableStocks,
        };
    }

    validateCompanyDetails(
        companyName,
        stockSymbol,
        currentStockPrice,
        availableStocks
    ) {
        return (
            companyName !== "" &&
            stockSymbol !== "" &&
            currentStockPrice !== 0 &&
            availableStocks !== 0
        );
    }

    uploadCompanyDetails() {
        var details = this.fetchCompanyDetails();

        if (this.validateCompanyDetails(...Object.values(details))) {
            Company.pushCompany(details);
            console.log(Company.getCompaniesList());

            return {
                status: true,
                message: this.messages.successUploadCompanyMessage,
                data: details,
            };
        } else {
            return {
                status: false,
                message: this.messages.errorUploadCompanyMessage,
                data: undefined,
            };
        }
    }
}

export class CompanyRenderer extends Company {
    clearTableContent() {
        document.getElementById("stockListing").innerHTML = `<tr>
                <th>Company Name</th>
                <th>Company Stock Symbol</th>
                <th>Current Stock Price</th>
                <th>Stocks Available</th>
            </tr>`;
    }

    renderCompanyDetails(data) {
        var currentCompanyList = Company.getCompaniesList();

        if (data === undefined) {
            this.clearTableContent();

            for (const companyDetails of currentCompanyList) {
                var companyRow = document.createElement("tr");
                console.log(companyDetails);
                for (var [key, value] of Object.entries(companyDetails)) {
                    console.log(value);
                    var companyCell = document.createElement("td");
                    companyCell.textContent = value;
                    companyRow.appendChild(companyCell);
                }

                document.getElementById("stockListing").appendChild(companyRow);
            }
        } else {
            var companyRow = document.createElement("tr");
            for (var [key, value] of Object.entries(data)) {
                // console.log(value);
                var companyCell = document.createElement("td");
                companyCell.textContent = value;
                companyRow.appendChild(companyCell);
            }

            document.getElementById("stockListing").appendChild(companyRow);
        }

        // console.log(companyRow);
    }

    renderCompanyDropdown() {
        var select = document.getElementById("companies");

        var currentCompanyList = Company.getCompaniesList();

        for (const companyDetails of currentCompanyList) {
            for (var [key, value] of Object.entries(companyDetails)) {
                if (key === "stockSymbol") {
                    var option = document.createElement("option");
                    option.text = value;
                    option.value = value;

                    select.appendChild(option);
                }
            }
        }
    }

    getCompanyDetailsFromDropDown() {
        var select = document.getElementById("companies");
        var stockInformationDiv = document.getElementById("stockInformation");

        var selectedCompany = select.options[select.selectedIndex].text;

        console.log(selectedCompany);
        return selectedCompany;
    }

    renderCompanyInformationFromDropDown(selectedCompany) {
        var currentCompanyList = Company.getCompaniesList();
        // console.log(currentCompanyList);

        // console.log("Here");
        var details = currentCompanyList.find(
            (company) => company.stockSymbol === selectedCompany
        );
        // console.log(details);

        var stockInformationDiv = document.getElementById("stockInformation");

        if (details !== undefined) {
            console.log("Here");
            var availableStocksParagraph = (document.createElement(
                "p"
            ).innerHTML = `<p class="mb-1 fw-bold">Available Stocks: ${details.availableStocks}</p>`);

            var stockPriceParagraph = (document.createElement(
                "p"
            ).innerHTML = `<p class="mb-0 fw-bold">Stocks Price: ${details.currentStockPrice}</p>`);

            // console.log(stockInformationDiv);

            stockInformationDiv.innerHTML =
                availableStocksParagraph + stockPriceParagraph;
        } else {
            stockInformationDiv.innerHTML = "";
        }
    }
}

export class CompanyUser extends Company {
    getBuyQuantity() {
        // console.log(document.getElementById('buyQuantity').value);
        return document.getElementById("buyQuantity").value;
    }

    validateTransaction(companyDetails, stockQuantity) {
        if (companyDetails === undefined) return false;
        if (stockQuantity === 0 || stockQuantity === undefined) return false;
        return companyDetails.availableStocks >= stockQuantity;
    }

    buyStocks(companyName, stockQuantity) {
        var currentCompanyList = Company.getCompaniesList();
        // console.log("Here");

        var details = currentCompanyList.find(
            (company) => company.stockSymbol === companyName
        );
        // console.log("Here");
        // console.log("Here");

        if (this.validateTransaction(details, stockQuantity)) {
            // console.log("Here");
            Company.performTransaction(details, stockQuantity);
        } else {
            alert(
                "Error! Please ensure to select the adequate company and the buy quantity."
            );
        }
    }
}
