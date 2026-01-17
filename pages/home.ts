import homeLocators from "../utils/locators/home.js";
import homeConstants from "../utils/constants/home.js";
import { test, expect, Page } from '@playwright/test';
import { baseUrl } from "../utils/constants/base.js";




export class HomePage {

    readonly page: Page;
    readonly dropDownLocator: (text: string) => string;
    readonly buttonLocator: (text: string) => string;
    readonly brand: string
    readonly category: string
    readonly checkBoxLocator: (text: string) => string;


    constructor(page: Page) {
        this.page = page;
        this.dropDownLocator = homeLocators.DropDownLocator;
        this.buttonLocator = homeLocators.ButtonLocator;
        this.brand = homeConstants.brand;
        this.category = homeConstants.category;
        this.checkBoxLocator = homeLocators.CheckBoxLocator;
    }

    async goToHomePage() {
        await this.page.goto(baseUrl);

    }
    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }
    async expectToBeOnHomePage() {
        await expect(this.page).toHaveURL(baseUrl);
    }
    async handlePopupIfPresent() {
        const acceptButton = this.page.getByRole('button', {
            name: homeConstants.buttonsText.popUpAccept
        });

        try {
            await acceptButton.waitFor({ state: 'visible', timeout: 3000 });
            await acceptButton.click();
            expect(acceptButton).not.toBeVisible();
        } catch {
        }

    }

    async openBrandDropDown() {
        const brandDropDown = this.page.getByRole('button', {
            name: homeConstants.dropdownText.brand,
            exact: true
        });
        await brandDropDown.click();
        await expect(brandDropDown).toBeVisible();


    }
    async selectBrand() {
        await this.page.click(this.checkBoxLocator(this.brand)).catch(async () => {
            const allBrandCheckboxes = this.page.locator(this.checkBoxLocator(this.brand));
            const count = await allBrandCheckboxes.count();
            if (count > 0) {
                await allBrandCheckboxes.nth(0).click();
            }
        });
    }
    async expectBrandToBeSelected() {
        await expect(this.page.locator(this.checkBoxLocator(this.brand) + homeLocators.CheckedStatusLocator)).toBeChecked();
    }
    async confirmBrandSelection() {
        const buttonLocator = this.page.getByRole('button', { name: homeConstants.buttonsText.confirmSelection });
        await expect(buttonLocator).toBeVisible();
        await buttonLocator.click();
    }

    async openCategoryDropDown() {
        await this.page.getByRole('button', {
            name: homeConstants.dropdownText.category,
            exact: true
        }).click();

    }
    async selectCategory() {
        await this.page.click(this.checkBoxLocator(this.category)).catch(async () => {
            const allCategoryCheckboxes = this.page.locator(this.checkBoxLocator(this.category))
            const count = await allCategoryCheckboxes.count()
            if (count > 0) {
                await allCategoryCheckboxes.nth(0).click();
            }
        });
    }
    async expectCategoryToBeSelected() {
        const checkBoxLocator = this.page.locator(this.checkBoxLocator(this.category) + homeLocators.CheckedStatusLocator);
        await expect(checkBoxLocator).toBeChecked();
    }
    async confirmCategorySelection() {
        const buttonLocator = this.page.getByRole('button', { name: homeConstants.buttonsText.confirmSelection });
        await expect(buttonLocator).toBeVisible();
        await buttonLocator.click();
    }

    async clickSearchButton() {
        const buttonLocator = this.page.locator(this.buttonLocator(homeConstants.buttonsText.searchButton));
        await expect(buttonLocator).toBeVisible();
        await buttonLocator.click();
    }



}