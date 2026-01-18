import homeLocators from "../utils/locators/home.js";
import homeConstants from "../utils/constants/home.js";
import { expect, Page } from '@playwright/test';
import { baseUrl } from "../utils/constants/base.js";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToHomePage() {
        await this.page.goto(baseUrl);
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
        } catch {
        }
    }

    private async selectDropdownOption(dropdownName: string, optionValue: string) {
        const dropdown = this.page.getByRole('button', {
            name: dropdownName,
            exact: true
        });
        await dropdown.click();
        await expect(dropdown).toBeVisible();

        const option = this.page.getByRole('option', { name: optionValue });
        await option.click();
        await expect(option).toHaveAttribute('aria-selected', 'true');

        const confirmButton = this.page.getByRole('button', {
            name: homeConstants.buttonsText.confirmSelection
        });
        await expect(confirmButton).toBeVisible();
        await confirmButton.click();
    }

    async selectBrand() {
        await this.selectDropdownOption(
            homeConstants.dropdownText.brand,
            homeConstants.brand
        );
    }

    async selectCategory() {
        await this.selectDropdownOption(
            homeConstants.dropdownText.category,
            homeConstants.category
        );
    }

    async clickSearchButton() {
        const searchButton = this.page.locator(
            homeLocators.ButtonLocator(homeConstants.buttonsText.searchButton)
        );
        await expect(searchButton).toBeVisible();
        await searchButton.click();
    }
}