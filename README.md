
# [Personalized Nutrition Plan Generator](https://www.personalized-nutrition-api.com/)

An AI-powered personalized nutrition plan generator built with Next.js, utilizing OpenAI's API to create tailored dietary recommendations based on user input.

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Features](#features)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Project Dependencies](#project-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Personalized Nutrition Plan Generator** is designed to help users create custom nutrition plans based on personal dietary preferences and goals, utilizing AI to provide personalized suggestions.

## How It Works

The application integrates with:
- **[OpenAI's API](https://openai.com/api/)** (using `text-davinci-003`) to process user inputs and generate personalized nutritional recommendations.
- **[Vercel Edge Functions](https://vercel.com/features/edge-functions)** to enable low-latency, serverless requests and streaming responses for real-time feedback.

When a user submits their dietary preferences through the form, the app constructs a custom prompt for the OpenAI API, processes the response via Vercel Edge functions, and streams the result back to the frontend.

## Features

- **Personalized Nutrition Recommendations**: Generates custom dietary advice based on user input.
- **Real-Time Responses**: Uses streaming for faster response times.
- **Modular UI Components**: Built with Headless UI, Radix UI, and other reusable components.
- **Dark Mode Support**: Tailwind CSS is configured for easy dark mode integration.

## Getting Started

To get started with this project, follow these steps.

### Prerequisites

- **Node.js** (version 16 or later)
- **NPM** (or Yarn)

### Cloning the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/personalized-nutrition-plan-generator.git
cd personalized-nutrition-plan-generator
```

## Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables (see [Environment Variables](#environment-variables)).

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:3000`.

## Environment Variables

To access the OpenAI API, create a `.env` file in the root directory with your API key:

```plaintext
OPENAI_API_KEY=your-openai-api-key
```

You can obtain an API key from [OpenAI](https://beta.openai.com/account/api-keys).

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **OpenAI API**: Provides the AI capabilities for generating personalized nutrition plans.
- **Vercel Edge Functions**: Enables efficient, serverless function execution close to the user.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: Adds static typing to the project, enhancing code reliability.

## Project Dependencies

Below is a summary of the primary dependencies used in this project:

- **UI Libraries**:
  - `@headlessui/react`, `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `@radix-ui/react-slot`: Modular components for building accessible and customizable UIs.
  - `@heroicons/react`, `lucide-react`: Icon libraries for React.
  - `tailwindcss`, `tailwind-merge`, `tailwindcss-animate`, `@tailwindcss/forms`: Styling and form utilities for Tailwind CSS.

- **AI and API**:
  - `openai`: Official OpenAI API client.

- **Animation and Utilities**:
  - `framer-motion`: Animation library for React.
  - `clsx`: Utility for conditionally joining class names.
  - `class-variance-authority`: Adds conditional styling flexibility.

- **Form Handling**:
  - `react-hook-form`: A flexible library for managing form state and validation.
  - `cmdk`: Command menu component.

- **Development Tools**:
  - `typescript`, `postcss`, `autoprefixer`: Development and styling tools.
  - `@types/node`, `@types/react`, `@types/react-dom`: TypeScript type definitions for enhanced editor support.

## Contributing

We welcome contributions to improve this project! Please fork the repository, create a new branch for your feature, and submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Explore the app, and let AI help you create the perfect nutrition plan!
