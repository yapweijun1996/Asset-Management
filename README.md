# Asset.OS - Asset Management Agent

AI-powered personal finance management platform with conversational AI, multi-currency support, and comprehensive portfolio tracking. All data stays in your browser via LocalStorage — no cloud uploads.

**Live Demo**: https://yapweijun1996.github.io/Asset-Management/

## Features

### Asset Portfolio Tracking
- Track **Real Estate, Stocks, Crypto, and Cash** with full CRUD operations
- Per-asset detail drawer showing gain/loss, return %, and valuation history
- Linked liabilities (e.g., mortgage tied to a property) with net equity and LVR (Loan-to-Value Ratio) calculations
- Search, filter by type, and sort by name, cost, valuation, return, debt, or equity

### Transaction Management
- Record **Income, Expense, Buy, and Adjustment** transaction types
- Link transactions to assets and documents (receipts)
- Color-coded entries (green for income, red for expenses, amber for adjustments)
- Responsive layout: card view on mobile, sortable table on desktop

### Budget Management
- Create budgets linked to specific assets
- Real-time tracking: spent vs. total with progress bars
- Overrun alerts at 75% and 90% thresholds
- Debt ratio calculations on linked assets

### Fixed Expense Tracking
- Recurring expenses with configurable day-of-month
- **Region-based filtering**: SG (Singapore), MY (Malaysia), or ALL
- Batch-apply due expenses to generate transactions automatically
- AI auto-categorization via Gemini (reads expense name, suggests category)

### Spending Dashboard
- Total spent (last 30 days) with spending vs. budget progress
- Top 5 category breakdown (pie chart)
- Daily spending trend (line chart)

### Main Dashboard
- **Net Worth** = total assets - total liabilities (all converted to base currency)
- **Cash Flow** = monthly income vs. expenses with future projections from fixed expenses
- Asset allocation pie chart by type
- Pending documents counter, debt ratio, and budget summaries

### Currency Converter
- 50+ currencies supported (SGD default base)
- Real-time exchange rates fetched via Gemini API with local caching
- Bi-directional conversion with swap
- All asset valuations auto-converted to base currency

### Document Management
- Upload PDFs and images, categorize as Contract, Receipt, Statement, or Other
- Link documents to assets or transactions
- Status tracking: Processed / Unprocessed

### AI Copilot (Google Gemini)
- Conversational assistant powered by **Gemini 2.0 Flash**
- **Tool routing** with 5 built-in analysis tools:
  - `calculate_roi` — return on investment for any asset
  - `compare_assets` — side-by-side asset performance comparison
  - `project_budget` — budget/savings projections
  - `analyze_debt_health` — debt ratio and financial health analysis
  - `analyze_cash_flow` — monthly cash flow pattern analysis
- Heuristic keyword fallback if LLM routing fails (supports English, Chinese, Malay keywords)
- Image processing: extract data from receipts, statements, and portfolio screenshots
- Real-time streaming responses

### Multi-Language Support
- English, Chinese, and Malay

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 with lazy-loaded routes and React Suspense |
| Charts | Recharts (pie, bar, line) |
| AI | Google Generative AI SDK (`@google/genai`) — Gemini 2.0 Flash |
| Markdown | Markdown renderer for AI responses and documents |
| Build | Vite with code-splitting and hashed assets |
| Styling | Custom CSS with Inter font family, responsive grid layout |
| Storage | Browser LocalStorage (`AssetOS_DB`, `AssetOS_ExchangeRates`) |
| Hosting | GitHub Pages (static) |

## Data Models

**Asset**: `id, name, type, currentValue, costBasis, currency, code, quantity, unitPrice, unitCost, location, linkedLiabilityId`

**Liability**: `id, name, balance, currency, interestRate, remainingYears, monthlyPayment, maturityDate, linkedAssetId`

**Transaction**: `id, type (INCOME|EXPENSE|BUY|ADJUSTMENT), amount, currency, date, category, description, assetId, linkedDocumentId`

**Fixed Expense**: `id, name, amount, currency, category, dayOfMonth, region (SG|MY|ALL), type (GENERAL|ASSET_CONTRIBUTION), status (APPLIED|UNAPPLIED)`

**Budget**: `id, name, totalAmount, currency, linkedAssets[], notes, category`

**Document**: `id, name, type, status, uploadDate, size, linkedAssetId, linkedTransactionId`

## Key Calculations

| Metric | Formula |
|--------|---------|
| Net Worth | `sum(assets) - sum(liabilities)` (in base currency) |
| Asset Return | `(currentValue - costBasis) / costBasis * 100` |
| Net Equity | `assetValue - linkedLiabilityBalance` |
| Debt Ratio | `totalLiabilities / totalAssets * 100` |
| LVR | `loanBalance / assetValue * 100` |
| Budget Remaining | `totalAmount - sum(matchingTransactions)` |

## Getting Started

This repository contains the production build. To run locally:

```bash
# Serve with any static file server
npx serve .

# Or use Python
python3 -m http.server 8000
```

Then open `http://localhost:3000` (or `:8000` for Python) in your browser.

## Project Structure

```
.
├── index.html                  # Entry point with import map (React, Recharts, Gemini)
├── assets/
│   ├── index-*.js              # Main app bundle (~560KB) — hooks, utilities, AI integration
│   ├── index-*.css             # Compiled styles
│   ├── vendor-react-*.js       # React 19 runtime
│   ├── vendor-charts-*.js      # Recharts library
│   ├── vendor-ai-*.js          # Google Generative AI SDK
│   ├── vendor-markdown-*.js    # Markdown rendering
│   ├── AssetDetailDrawer-*.js  # Asset detail slide-in panel
│   ├── AssetTable-*.js         # Asset list with sorting/filtering
│   ├── BudgetList-*.js         # Budget CRUD and progress tracking
│   ├── CurrencyConverter-*.js  # Multi-currency conversion UI
│   ├── DashboardView-*.js      # Main dashboard with metrics and charts
│   ├── DocumentList-*.js       # Document upload and management
│   ├── FixedExpenseList-*.js   # Recurring expense management
│   ├── SpendingDashboard-*.js  # Spending analytics and trends
│   ├── TransactionList-*.js    # Transaction history and recording
│   └── WelcomeScreen-*.js      # Onboarding flow
```

## Privacy

All data is stored locally in your browser's LocalStorage. No data is uploaded to any server. AI queries send portfolio context to Google Gemini only during active conversations. Exchange rates are cached locally to minimize API calls.

## License

All rights reserved.
