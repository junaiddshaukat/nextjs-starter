# Next.js Starter Template

A modern Next.js starter template with authentication, database integration, and beautiful UI components.




## Features

- ⚡️ Next.js 14 with App Router
- 🔐 Authentication with NextAuth.js
- 🗄️ MongoDB with Mongoose
- 🎨 Tailwind CSS + Shadcn UI
- 📧 Email support with Nodemailer
- 🔒 Protected routes
- 📱 Responsive design
- 🎯 TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance
- Google OAuth credentials

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (Gmail)
EMAIL_SERVER_USER=your_gmail@gmail.com
EMAIL_SERVER_PASSWORD=your_app_specific_password
EMAIL_FROM=your_gmail@gmail.com
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/junaiddshaukat/nextjs-starter.git
cd nextjs-starter
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # App router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Protected dashboard pages
├── components/            # React components
│   └── ui/               # Shadcn UI components
├── lib/                   # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Authentication

The template uses NextAuth.js with Google as the authentication provider. To set up Google OAuth:

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs (e.g., http://localhost:3000/api/auth/callback/google)
6. Copy the client ID and client secret to your `.env.local` file

## Database

The template uses MongoDB with Mongoose. Make sure to:

1. Set up a MongoDB instance (local or cloud)
2. Add your MongoDB URI to the `.env.local` file
3. Create necessary models in the `models` directory

## Analytics

This template supports Google Analytics with cookie consent.

### Setup

1. Create a Google Analytics property and get your Measurement ID (e.g., `G-XXXXXXXXXX`).
2. Add it to your `.env.local` file:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. On first visit, users will see a cookie consent banner. Analytics will only load if they accept.

- The code for analytics is in `components/GoogleAnalytics.tsx` and the consent banner is in `components/CookieConsent.tsx`.
- You can customize the consent banner as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
