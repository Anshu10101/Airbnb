# Modern Airbnb Clone

A full-stack Airbnb clone built with modern web technologies, featuring a beautiful UI and comprehensive functionality.

## Features

- 🔐 Authentication (Email, Google, Facebook)
- 🏠 Property Listings
- 📍 Location Search with Maps
- 📅 Reservation System
- ❤️ Favorites System
- 📱 Responsive Design
- 🌙 Modern UI
- 🔍 Search & Filter
- 📸 Image Upload

## Tech Stack

- **Frontend**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Backend**
  - MongoDB
  - Prisma
  - NextAuth.js
  - Cloudinary

## Getting Started

### Prerequisites

1. Node.js installed
2. MongoDB database
3. Cloudinary account
4. Google & Facebook OAuth credentials

### Environment Setup

Create a `.env.local` file in the root directory with:

```env
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_ID=
FACEBOOK_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd airbnb-clone
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                # Next.js 13 app directory
│   ├── actions/       # Server actions
│   ├── api/          # API routes
│   └── components/   # React components
├── components/        # Shared components
├── hooks/            # Custom React hooks
├── lib/             # Utility functions
├── prisma/          # Database schema
└── public/          # Static assets
```

## Key Features Explained

### Authentication
- Multiple authentication methods
- Secure session management
- Protected routes

### Property Listings
- Create and manage listings
- Image upload with Cloudinary
- Rich property details

### Booking System
- Date range selection
- Price calculation
- Booking management

### Search & Filters
- Location-based search
- Category filters
- Price range filters

### Maps Integration
- Interactive maps
- Location selection
- Property visualization

## Deployment

The application can be easily deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

## Development Notes

- Uses Next.js 13+ features including app directory
- Implements server-side rendering
- Follows modern React best practices
- Includes responsive design principles
- Built with TypeScript for type safety

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.
