import { test, expect } from '@playwright/test';


import { HomePage } from '../pages/home.js';



test('test home page interactions', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goToHomePage();
  await homePage.waitForPageLoad();

  await homePage.expectToBeOnHomePage();
  await homePage.handlePopupIfPresent();

  await homePage.openBrandDropDown();
  await homePage.selectBrand();
  await homePage.expectBrandToBeSelected();
  await homePage.confirmBrandSelection();
  
  await homePage.openCategoryDropDown();
  await homePage.selectCategory();
  await homePage.expectCategoryToBeSelected();
  await homePage.confirmCategorySelection();

  await homePage.clickSearchButton();

  
  
});

