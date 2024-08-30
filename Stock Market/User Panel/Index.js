import { CompanyRenderer } from "../CompanyClass.js";
import { CompanyUser } from "../CompanyClass.js";

var companyRenderer = new CompanyRenderer();
var conmpanyUser = new CompanyUser();

companyRenderer.renderCompanyDetails();
companyRenderer.renderCompanyDropdown();

document.getElementById("companies").addEventListener("change", () => {
    const selectedCompany = companyRenderer.getCompanyDetailsFromDropDown();
    companyRenderer.renderCompanyInformationFromDropDown(selectedCompany);
});

document.getElementById('buyStocks').addEventListener('click' , (event) => {
    event.preventDefault();

    const quantity = conmpanyUser.getBuyQuantity();
    const selectedCompany = companyRenderer.getCompanyDetailsFromDropDown();

    conmpanyUser.buyStocks(selectedCompany , quantity);
    companyRenderer.renderCompanyInformationFromDropDown(selectedCompany);
    companyRenderer.renderCompanyDetails();
})
