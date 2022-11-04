import { expect, Page, Locator } from "@playwright/test";
import { url } from "../utils/formUrls";
import { generateRandomId, rgbToHex } from "../utils/helpers/helper";

export class BasePage {

	readonly page: Page;
	readonly loading: Locator;
	readonly title: Locator;
	readonly description: Locator;
	readonly applyBtn: Locator;
	readonly clearBtn: Locator;
	readonly cancelBtn: Locator;
	readonly saveBtn: Locator;
	readonly table: Locator;
	readonly errorMessage: Locator;
	readonly latitude: Locator;
	readonly longitude: Locator;
	readonly saveCoordinatesButton: Locator;
	readonly drawerSaveButton: Locator;
	readonly drawerCancelButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.loading = page.locator("div.loading");
		this.title = page.locator("text=Form Title");
		this.description = page.locator("//*[@id='root']/div/div/form/div[1]/div/div[1]/span[2]");
		this.applyBtn = page.locator("text=Apply");
		this.clearBtn = page.locator("text=Clear");
		this.cancelBtn = page.locator("text=Cancel");
		this.saveBtn = page.locator("text=Save");
		this.table = page.locator("table");
		this.errorMessage = page.locator("p.Mui-error");
		this.latitude = page.locator("#lat");
		this.longitude = page.locator("#lng");
		this.saveCoordinatesButton = page.locator("[type='DRAWER'] button", { hasText: "Save Coordinates"})
		this.drawerSaveButton = page.locator("[type='DRAWER'] button", { hasText: "Save" });
		this.drawerCancelButton = page.locator("[type='DRAWER'] button", { hasText: "Cancel" });
	}

	async visit(page_path: string, element: Locator): Promise<void> {
		await this.page.goto(url(page_path), { timeout: 900000 });
		await element.waitFor();
	}

	async validateSnapshot(component: Locator, name: string): Promise<void> {
		await component.waitFor({ state: "visible" });
		await component.waitFor({ state: "attached" });
		await this.loading.waitFor({ state: "detached" });
		expect(await component.screenshot()).toMatchSnapshot("dataview-" + name + ".png", { threshold: 0.3, maxDiffPixelRatio: 0.3 })
	}

	async wait(timeout = 500): Promise<void> {
		await this.page.waitForTimeout(timeout);
	}

	async waitForElementLoad(): Promise<void> {
		await this.loading.waitFor({ state: "detached" });
	}

	async clearAllValuesFromField(): Promise<void> {
		await this.page.keyboard.press("Home");
		await this.page.keyboard.down("Shift");
		await this.page.keyboard.press("End");
		await this.page.keyboard.up("Shift");
		await this.page.keyboard.press("Backspace");
	}

	async getElementWidth(element:Locator):Promise<number> {
		await element.waitFor({ state: "visible" });
		const width = (await ((element).evaluate(el => getComputedStyle(el).width))).split("px")[0];
		const leftPadding = ((await ((element).evaluate(el => getComputedStyle(el).paddingLeft))).split("px")[0]);
		const rightPadding = ((await ((element).evaluate(el => getComputedStyle(el).paddingRight))).split("px")[0]);
		return Number(width) + Number(leftPadding) + Number(rightPadding);
	}

	async getAutogeneratedText(length: number): Promise<string> {
		return generateRandomId(length);
	}

	async getLimitOfMaxChar(locator: Locator): Promise<number> {
		const textContent = await locator.textContent();
		return Number(textContent?.split("/")[1]);
	}

	async getNumberOfCharactersInMaxCharField(locator: Locator): Promise<number> {
		const textContent = await locator.textContent();
		return Number(textContent?.split("/")[0]);
	}

	async selectOptionFromDropdown(dropdown: Locator, option:string): Promise<void> {
		await dropdown.click({force: true});
		await this.page.locator("text=" + option).nth(0).click();
	}

	async validateFontColorFromElement(element: Locator, expectedValue: string, isHex: boolean): Promise<void> {
		let elementFontColor = (await ((element).evaluate(el => getComputedStyle(el).color))).split("rgb")[1];
		if (isHex) {
			const color = elementFontColor.slice(1, -1);
			const hex = rgbToHex(Number(color.split(",")[0]), Number(color.split(",")[1]), Number(color.split(",")[2]));
			elementFontColor = hex;
		}
		expect(elementFontColor).toBe(expectedValue);
	}

	async isFontBold(element: Locator): Promise<boolean> {
		const fontWeight = (await ((element).evaluate(el => getComputedStyle(el).fontWeight)));
		if (Number(fontWeight) > 400 || fontWeight === "bold" || fontWeight === "bolder") {
			return true;
		}
		return false;
	}

	async selectAndDeleteText(stringLenght:number): Promise<void> {
		await this.page.keyboard.press("ArrowRight");
		await this.page.keyboard.down("Shift");
		for (let i = 0; i < stringLenght; i++) {
			await this.page.keyboard.press("ArrowLeft");
		}
		await this.page.keyboard.up("Shift");
		await this.page.keyboard.press("Backspace");
	}

	async validateFontWeightFromElement(element: Locator, expectedValue: string): Promise<void> {
		const elementFontWeight = await ((element).evaluate(el => getComputedStyle(el).fontWeight));
		expect(elementFontWeight).toBe(expectedValue);
	}

	async validateMarginValueFromElement(element: Locator, expectedValue: string, isRight: boolean): Promise<void> {
		let elementMargin: string;
		if (isRight) {
			elementMargin = await ((element).evaluate(el => getComputedStyle(el).marginLeft));
		} else {
			elementMargin = await ((element).evaluate(el => getComputedStyle(el).marginRight));
		}
		expect(elementMargin).toBe(expectedValue);
	}

	async getFontFamilyFromElement(element: Locator): Promise<string> {
		return await ((element).evaluate(el => getComputedStyle(el).fontFamily));
	}

	async getHeightFromElement(element: Locator): Promise<string> {
		return await ((element).evaluate(el => getComputedStyle(el).height));
	}

	async getBackgroundColorFromElement(element: Locator): Promise<string> {
		return await ((element).evaluate(el => getComputedStyle(el).backgroundColor));
	}

	async getColorFromElement(element: Locator): Promise<string> {
		return await ((element).evaluate(el => getComputedStyle(el).color));
	}
}
