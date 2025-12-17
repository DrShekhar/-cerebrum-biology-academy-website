# Giscus Comments Setup Guide

## Overview

Giscus uses GitHub Discussions as a comments backend. This allows comments to be stored in your GitHub repository and provides GitHub authentication for commenters.

## Step 1: Create a Public Repository for Comments

1. Go to [GitHub](https://github.com/new) and create a new **public** repository
2. Name it something like `blog-comments` or `cerebrum-blog-discussions`
3. Initialize with a README

## Step 2: Enable Discussions

1. Go to your repository's **Settings**
2. Scroll down to **Features** section
3. Check the box for **Discussions**

## Step 3: Create a Category

1. Go to the **Discussions** tab in your repository
2. Click on **Categories** (pencil icon)
3. Create a new category called **"Blog Comments"**
4. Set format to **"Announcement"** (recommended) so only you can start new discussions

## Step 4: Install Giscus App

1. Go to [giscus app](https://github.com/apps/giscus)
2. Click **Install**
3. Select your comments repository
4. Grant permissions

## Step 5: Get Configuration Values

1. Go to [giscus.app](https://giscus.app/)
2. Enter your repository name (e.g., `your-username/blog-comments`)
3. Select the category you created (**Blog Comments**)
4. Choose mapping: **Pathname** (recommended)
5. Copy the generated configuration values:
   - `data-repo` → This is your `NEXT_PUBLIC_GISCUS_REPO`
   - `data-repo-id` → This is your `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `data-category` → This is your `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `data-category-id` → This is your `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## Step 6: Add Environment Variables

Add these to your `.env.local` file:

```env
# Giscus Comments Configuration
NEXT_PUBLIC_GISCUS_REPO=your-username/blog-comments
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Blog Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxx
```

## Step 7: Add to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all four variables with the same values

## Verification

After deployment, visit any blog post and scroll to the comments section. You should see the Giscus widget instead of the fallback UI.

## Troubleshooting

### Comments not showing?

- Ensure the repository is **public**
- Verify Discussions are **enabled**
- Check that the Giscus app is **installed** on the repository
- Confirm environment variables are set correctly

### Wrong repository?

- Double-check the repository name format: `username/repo-name`
- The repo ID should start with `R_kgDO`
- The category ID should start with `DIC_kwDO`

## Current Fallback Behavior

When Giscus is not configured, the comments section displays:

- A "Discussion & Questions" section with sample FAQs
- A WhatsApp question submission form
- Social proof statistics (customizable)

This ensures visitors can still engage even without Giscus configured.
