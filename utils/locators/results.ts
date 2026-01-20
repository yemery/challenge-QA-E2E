const resultsLocators = {
    vehiclesContainer: '[data-testid="vehicles"]',
    vehicleCardPrefix: '[data-testid^="vehicle-card-"]',
    vehicleCardById: (testId: string) => `[data-testid="${testId}"]`,
};

export default resultsLocators;
