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
});

jest.setTimeout(20000);  // Timeout set to 20 seconds

//TEST 1 Functional test bug: entering invalid eUPUTNICA number and system still returns results instead of showing error message
test("Navigate to eUPUTNICA search page", async () => {
    await uputnicaHome.navigateToSearchPage();
    await uputnicaHome.performSearch();   
});

afterAll(async () => {
    await quitDriver(driver);  
});