import { test, expect, Page } from "@playwright/test";
import { FormFieldAddressPage } from "../../pages/FormFields/FormFieldAddressPage";
import { randomIntFromInterval } from "../../utils/helpers/helper";
import theme from "../../../src/theme";

test.describe.parallel("FormFields - FormFieldAddress - Kitchen Sink", () => {
	let page: Page;
	let ffAddressPage: FormFieldAddressPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		ffAddressPage = new FormFieldAddressPage(page);
		await ffAddressPage.visitPage();
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate that Postal Code type is equal to String.", async () => {
		await ffAddressPage.addAddressButton.click();
		expect(await ffAddressPage.postalCodeField.getAttribute("type")).toBe("string");
	});

	test("Validate the Postal Code field.", async () => {
		await page.reload();
		await ffAddressPage.addAddressButton.click();
		const randomNumber = randomIntFromInterval(0, 99999999);
		const randomString = await ffAddressPage.getAutogeneratedText(20);
		await ffAddressPage.postalCodeField.type(randomNumber.toString());
		expect(Number(await ffAddressPage.postalCodeField.inputValue())).toBe(randomNumber);
		await ffAddressPage.clearAllValuesFromField(ffAddressPage.postalCodeField);
		await ffAddressPage.postalCodeField.type(randomString);
		expect(await ffAddressPage.postalCodeField.inputValue()).toBe(randomString);
	});

	test("Validate that the user only can add one Physical Address.", async () => {
		await page.reload();
		await ffAddressPage.addAddressButton.click({force: true});
		await ffAddressPage.fillAddresInformation("Physical");
		await expect(ffAddressPage.addressCard).toBeVisible();
		expect(await ffAddressPage.addressCard.textContent()).toContain("Physical Address");
		await ffAddressPage.addAddressButton.click();
		await expect(ffAddressPage.physicalCheckboxOption).not.toBeVisible();
	});

	test("Validate that the user only can add one Billing Address.", async () => {
		await page.reload();
		await ffAddressPage.addAddressButton.click({force: true});
		await ffAddressPage.fillAddresInformation("Billing");
		await expect(ffAddressPage.addressCard).toBeVisible();
		expect(await ffAddressPage.addressCard.textContent()).toContain("Billing Address");
		await ffAddressPage.addAddressButton.click();
		await expect(ffAddressPage.billingCheckboxOption).not.toBeVisible();
	});

	test("Validate that the user only can add one Shipping Address.", async () => {
		await page.reload();
		await ffAddressPage.addAddressButton.click({force: true});
		await ffAddressPage.fillAddresInformation("Shipping");
		await expect(ffAddressPage.addressCard).toBeVisible();
		expect(await ffAddressPage.addressCard.textContent()).toContain("Shipping Address");
		await ffAddressPage.addAddressButton.click();
		await expect(ffAddressPage.shippingCheckboxOption).not.toBeVisible();
	});

	test("Validate that no more than three type of Address can be added.", async () => {
		await page.reload();
		await ffAddressPage.addAddressButton.click({force: true});
		await ffAddressPage.fillAddresInformation("All");
		await expect(ffAddressPage.addAddressButton).toBeDisabled();
	});

	test("Validate that you can add an Address after removing a type of address in the edit.", async () => {
		await page.reload();
		await ffAddressPage.addAddressButton.click({force: true});
		await ffAddressPage.fillAddresInformation("All");
		await ffAddressPage.page.locator("text=Edit").click();
		await ffAddressPage.selectTypeOfAddress("Shipping");
		await ffAddressPage.drawerSaveButton.click();
		await expect(ffAddressPage.addAddressButton).toBeEnabled();
		expect(await ffAddressPage.addressCard.textContent()).not.toContain("Shipping");
	});

	test("Validate that Add Address Drawer Title has grey2 as background color.", async () => {
		const expectedColor = theme.newColors.grey2["100"];
		await page.reload();
		await ffAddressPage.addAddressButton.click({force: true});
		expect(await ffAddressPage.getBackgroundColorFromElement(ffAddressPage.titleAddAddressDrawerWrapper)).toBe(expectedColor);
	});
});
