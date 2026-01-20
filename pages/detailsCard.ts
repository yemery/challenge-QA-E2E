import { Page, Locator } from '@playwright/test';
import { detailsCardLocators } from '../utils/locators/detailsPage';

export class DetailsCardPage {
  readonly page: Page;
  
  readonly brandLabel: Locator;
  readonly brandValue: Locator;
  readonly modelLabel: Locator;
  readonly modelValue: Locator;
  readonly yearLabel: Locator;
  readonly yearValue: Locator;
  readonly mileageLabel: Locator;
  readonly mileageValue: Locator;
  readonly transmissionLabel: Locator;
  readonly transmissionValue: Locator;
  readonly fuelLabel: Locator;
  readonly fuelValue: Locator;
  readonly priceValue: Locator;
  readonly monthlyPayment: Locator;
  
  readonly simulationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.brandLabel = page.locator(detailsCardLocators.brandLabel);
    this.brandValue = page.locator(detailsCardLocators.brandValue);
    
    this.modelLabel = page.locator(detailsCardLocators.modelLabel);
    this.modelValue = page.locator(detailsCardLocators.modelValue);
    
    this.yearLabel = page.locator(detailsCardLocators.yearLabel);
    this.yearValue = page.locator(detailsCardLocators.yearValue);
    
    this.mileageLabel = page.locator(detailsCardLocators.mileageLabel);
    this.mileageValue = page.locator(detailsCardLocators.mileageValue);
    
    this.transmissionLabel = page.locator(detailsCardLocators.transmissionLabel);
    this.transmissionValue = page.locator(detailsCardLocators.transmissionValue);
    
    this.fuelLabel = page.locator(detailsCardLocators.fuelLabel);
    this.fuelValue = page.locator(detailsCardLocators.fuelValue);
    
    this.priceValue = page.locator(detailsCardLocators.priceValue).first();
    this.monthlyPayment = page.locator(detailsCardLocators.monthlyPayment);
    
    this.simulationButton = page.locator(detailsCardLocators.simulationButton);
  }

  async waitForDetailsPageToLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.simulationButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isOnDetailsPage(): Promise<boolean> {
    return await this.simulationButton.isVisible() && 
           await this.brandLabel.isVisible();
  }

  async isVehicleInfoVisible(): Promise<boolean> {
    return await this.brandLabel.isVisible() &&
           await this.brandValue.isVisible() &&
           await this.modelLabel.isVisible() &&
           await this.modelValue.isVisible() &&
           await this.yearLabel.isVisible() &&
           await this.yearValue.isVisible() &&
           await this.mileageLabel.isVisible() &&
           await this.mileageValue.isVisible() &&
           await this.transmissionLabel.isVisible() &&
           await this.transmissionValue.isVisible() &&
           await this.fuelLabel.isVisible() &&
           await this.fuelValue.isVisible();
  }

  async isSimulationButtonVisible(): Promise<boolean> {
    return await this.simulationButton.isVisible();
  }
}
