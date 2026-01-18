import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.js';
import { FilterComponent } from '../pages/filter.js';

test('test home page interactions', async ({ page }) => {
  const homePage = new HomePage(page);
  
  // Navigate and setup
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
});

