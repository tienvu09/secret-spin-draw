# Vercel Deployment Guide for Secret Spin Draw

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Process

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project" or "Import Project"
3. Connect your GitHub account if not already connected
4. Select the `tienvu09/secret-spin-draw` repository

### Step 2: Configure Project Settings

1. **Project Name**: `secret-spin-draw`
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

In the Vercel dashboard, go to "Environment Variables" and add the following:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

**Important**: Make sure to add these variables for all environments (Production, Preview, Development).

### Step 4: Build Configuration

Create a `vercel.json` file in your project root (optional, for advanced configuration):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your application will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. Go to "Domains" in your Vercel project dashboard
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Verify Environment Variables

- Check that all environment variables are properly set
- Test wallet connection functionality
- Verify blockchain network connectivity

### 2. Test Core Features

- [ ] Wallet connection (Rainbow Kit)
- [ ] Network switching (Sepolia testnet)
- [ ] Smart contract interaction
- [ ] Responsive design on mobile devices

### 3. Monitor Performance

- Check Vercel Analytics for performance metrics
- Monitor error logs in Vercel dashboard
- Set up alerts for build failures

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure network configuration matches

3. **Smart Contract Errors**
   - Verify contract address is correct
   - Check contract is deployed on Sepolia
   - Ensure ABI matches deployed contract

### Environment Variables Checklist

- [ ] `NEXT_PUBLIC_CHAIN_ID` = 11155111 (Sepolia)
- [ ] `NEXT_PUBLIC_RPC_URL` = Valid Sepolia RPC endpoint
- [ ] `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` = Valid WalletConnect project ID
- [ ] `NEXT_PUBLIC_INFURA_API_KEY` = Valid Infura API key

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **HTTPS**: Vercel automatically provides SSL certificates
3. **CORS**: Configure CORS settings for API endpoints
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Performance Optimization

1. **Image Optimization**: Use Vercel's built-in image optimization
2. **Caching**: Configure appropriate cache headers
3. **CDN**: Vercel automatically provides global CDN
4. **Bundle Analysis**: Use Vite bundle analyzer to optimize bundle size

## Monitoring and Analytics

1. **Vercel Analytics**: Enable for performance monitoring
2. **Error Tracking**: Set up error tracking (e.g., Sentry)
3. **Uptime Monitoring**: Use external services for uptime monitoring
4. **User Analytics**: Implement user behavior tracking

## Backup and Recovery

1. **Code Backup**: Ensure code is backed up in GitHub
2. **Environment Variables**: Document all environment variables
3. **Database Backup**: If using external databases, set up backups
4. **Deployment History**: Vercel maintains deployment history

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **Rainbow Kit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)

## Deployment URL

After successful deployment, your application will be available at:
`https://secret-spin-draw-[random-string].vercel.app`

You can also set up a custom domain for a more professional URL.
