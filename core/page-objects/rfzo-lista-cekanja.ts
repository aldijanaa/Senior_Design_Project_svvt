import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

//TEST 3 & 4: RFZO - Lista čekanja Klinicki Centar Beograd sistem
export class RfzoListaCekanja extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    private url = testData.rfzo_klinicki_beograd.url; 

    // Navigate to rfzo lista cekanja page
    async navigateToListaCekanjaPage() {
        await this.navigateTo(this.url); 
        await this.driver.manage().window().maximize(); 
    }
}