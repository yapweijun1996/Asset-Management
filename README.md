# Asset Management Agent

AI-powered personal portfolio tracker and financial management tool built with React.

**Live Demo**: https://yapweijun1996.github.io/Asset-Management/

## Features

- **Asset Portfolio Tracking** - Track and manage assets with detailed views via the Asset Table and Asset Detail Drawer
- **Budget Management** - Create and monitor budgets with the Budget List view
- **Transaction Tracking** - Record income and expenses with full transaction history
- **Spending Dashboard** - Visualize spending patterns with interactive charts (powered by Recharts)
- **Fixed Expense Management** - Track recurring and fixed expenses
- **Currency Converter** - Multi-currency support with SGD as default base currency (supports USD, MYR, and more)
- **Document Management** - Attach and manage financial documents
- **AI Assistant** - Conversational AI agent powered by Google Gemini for portfolio analysis, financial insights, and natural language interaction
- **Welcome Screen** - Guided onboarding for new users

## Tech Stack

- **Frontend**: React 19 with code-splitting and lazy-loaded routes
- **Charts**: Recharts for data visualization
- **AI**: Google Generative AI (`@google/genai`) for the conversational assistant
- **Build**: Vite (production bundle with hashed assets)
- **Styling**: Custom CSS with Inter font family
- **Hosting**: Static site (pre-built assets served from `/assets/`)

## Getting Started

This repository contains the production build output. To run locally:

```bash
# Serve the static files with any HTTP server
npx serve .

# Or use Python
python3 -m http.server 8000
```

Then open [http://localhost:3000](http://localhost:3000) (or port 8000 for Python) in your browser.

## Project Structure

```
.
├── index.html                  # Entry point
├── assets/
│   ├── index-*.js              # Main application bundle
│   ├── index-*.css             # Compiled styles
│   ├── vendor-react-*.js       # React runtime
│   ├── vendor-charts-*.js      # Recharts library
│   ├── vendor-ai-*.js          # Google Generative AI SDK
│   ├── vendor-markdown-*.js    # Markdown rendering
│   ├── AssetDetailDrawer-*.js  # Asset detail view
│   ├── AssetTable-*.js         # Asset list/table
│   ├── BudgetList-*.js         # Budget management
│   ├── CurrencyConverter-*.js  # Currency conversion
│   ├── DashboardView-*.js      # Main dashboard
│   ├── DocumentList-*.js       # Document management
│   ├── FixedExpenseList-*.js   # Fixed expenses
│   ├── SpendingDashboard-*.js  # Spending analytics
│   ├── TransactionList-*.js    # Transaction history
│   └── WelcomeScreen-*.js      # Onboarding screen
```

## License

All rights reserved.
