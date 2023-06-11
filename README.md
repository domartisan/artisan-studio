# Artisan Studio [DEV]

.
├── auth.ts                 # Auth related typescript functions
├── components              # Contains JSX & Astro components used throughout the project
│   ├── LoginOrRegister.jsx # React component for handling user registration and login
│   ├── LoginStatus.astro   # Astro component displaying current user login status
│   └── Social.astro        # Astro component handling social login features
├── env.d.ts                # Type declaration file for environment variables
├── hooks                   # Directory for custom hooks
├── layouts                 # Astro layouts, reusable website page structures
│   └── Layout.astro        # Main layout file used by Astro
├── libs                    # Contains JavaScript/TypeScript libraries
│   ├── artisan             # Directory for 'artisan' library
│   │   └── _main.js        # Main entry point for the 'artisan' library
│   ├── blocks              # Contains functionality related to 'blocks'
│   │   ├── ConvertBlocks.ts # TypeScript file for converting blocks
│   │   ├── block.types.ts   # TypeScript definitions for blocks
│   │   ├── clean.ts         # Functionality for cleaning blocks
│   │   ├── nodes.ts         # Node related functionality for blocks
│   │   ├── syncMigration.ts # Syncing and migration utility for blocks
│   │   └── utils.ts         # Utility functions for blocks
│   └── glimpse             # Glimpse library related files
│       ├── blocks
│       │   └── transform   # Directory for transform functionality of blocks
│       ├── clean.mjs       # Cleaning functionality for 'glimpse'
│       ├── fields
│       │   ├── TypesController  # Directory that may contain various type controllers
│       │   └── generate.mjs     # Generate functionality for fields
│       └── process
│           ├── SourceImages.mjs # Processing functionality for source images
│           ├── absolute.mjs     # Absolute value functionality
│           ├── nodes.mjs        # Node related functionality for 'glimpse'
│           ├── remove.mjs       # Remove functionality for 'glimpse'
│           ├── restructure.mjs  # Restructuring functionality
│           └── wireframe.mjs    # Wireframing functionality
├── middleware                # Contains Express.js middleware
├── pages                     # Astro pages - each represents a route
│   ├── about                 # About page and related components
│   │   ├── astro.astro
│   │   ├── supabase.astro
│   │   └── vercel.astro
│   ├── api                   # Api endpoint pages
│   │   ├── fields.ts
│   │   └── login.astro
│   ├── content               # Content pages
│   │   ├── content-astro.md
│   │   ├── content-home.md
│   │   ├── content-supabase.md
│   │   └── content-vercel.md
│   ├── flutter.astro         # Flutter page
│   ├── framer.astro          # Framer page
│   ├── ghost.astro           # Ghost page
│   ├── index.astro           # Home page
│   ├── login.astro           # Login page
│   ├── logout.astro          # Logout page
│   ├── magic-link.astro      # Magic link page
│   ├── shopify.astro         # Shopify page
│  │   └── wordpress.astro       # Wordpress page
└── utils                     # Contains utility functions used throughout the project
    └── new.routes.mjs        # Utility for defining new routes in the application

