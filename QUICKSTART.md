# 🚀 Quick Start Guide

## Start the Application

Open your terminal in the project directory and run:

```bash
make dev
```

Wait for the containers to build and start (first time may take a few minutes).

## Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## Test the Application

### Test as Teacher:
1. Click "Register here"
2. Fill in:
   - Name: `John Teacher`
   - Email: `teacher@test.com`
   - Password: `password123`
   - Role: `Teacher`
3. Click Register
4. You'll be redirected to the classes page
5. Click on "Primary 1"
6. Click "Upload Homework"
7. Fill in title and upload a PDF/image file

### Test as Student:
1. Open a new incognito/private window
2. Go to `http://localhost:3000`
3. Click "Register here"
4. Fill in:
   - Name: `Jane Student`
   - Email: `student@test.com`
   - Password: `password123`
   - Role: `Student`
   - Class: `Primary 1`
5. Click Register
6. Click on "Primary 1"
7. You should see the homework uploaded by the teacher
8. Click "Download" to get the file

## Troubleshooting

If you encounter any issues:

1. **Port already in use?**
   ```bash
   make stop
   make dev
   ```

2. **Database connection issues?**
   - Check your internet connection (Neon requires internet)
   - Verify the DATABASE_URL in `.env` is correct

3. **Clean restart:**
   ```bash
   make clean
   make dev
   ```

## Stop the Application

```bash
make stop
```

## Features to Test

✅ User Registration (Teacher & Student)  
✅ User Login/Logout  
✅ View all 7 classes (Primary 1-7)  
✅ Upload homework (Teachers only)  
✅ Download homework (Both teachers & students)  
✅ Responsive design (Try on mobile)  
✅ File upload to Cloudinary  
✅ Session persistence  

## Demo Credentials

After registering your own accounts, you can use:

**Teacher:**
- Email: teacher@test.com
- Password: password123

**Student:**
- Email: student@test.com
- Password: password123

---

**Good luck with your hackathon! 🎉**
