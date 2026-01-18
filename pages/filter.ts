import { expect, Page } from "@playwright/test";
import { filterPanelLocators } from "../utils/locators/filter";
import { maxPriceFilter } from "../utils/constants/filter";



export class FilterComponent {

    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async openFilterPanel() {
        const filterButton = this.page.locator(filterPanelLocators.filterButtonLocator);
        await filterButton.click();

        const filterDialog = this.page.getByRole('dialog');
        expect(filterDialog).toBeVisible();
    }

    async applyEligibilityFilter() {
        const eligibilityFilterButton = this.page.getByRole('region', { name: 'Éligible au financement' }).getByTestId('eligibleAuFinancement-true')
        await eligibilityFilterButton.click();
        expect(eligibilityFilterButton).toHaveAttribute('data-state', 'checked');
    }
    async setMaxInputValue() {
        const budgetRegion = this.page.getByRole('region', { name: 'Budget' });
        const maxInput = budgetRegion.getByRole('spinbutton').last();
        await maxInput.fill(maxPriceFilter.toString());
        await expect(maxInput).toHaveValue(maxPriceFilter.toString());
    }

    async ApplyFilters() {
        const filterLabel = this.page.getByRole('button', { name: 'Appliquer' });
        await filterLabel.click();
    }

}


