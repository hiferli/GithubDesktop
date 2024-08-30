import { CompanyRenderer } from "../CompanyClass.js";
import { CompanyAdministration } from '../CompanyClass.js'

document.getElementById("companyName").addEventListener("change", (event) => {
    var companyName = event.target.value;   
    companyName = companyName.substring(0, 3).toUpperCase();
    document.getElementById("stockSymbol").value = companyName;
});


var companyAdmin = new CompanyAdministration();
var companyRenderer = new CompanyRenderer();
companyRenderer.renderCompanyDetails();

document.getElementById('registerCompany').addEventListener('click' , (event) => {
    event.preventDefault();
    var response = companyAdmin.uploadCompanyDetails();

    if(response.data !== undefined){
        companyRenderer.renderCompanyDetails(response.data);
    }
});
