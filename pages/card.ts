import { expect, Locator, Page } from "@playwright/test";

export class VehicleCard {
    readonly card: Locator;
    
    constructor(card: Locator) {
        this.card = card;
    }

    getCardLink() {
        return this.card.locator('a[data-testid^="vehicle-card-"]');
    }

    getTitle() {
        return this.card.locator('h2.text-lynch-500').first();
    }

    getSubtitle() {
        return this.card.locator('h2.text-label-grayLight');
    }

    getMonthlyPrice() {
        return this.card.locator('div.text-primary').filter({ hasText: 'À partir de' });
    }

    getTotalPrice() {
        return this.card.locator('span.text-accent');
    }



    async expectToBeVisible() {
        await expect(this.card).toBeVisible();
    }

}
