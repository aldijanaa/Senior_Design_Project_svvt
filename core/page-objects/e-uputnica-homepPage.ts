import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


export class UputnicaHome extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }
    
    //TEST 1: Functional test - navigate to eUPUTNICA page and search for eUPUTNICA number
    //private variables for elements
    private searchInput = By.className("search-input");
    private searchButton = By.xpath("/html/body/div[2]/div/div[4]/nav/div[1]/div[3]/button");
    private resultElement = By.xpath("/html/body/div[2]/main/article/div/div/div[2]/div"); 
    private url = testData.url; 

    // Method to navigate to the eUPUTNICA page using the URL from data.json
    async navigateToSearchPage() {
        await this.navigateTo(this.url); 
        await this.driver.manage().window().maximize(); 
    }

   // Method to click on the search input and type in eUPUTNICA number
    async searchForEUPutnica() {
        const inputValue = testData.euputnica_number;
        await this.safeSendKeys(this.searchInput, inputValue);
    }

     // Method to click the search button (blue button)
    async submitSearch() {
        await this.waitForElementVisible(this.searchButton, 10000);
        await this.driver.sleep(1000);
    
        // Re-fetch button and click
        const button = await this.findElement(this.searchButton);
        await button.click();
        await this.driver.sleep(5000);  // More generous pause after clicking
        await this.waitForElementVisible(this.resultElement, 30000);  

    }
    
    // Combined method to perform search action
    async performSearch() {
        await this.searchForEUPutnica();
        await this.submitSearch();
    }
    
}

