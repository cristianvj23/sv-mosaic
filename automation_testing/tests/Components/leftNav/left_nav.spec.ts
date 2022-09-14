import { test, expect } from "@playwright/test";
import { LeftNavPage } from "../../../pages/Components/leftNav/LeftNavPage";
import { leftnav_data } from "../../../utils/data/left_nav_data";


test.describe("LeftNav", () => {
	let leftNavPage: LeftNavPage;

	test.beforeEach(async ({ page }) => {
		leftNavPage = new LeftNavPage(page);
		await leftNavPage.visitPage();
	});

	test.skip("Validate left nav basic", async () => {
		await leftNavPage.validateSnapshot(leftNavPage.leftNavDiv, "left_nav");
	});

	test("Validate static element", async () => {
		const lastItem = await leftNavPage.getLastItem();
		expect(await lastItem.textContent()).toBe(leftnav_data.staticItem);
		expect(await lastItem.isVisible()).toBe(true);
	});

	test.skip("Validate static element menu", async () => {
		await (await leftNavPage.getLastItem()).click();
		await leftNavPage.validateSnapshot(await leftNavPage.navDisplayMenu, "nav_display_menu")
	});

	test("Validate full view is active", async () => {
		await leftNavPage.selectTypeOfNavDisplay(leftnav_data.full);
		const numberOfItemsVisible = await leftNavPage.topMenuItems.count();
		expect(numberOfItemsVisible).toBe(18);
	});

	test("Validate icons only view is active", async () => {
		await leftNavPage.selectTypeOfNavDisplay(leftnav_data.iconsOnly);
		const numberOfItemsVisible = await leftNavPage.topMenuItems.count();
		expect(numberOfItemsVisible).toBe(5);
	});

	test("Validate hidden view is active", async () => {
		await leftNavPage.selectTypeOfNavDisplay(leftnav_data.hidden);
		const numberOfItemsVisible = await leftNavPage.topMenuItems.count();
		expect(numberOfItemsVisible).toBe(0);
	});

	test("Validate Title", async () => {
		const item = await leftNavPage.getRandomItems(false);
		const title = await item.textContent();
		await item.click();
		expect(await leftNavPage.title.textContent()).toBe(title);
	});

	test("Validate menus", async () => {
		const item = await leftNavPage.getOptionWithSubmenu(false);
		const titleItem = await item.textContent();
		await item.click();
		const submenu = await leftNavPage.getSubmenu(titleItem);
		const submenuElement = await leftNavPage.getSubmenuElement(submenu);
		const title = await submenuElement.textContent();
		await submenuElement.click();
		await leftNavPage.wait();
		await leftNavPage.title.waitFor({ state: "visible" });
		expect(await leftNavPage.title.textContent()).toBe(title);
	});

	test("Validate menu double", async () => {
		const item = await leftNavPage.getOptionWithSubmenu(true);
		const titleItem = await item.textContent();
		await item.click();
		const submenu = await leftNavPage.getSubmenu(titleItem);
		const submenuElement = await leftNavPage.getSubmenuElement(submenu);
		const subMenuTitle = await submenuElement.textContent();
		await submenuElement.click();
		const subSubmenu = await leftNavPage.getSubmenu(subMenuTitle);
		const subSubmenuElement = await leftNavPage.getSubmenuElement(subSubmenu);
		const title = await subSubmenuElement.textContent();
		await subSubmenuElement.click();
		await leftNavPage.wait();
		expect(await leftNavPage.title.textContent()).toBe(title);
	});
});
