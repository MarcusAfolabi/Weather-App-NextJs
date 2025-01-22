# Documentation for Installing the Next.js Frontend

## Prerequisites
Before setting up the Next.js frontend, ensure your development environment includes the following:

1. **Node.js**: Version 18 or higher (install from [Node.js](https://nodejs.org/)).
2. **npm**: Installed with Node.js.
3. **Git**: For cloning the repository.

---

## Step-by-Step Installation Guide

### 1. Clone the Repository
Clone the Next.js frontend repository to your local machine:
```bash
git clone  https://github.com/MarcusAfolabi/Weather-App-NextJs.git 
cd nextjs-frontend
```

### 2. Install Dependencies
Install all required dependencies using npm:
```bash
npm install
```

### 3. Run the Development Server
To start the development server locally:
```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Deployment Steps

### 1. Deploy to Vercel
Next.js is optimized for Vercel. Follow these steps to deploy:

1. **Push Your Code**:
   Ensure all your changes are committed and pushed to a remote repository like GitHub or GitLab.

2. **Connect Vercel**:
   - Go to [Vercel](https://vercel.com/).
   - Log in and create a new project.
   - Connect your repository and follow the prompts.

3. **Set Environment Variables**:
   In the Vercel dashboard, go to **Settings > Environment Variables** and add the variables from `.env.local`.

4. **Deploy**:
   Vercel will automatically build and deploy your application.

5. **Access Your Deployed Application**:
   The deployed application will have a unique URL, e.g., `https://your-project-name.vercel.app`.

### 2. Deploy to Other Platforms
If using other platforms like AWS or Heroku, build the project first:
```bash
npm run build
```
Then serve the build output.

---

## Testing the Frontend
1. Access the application in your browser.
2. Test the integration with the backend API by searching for weather data.
3. Verify the functionality of all UI components.

---

## Troubleshooting
1. **Port Conflicts**:
   - If `http://localhost:3000` is in use, specify a different port:
     ```bash
     npm run dev -- -p 4000
     ```

2. **API Connection Issues**:
   - Ensure the `NEXT_PUBLIC_API_URL` points to a running Laravel backend.
   - Verify the backend is accessible from your frontend.

3. **Build Failures**:
   - Run `npm run build` locally to check for errors.
   - Fix any TypeScript or configuration issues before deployment.

4. **Missing Dependencies**:
   - Run `npm install` to ensure all required packages are installed.

---

For further assistance, refer to the [Next.js Documentation](https://nextjs.org/docs).