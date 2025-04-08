import { WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { RfzoListaCekanja } from "../core/page-objects/rfzo-lista-cekanja";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let rfzo_listaCekanja: RfzoListaCekanja;


beforeAll(async () => {
    driver = await createDriver(testData.rfzo_klinicki_beograd.url);  
    rfzo_listaCekanja = new RfzoListaCekanja(driver); 
});
jest.setTimeout(20000);  


test("Navigate to rfzo lista cekanja Beograd", async () => {
    await rfzo_listaCekanja.navigateToListaCekanjaPage();

});


afterAll(async () => {
    await quitDriver(driver);  
});