import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.js';
import { FilterComponent } from '../pages/filter.js';
import { ResultsPage } from '../pages/results.js';
import { DetailsCardPage } from '../pages/detailsCard.js';

test('test home page interactions', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goToHomePage();
  await homePage.expectToBeOnHomePage();
  await homePage.handlePopupIfPresent();

  await homePage.selectBrand();
  await homePage.selectCategory();
  await homePage.clickSearchButton();

  const filterComponent = new FilterComponent(page);
  await filterComponent.openFilterPanel();
  await filterComponent.applyEligibilityFilter();
  await filterComponent.setMaxInputValue();
  await filterComponent.applyFilters();
  await filterComponent.expectFilteredCards();

  const resultsPage = new ResultsPage(page);
  await resultsPage.expectResultsToBeLoaded();
  await resultsPage.waitForVehicleCards();
  await resultsPage.clickOnFirstVehicleCard();

  const detailsCardPage = new DetailsCardPage(page);
  
  await detailsCardPage.waitForDetailsPageToLoad();
  
  expect(await detailsCardPage.isOnDetailsPage()).toBeTruthy();
  
  expect(await detailsCardPage.isVehicleInfoVisible()).toBeTruthy();
  
  expect(await detailsCardPage.isSimulationButtonVisible()).toBeTruthy();

});

