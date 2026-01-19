import { Page, Locator } from "@playwright/test";
import { VehicleCard } from "./card.js";

export class ResultsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getVehiclesContainer() {
        return this.page.getByTestId("vehicles");
    }

    getVehicleCardSpans() {
        const vehiclesContainer = this.getVehiclesContainer();
        return vehiclesContainer.locator('span').filter({ 
            has: this.page.locator('[data-testid^="vehicle-card-"]') 
        });
    }

    async getAllVehicleCards(): Promise<VehicleCard[]> {
        const cardSpans = this.getVehicleCardSpans();
        const count = await cardSpans.count();
        const cards: VehicleCard[] = [];

        for (let i = 0; i < count; i++) {
            cards.push(new VehicleCard(cardSpans.nth(i)));
        }

        return cards;
    }

    getVehicleCardByIndex(index: number): VehicleCard {
        const cardSpan = this.getVehicleCardSpans().nth(index);
        return new VehicleCard(cardSpan);
    }

    getVehicleCardByTestId(testId: string): VehicleCard {
        const cardSpan = this.getVehiclesContainer()
            .locator('span')
            .filter({ has: this.page.locator(`[data-testid="${testId}"]`) });
        return new VehicleCard(cardSpan);
    }

    async getVehicleCardsCount(): Promise<number> {
        return await this.getVehicleCardSpans().count();
    }

   

    async expectResultsToBeLoaded() {
        await this.getVehiclesContainer().waitFor({ state: 'visible' });
    }

    async waitForVehicleCards() {
        await this.getVehicleCardSpans().first().waitFor({ state: 'visible', timeout: 10000 });
    }

    async clickOnFirstVehicleCard() {
        const firstCard = this.getVehicleCardByIndex(0);
        const cardLink = firstCard.getCardLink();
        await cardLink.click();
    }
}
