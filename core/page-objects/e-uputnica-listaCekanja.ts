import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ListaCekanja extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    private url = testData.url2; // URL from data.json
    private klinikaButton = By.xpath("/html/body/div[2]/main/article/div/div[2]/div[2]"); 
    private klinikaInput = By.xpath("//option[contains(text(),'Klinika za očne bolesti')]"); 

   // private pretragaButton = By.xpath("//button[contains(@class, 'btn btn-primary search-btn')]");  
    private pretragaButton = By.className("btn btn-primary search-btn text-white text-center px-4"); // Updated to use className

   // Navigate to lista cekanja page
    async navigateToListaCekanjaPage() {
        await this.navigateTo(this.url); 
        await this.driver.manage().window().maximize(); 
    }

    //Click on "Odaberite kliniku" 
    async clickClinicDropdown() {
        const dropdown = await this.findElement(this.klinikaButton);
        await dropdown.click();  
    }

    //Click on dropdown clinic
    async selectClinic() {
        await this.driver.sleep(1000);
        const clinicOption = await this.findElement(this.klinikaInput);
        await clinicOption.click();  // Click to select the clinic
        await this.driver.sleep(100);
    }
     // Click on the "Pretraga" button
     async clickPretragaButton() {
        const button = await this.findElement(this.pretragaButton);
        await button.click();  
        await this.driver.sleep(1000);

    }


}