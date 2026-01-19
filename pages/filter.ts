import { expect, Page } from "@playwright/test";
import { filterPanelLocators } from "../utils/locators/filter.js";
import filterConstants, { maxPriceFilter } from "../utils/constants/filter.js";



export class FilterComponent {

    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async openFilterPanel() {
        const filterButton = this.page.locator(filterPanelLocators.filterButtonLocator);
        await filterButton.click();

        const filterDialog = this.page.getByRole('dialog');
        await expect(filterDialog).toBeVisible();
    }

    async applyEligibilityFilter() {
        const eligibilityFilterButton = this.page
            .getByRole('region', { name: filterConstants.regions.eligibility })
            .getByTestId(filterConstants.testIds.eligibilityTrue);
        
        await eligibilityFilterButton.click();
        await expect(eligibilityFilterButton).toHaveAttribute(
            filterConstants.attributes.dataState,
            filterConstants.attributes.checked
        );
    }
    async setMaxInputValue() {
        const budgetRegion = this.page.getByRole('region', { name: filterConstants.regions.budget });
        const maxInput = budgetRegion.getByRole('spinbutton').last();
        
        await maxInput.fill(maxPriceFilter.toString());
        await expect(maxInput).toHaveValue(maxPriceFilter.toString());
    }

    async applyFilters() {
        const applyButton = this.page.getByRole('button', { name: filterConstants.buttons.apply });
        await applyButton.click();
        
        const filterDialog = this.page.getByRole('dialog');
        await expect(filterDialog).not.toBeVisible();
    }

    async expectFilteredCards() {
        const vehiclesContainer = this.page.getByTestId("vehicles");
        const vehicleCards = vehiclesContainer.locator('span').filter({ 
            has: this.page.locator('[data-testid^="vehicle-card-"]') 
        });
        
        await this.page.waitForLoadState('networkidle');
        
        const cardCount = await vehicleCards.count();
        
        for (let i = 0; i < cardCount; i++) {
            const card = vehicleCards.nth(i);
            const priceLabel = card.locator('span.text-accent');
            
            await priceLabel.waitFor({ state: 'visible' });
            const priceText = await priceLabel.textContent();

            const priceValue = priceText ? parseFloat(priceText.replace(/[^0-9]/g,"")) : 0;
            expect(priceValue).toBeLessThanOrEqual(maxPriceFilter);
        }
    }

}


