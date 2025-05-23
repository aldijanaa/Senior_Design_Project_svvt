import { By, WebDriver, WebElement, until } from "selenium-webdriver";

export default class BasePage {
    protected driver: WebDriver;
    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async getTitle(){
        return await this.driver.getTitle();
    }
    async checkMatchingElements(selector: By, matchingItem: string){
        const element = await this.findElement(selector);
        const elementText = await element.getText();
        expect(elementText).toMatch(matchingItem);
    }
    async findElement(selector: By) {
        return await this.driver.findElement(selector);
    }

    async checkTitle(page: { getTitle: () => Promise<string>}, page_title: string){
        let title = await page.getTitle();
        expect(title).toMatch(page_title);
    }  
    async findElementAndClick(selector: By){
        await this.driver.wait(until.elementLocated(selector),10000).click();
    }
    async waitAndClick(elementLocator, timeout) {
        await this.driver.wait(until.elementLocated(elementLocator), timeout).click();
    }
   
    async waitForElement(elementLocator, timeout) {
        return this.driver.wait(until.elementLocated(elementLocator), timeout);
    }
    async hoverElement(element: WebElement) {
        const actions = this.driver.actions({ bridge: true });
        await actions.move({ duration: 2000, origin: element, x: 0, y: 0 }).perform();
    }
    async findElements(locator: By) {
        return await this.driver.findElements(locator);
    }
    async fillInputField(inputField: By, text: string) {
        await (await this.findElement(inputField)).sendKeys(text);
    }
     //method: to navigate to specific url 
    async navigateTo(url: string) {
        await this.driver.get(url);
        await this.driver.manage().window().maximize(); // (optional) maximize the window after navigating to the URL
    }
    
    // Method to click a button
    async clickButton(selector: By) {
        const buttonElement = await this.findElement(selector);
        await buttonElement.click();
    }

    //Method: wait for element to be visible
    async waitForElementVisible(locator: By, timeout: number) {
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        return this.driver.wait(until.elementIsVisible(element), timeout);
    }

    async safeSendKeys(locator: By, text: string) {
        try {
            const element = await this.driver.wait(until.elementLocated(locator), 10000);
            await this.driver.wait(until.elementIsVisible(element), 10000);
            await element.clear(); // Clear input if needed
            await element.sendKeys(text);
        } catch (error) {
            if (error.name === 'StaleElementReferenceError') {
                // Retry once on stale element
                console.log("Retrying sendKeys due to stale reference...");
                const element = await this.driver.wait(until.elementLocated(locator), 10000);
                await this.driver.wait(until.elementIsVisible(element), 10000);
                await element.sendKeys(text);
            } else {
                throw error;
            }
        }
    }
    
}