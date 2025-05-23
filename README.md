# Conversational AI Chat Application

This project is a [Next.js](https://nextjs.org) application that provides a conversational interface with an AI Copilot. It allows users to engage in chat conversations and leverage an AI assistant to enhance their experience.

## Key Features

*   Real-time Chat:  Engage in dynamic conversations with a simulated user.
*   AI Copilot:  Utilize the AI Copilot to get assistance and generate responses based on the current conversation. Powered by Google's Gemini AI.
*   Conversation History: The AI Copilot maintains conversation history to provide contextually relevant suggestions.
*   Responsive Layout:  The application features a responsive layout, adapting to different screen sizes and devices.
*   Inbox Simulation: An inbox component simulates a list of contacts and conversations.
*   Local Storage: The AI Copilot's conversation history is saved to local storage for persistance.

## Technologies Used

*   [Next.js](https://nextjs.org):  React framework for building performant web applications.
*   [React](https://react.dev/): JavaScript library for building user interfaces.
*   [Google Gemini API](https://ai.google.dev/): Used to generate the AI Copilot responses.
*   [Lucide React](https://lucide.dev/):  Beautifully simple, pixel-perfect icons.
*   [Tailwind CSS](https://tailwindcss.com/):  CSS framework for rapid UI development.
*   [clsx](https://github.com/lukeed/clsx):  Tiny utility for constructing `className` strings conditionally.

## Getting Started

1.  Clone the repository:

    ```bash
    git clone <your_repository_url>
    cd <your_project_directory>
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  Set up environment variables:

    *   Create a `.env.local` file in the root directory.
    *   Add your Google Gemini API key:

        ```
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```

4.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

5.  Access the application:

    Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Project Structure

```
├── .gitignore
├── README.md
├── app
│   ├── api
│   │   └── copilot
│   │       └── route.js
│   ├── components
│   │   ├── AICopilot.js
│   │   ├── Chat.js
│   │   ├── ConversationalLayout.js
│   │   └── Inbox.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── tsconfig.json
```

*   `app/`: Contains the Next.js application code.
    *   `api/copilot/route.js`: Defines the API endpoint for the AI Copilot, using the Gemini API.
    *   `components/`:  React components used in the application.
        *   `AICopilot.js`:  Component for the AI Copilot interface.
        *   `Chat.js`:  Component for the chat interface.
        *   `ConversationalLayout.js`: Component for the overall conversational layout, combining the Inbox, Chat and AICopilot components.
        *   `Inbox.js`:  Component for the inbox simulation.
    *   `page.js`: The main page component that renders the layout.
    *   `layout.js`: The root layout component.
*   `public/`: Contains static assets, such as images.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
```

Key changes and explanations:

*   Added a "Key Features" Section: This highlights the main functionalities of the application.
*   Added "Technologies Used" Section:  This clarifies what technologies are being used in the project.
*   Improved "Getting Started" Instructions: Added instructions for setting up the `.env.local` file and API key.
*   Detailed Project Structure: Provides a file-by-file description of the `app/` directory contents to aid in understanding the different parts of the app.
*   Updated Dependencies:  The `package.json` dependencies are now referenced.
*   Clearer Language:  Improved the overall clarity and readability of the README.
*   Added Cloning Instructions: Included the `git clone` instructions to get started.

Link to live website: https://assignment-three-taupe-64.vercel.app/