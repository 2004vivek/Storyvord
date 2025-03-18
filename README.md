# Shopping App with React

A modern e-commerce shopping application built with React, React Router, Tailwind CSS, and [Fake Store API](https://fakestoreapi.com/).

## Features

- Browse and search products
- Filter products by category
- Sort products by price
- Add/remove items from cart
- Checkout process
- Responsive design for all devices
- Light/dark mode support

## Tech Stack

- React 18
- React Router 6
- TanStack Query (React Query)
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/shopping-app.git
cd shopping-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
shopping-app/
├── public/             # Static files
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   │   └── ui/         # Core UI components
│   ├── contexts/       # React context providers
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── App.jsx         # Main app component
│   └── index.js        # Entry point
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── README.md           # Project documentation
└── tailwind.config.js  # Tailwind CSS configuration
```

## API Information

This project uses the [Fake Store API](https://fakestoreapi.com/) to fetch product data. It provides endpoints for:

- Products listing
- Product categories
- Single product details

## License

This project is open source and available under the [MIT License](LICENSE). 