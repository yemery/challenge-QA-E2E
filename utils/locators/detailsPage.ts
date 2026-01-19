
export const detailsCardLocators = {
  brandLabel: 'p:has-text("Marque:")',
  brandValue: 'p:has-text("Marque:") ~ p.text-primary',
  modelLabel: 'p:has-text("Modèle:")',
  modelValue: 'p:has-text("Modèle:") ~ p.text-primary',
  yearLabel: 'p:has-text("Année:")',
  yearValue: 'p:has-text("Année:") ~ p.text-primary',
  mileageLabel: 'p:has-text("Kilométrage:")',
  mileageValue: 'p:has-text("Kilométrage:") ~ p.text-primary',
  transmissionLabel: 'p:has-text("Transmission:")',
  transmissionValue: 'p:has-text("Transmission:") ~ p.text-primary',
  fuelLabel: 'p:has-text("Carburant:")',
  fuelValue: 'p:has-text("Carburant:") ~ p.text-primary',
  priceValue: 'p.text-accent:has-text("DH")',
  monthlyPayment: 'p:has-text("à partir de")',
  simulationButton: '[data-testid="car-details-simulation-button"]',
};