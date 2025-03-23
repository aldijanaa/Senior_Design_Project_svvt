import { WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { UputnicaHome } from "../core/page-objects/e-uputnica-homepPage";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let uputnicaHome: UputnicaHome;

beforeAll(async () => {
    driver = await createDriver(testData.url);  
    uputnicaHome = new UputnicaHome(driver); 
}, 10000);

test("Navigate to eUPUTNICA search page", async () => {
    await uputnicaHome.navigateToSearchPage();
    await uputnicaHome.performSearch();   
    
   
}, 20000);

// Regression Test 1: Perform search action
/*test("eUPUTNICA search functionality", async () => {

    const searchValue = testData.euputnica_number; 
    await uputnicaHome.performSearch(searchValue); 

    const pageTitle = await uputnicaHome.getTitle();
    expect(pageTitle).toMatch("Results"); 
}, 10000);*/

afterAll(async () => {
    await quitDriver(driver);  
}, 20000);