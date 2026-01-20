import { expect, Locator, Page } from "@playwright/test";
import cardLocators from "../utils/locators/card.js";

export class VehicleCard {
    readonly card: Locator;
    
    constructor(card: Locator) {
        this.card = card;
    }

    getCardLink() {
        return this.card.locator(cardLocators.cardLink);
    }

    getTitle() {
        return this.card.locator(cardLocators.title).first();
    }

    getSubtitle() {
        return this.card.locator(cardLocators.subtitle);
    }

    getMonthlyPrice() {
        return this.card.locator(cardLocators.monthlyPrice).filter({ hasText: 'À partir de' });
    }

    getTotalPrice() {
        return this.card.locator(cardLocators.totalPrice);
    }



    async expectToBeVisible() {
        await expect(this.card).toBeVisible();
    }

}
