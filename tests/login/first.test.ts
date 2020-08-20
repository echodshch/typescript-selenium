import { Builder, WebDriver, Capabilities, By } from "selenium-webdriver";
import { LoginPage } from "../../pagesObject/login.po";
import { CalendarPage } from "../../pagesObject//calendar.po";
import { App } from "../../pagesObject/config.po";
import { SeleniumUtils } from "../../utils/se.utils";

interface IAssert {
  equal: (actual: Object, expected: Object) => void;
}

require("chromedriver");
const assert: IAssert = require("assert");

let capabilities = Capabilities.chrome();

capabilities.set("goog:chromeOptions", {
  args: [
    "--lang=en",
    "disable-infobars",
    "--disable-plugins",
    //"--headless"
  ]
});

describe("Login form", function () {
  let driver: WebDriver;
  let page: LoginPage;
  let calendarPage: CalendarPage;
  let browser: SeleniumUtils;

  before(async function () {
    driver = await new Builder().withCapabilities(capabilities).build();
    await driver.get('http://lab2.webtm.ru/');
    await driver.sleep(1000);
    driver.findElement(By.css('#input_6')).sendKeys('w@w.w');
    driver.findElement(By.css('#input_7')).sendKeys('w');
    (await driver.findElement(By.css('[type="button"]'))).click()
    await driver.sleep(3000);
  });

  it("Add button, negative", async function () {
    (await driver.findElement(By.css('md-tab-item:nth-child(2)'))).click();
    await driver.sleep(500);
    let SaveButton = driver.findElement(By.css('[ng-click="ctrl.save()"]'));
    let isExist = SaveButton.then(()=> true, ()=> false);
    await assert.equal(await isExist, false);
  });

function isExist(selector: string){
    let SaveButton = driver.findElement(By.css(selector));
    return SaveButton.then(()=> true, ()=> false);
  }

  // it("Positive test", async function () {
  //   browser.go(App.url);
  //   await page.isLoad();
  //   await browser.keys(page.email(), App.user.login);
  //   await browser.keys(page.password(), App.user.password);
  //   await browser.click(page.submit());
  //   await calendarPage.isLoad();
  //   let isCalendarPage = await calendarPage.isPage();
  //   await browser.click(calendarPage.buttonExit());
  //   await assert.equal(isCalendarPage, true);
  // });

  // it("Negative test", async function () {
  //   browser.go(App.url);
  //   await page.isLoad();
  //   await browser.sleep(2000);
  //   await browser.keys(page.email(), App.user.login);
  //   await browser.keys(page.password(), "qweqweqweqwe");
  //   await browser.click(page.submit());
  //   await page.isLoad();
  //   await assert.equal(await page.isPage(), true);
  // });

  after(() => driver && driver.quit());
});
