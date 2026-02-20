# Het Huiswerk-Portaal

A homework portal for schools in Uganda, built for hackathon purposes. This application allows teachers to upload homework and students to download homework materials for their respective classes.

## Features

- **Teacher Functionality**
  - Register and login
  - Upload homework files for any of the 7 primary classes
  - Download homework files
  
- **Student Functionality**
  - Register with class selection (Primary 1-7)
  - Login and access homework for their class
  - Download homework files

## Tech Stack

- **Backend**: Node.js with TypeScript
- **Frontend**: EJS templates, CSS
- **Database**: Neon PostgreSQL
- **File Storage**: Cloudinary
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose installed on your system
- The database and Cloudinary credentials are pre-configured in `.env`

## Getting Started

### Running the Application

Simply run:

```bash
make dev
```

This command will:
1. Build the Docker container
2. Install all dependencies
3. Initialize the database tables
4. Start the development server

The application will be available at: **http://localhost:3000**

### Other Makefile Commands

```bash
make build    # Build the Docker containers
make start    # Start containers in detached mode
make stop     # Stop running containers
make clean    # Stop containers and remove volumes
```

## Usage

### For Teachers

1. Go to http://localhost:3000
2. Click "Register here" and create an account with role "Teacher"
3. After login, select a class (Primary 1-7)
4. Click "Upload Homework" to add homework files
5. Fill in the title and upload a file (PDF, DOC, DOCX, JPG, PNG)

### For Students

1. Go to http://localhost:3000
2. Click "Register here" and create an account with role "Student"
3. Select your class during registration
4. After login, click on your class
5. Download available homework files

## Project Structure

```
huiswerk/
├── src/
│   ├── config/          # Database and Cloudinary configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   └── server.ts        # Main application entry point
├── views/               # EJS templates
│   ├── login.ejs
│   ├── register.ejs
│   ├── classes.ejs
│   └── class-homework.ejs
├── public/
│   └── css/
│       └── style.css    # Green and white theme styling
├── Dockerfile
├── docker-compose.yml
├── Makefile
└── package.json
```

## Environment Variables

All necessary environment variables are pre-configured in `.env`:

- `DATABASE_URL`: Neon PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `PORT`: Application port (default: 3000)

## Database Schema

### Users Table
- `id`: Primary key
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `role`: Either 'teacher' or 'student'
- `class`: Student's class (Primary 1-7, nullable for teachers)
- `created_at`: Timestamp

### Homework Table
- `id`: Primary key
- `title`: Homework title
- `class`: Class level (Primary 1-7)
- `file_url`: Cloudinary URL to the file
- `file_public_id`: Cloudinary public ID for file management
- `uploaded_by`: Foreign key to users table
- `created_at`: Timestamp

## Design

- **Theme**: Green and white color scheme
- **Font**: Roboto (loaded from Google Fonts)
- **Responsive**: Mobile-friendly design

## Development Notes

- This is a monolithic application designed for quick deployment
- Sessions are stored in PostgreSQL for persistence
- Files are uploaded to Cloudinary for reliable storage
- All passwords are hashed using bcrypt
- The application automatically creates database tables on first run

## Support

For any issues or questions, please contact the development team.
