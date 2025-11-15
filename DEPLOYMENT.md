# Deployment Guide

This guide provides instructions for deploying the e-commerce application to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Security Considerations](#security-considerations)

---

## Prerequisites

- Node.js v14 or higher
- MongoDB Atlas account (or self-hosted MongoDB)
- A hosting platform (Heroku, AWS, DigitalOcean, etc.)
- Domain name (optional)

---

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_very_strong_random_secret_key_here
JWT_EXPIRE=7d

# CORS Configuration (if needed)
CORS_ORIGIN=https://yourdomain.com
```

**Important:** 
- Generate a strong JWT secret using: `openssl rand -base64 32`
- Never commit `.env` files to version control
- Use different secrets for development and production

### Frontend Environment Variables

Create a `.env.production` file in the `frontend` directory:

```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

---

## Database Setup

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Choose a cloud provider and region
   - Select the free tier (M0) for testing
   - Wait for the cluster to be provisioned

3. **Configure Network Access**
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (for any IP) or specific IPs

4. **Create Database User**
   - Go to Database Access
   - Add a new database user
   - Save the username and password

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

6. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   ```

---

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Seed Database**
   ```bash
   heroku run npm run seed
   ```

### Option 2: DigitalOcean App Platform

1. **Connect GitHub Repository**
   - Go to DigitalOcean App Platform
   - Create a new app
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Source Directory: `/backend`
   - Build Command: `npm install`
   - Run Command: `npm start`

3. **Add Environment Variables**
   - Add all required environment variables
   - Save and deploy

### Option 3: AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu Server
   - Configure security groups (open ports 22, 80, 443)

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/repo.git
   cd repo/backend
   npm install
   ```

5. **Configure PM2**
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Frontend Deployment

### Option 1: Netlify

1. **Build the Application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to https://app.netlify.com
   - Drag and drop the `build` folder
   - Or connect your GitHub repository

3. **Configure Environment Variables**
   - Go to Site settings > Build & deploy > Environment
   - Add `REACT_APP_API_URL`

4. **Configure Redirects**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add REACT_APP_API_URL production
   ```

### Option 3: AWS S3 + CloudFront

1. **Build the Application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create S3 Bucket**
   - Enable static website hosting
   - Upload build folder contents

3. **Create CloudFront Distribution**
   - Point to S3 bucket
   - Configure SSL certificate

---

## Security Considerations

### Backend Security

1. **Use HTTPS**
   - Install SSL certificate (Let's Encrypt)
   - Force HTTPS in production

2. **Secure Headers**
   Install helmet:
   ```bash
   npm install helmet
   ```
   
   Add to server.js:
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

3. **CORS Configuration**
   Update CORS settings to allow only your frontend domain:
   ```javascript
   app.use(cors({
     origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
     credentials: true
   }));
   ```

4. **Input Sanitization**
   Install express-mongo-sanitize:
   ```bash
   npm install express-mongo-sanitize
   ```

5. **Rate Limiting**
   Already implemented in the application

### Frontend Security

1. **Environment Variables**
   - Never expose sensitive data in frontend
   - Use REACT_APP_ prefix for public variables

2. **Content Security Policy**
   Add to public/index.html:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline';">
   ```

3. **HTTPS Only**
   - Always use HTTPS in production
   - Set secure cookies

---

## Monitoring and Maintenance

### Application Monitoring

1. **Setup Logging**
   ```bash
   npm install winston
   ```

2. **Error Tracking**
   - Use Sentry or similar service
   - Track application errors

3. **Performance Monitoring**
   - Use New Relic or similar
   - Monitor response times and database queries

### Database Backups

1. **MongoDB Atlas**
   - Enable automated backups
   - Schedule regular backup downloads

2. **Manual Backups**
   ```bash
   mongodump --uri="your_mongodb_uri"
   ```

---

## Scaling Considerations

### Horizontal Scaling

1. **Load Balancing**
   - Use nginx or AWS ELB
   - Distribute traffic across multiple instances

2. **Session Management**
   - Use Redis for session storage
   - Implement sticky sessions if needed

### Database Optimization

1. **Indexing**
   - Add indexes to frequently queried fields
   - Monitor slow queries

2. **Caching**
   - Implement Redis caching
   - Cache frequently accessed data

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in backend
   - Verify frontend API URL

2. **Database Connection Errors**
   - Verify MongoDB URI
   - Check network access whitelist
   - Ensure database user has proper permissions

3. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify all environment variables are set

---

## Rollback Strategy

1. **Backend Rollback**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Frontend Rollback**
   - Redeploy previous build
   - Or rollback through hosting platform

---

## Support

For issues or questions:
1. Check the [README.md](README.md)
2. Review [API Documentation](API_DOCUMENTATION.md)
3. Open an issue on GitHub

---

## Checklist

Before going to production:

- [ ] All environment variables configured
- [ ] Database seeded with initial data
- [ ] SSL certificate installed
- [ ] CORS properly configured
- [ ] Error tracking enabled
- [ ] Backups configured
- [ ] Security headers implemented
- [ ] Rate limiting tested
- [ ] Frontend built and deployed
- [ ] Backend health check endpoint working
- [ ] Admin credentials changed from defaults
- [ ] API documentation updated
