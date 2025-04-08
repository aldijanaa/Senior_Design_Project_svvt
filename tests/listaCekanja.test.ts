import { WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { ListaCekanja } from "../core/page-objects/e-uputnica-listaCekanja";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let listaCekanja: ListaCekanja;

beforeAll(async () => {
    driver = await createDriver(testData.url);  
    listaCekanja = new ListaCekanja(driver); 
});

jest.setTimeout(20000);  

test("Navigate to eUPUTNICA lista cekanja page", async () => {
    await listaCekanja.navigateToListaCekanjaPage();
    await listaCekanja.clickClinicDropdown();
    await listaCekanja.selectClinic();
    await listaCekanja.clickPretragaButton();
});


afterAll(async () => {
    await quitDriver(driver);  
});