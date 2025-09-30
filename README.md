# Demoblaze E-commerce Automation (Playwright + TypeScript)

This project is an automation framework built with Playwright and Typescript to test the [Demoblaze](https://www.demoblaze.com/) e-commerce application.
---------------------------------------------------------------------------
## Scope
The automation covers:
- Selecting products from the homepage
- Adding products to the cart with rules:
  - If price is between ₹500 and ₹1000 → add once
  - If price is below ₹500 → add twice (simulate quantity = 2)
- Validating cart contents (product names and prices)
- Verifying that the total cart value equals the sum of the product prices
------------------------------------------------------------------------------
## Setup Instructions

1. *Clone the repository*
   ```bash
   git clone <your-repo-url>
   cd demoblaze-playwright