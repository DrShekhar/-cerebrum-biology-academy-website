# 🛡️ BULLETPROOF DEPLOYMENT GUIDE

## 🎯 One-Time Setup (Run Once, Work Forever)

### Quick Fix Command:

```bash
./deploy-fix-forever.sh
```

This script will:

- ✅ Fix Vercel project linking
- ✅ Deploy Ceri AI to cerebrumbiologyacademy.com
- ✅ Verify all systems working
- ✅ Configure permanent settings

## 🔧 Manual Steps (If Script Fails)

### 1. Fix Vercel Project Link

```bash
# Remove old config
rm -rf .vercel

# Login to Vercel
vercel login

# Link to correct project with your domain
vercel link --yes
# Select your team/account
# Select: cerebrum-biology-academy-website
# Confirm link to cerebrumbiologyacademy.com
```

### 2. Deploy to Production

```bash
vercel --prod --yes
```

### 3. Verify Domain Configuration

Go to: https://vercel.com/dashboard

- Find: cerebrum-biology-academy-website
- Settings → Domains
- Ensure: cerebrumbiologyacademy.com & www.cerebrumbiologyacademy.com are added

## 🚀 Future Deployments

Once fixed, deployments work automatically:

- **Git Push:** Triggers GitHub Actions → Auto-deploy
- **Manual:** Run `vercel --prod`
- **Emergency:** Run `./deploy-fix-forever.sh`

## 🎯 Expected Results

After running the fix script:

- ✅ https://cerebrumbiologyacademy.com/claudechat shows "Ceri AI"
- ✅ All 3 AI providers work (Anthropic, OpenAI, Google)
- ✅ Mobile responsive design
- ✅ Error boundaries active
- ✅ GitHub Actions show green checkmarks

## 🔍 Troubleshooting

### If Domain Still Shows "ClaudeChat":

1. **Wait 5-10 minutes** for DNS propagation
2. **Clear browser cache** (Ctrl+F5)
3. **Check different domain:** Try www.cerebrumbiologyacademy.com
4. **Re-run script:** `./deploy-fix-forever.sh`

### If GitHub Actions Still Fail:

1. **Check secrets:** Ensure VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID are set
2. **Verify workflow:** Only simple-deploy.yml should be active
3. **Manual trigger:** GitHub → Actions → Run workflow

### If API Returns 404:

1. **Domain mismatch:** Run `./deploy-fix-forever.sh` to fix
2. **Environment vars:** Check .env.local has all AI API keys
3. **Build issue:** Verify `npm run build` works locally

## 🎉 Success Indicators

When everything is working correctly:

- 🟢 GitHub Actions show green checkmarks
- 🤖 Chat page shows "Ceri AI" branding
- 🌐 Domain points to correct deployment
- 📱 Mobile interface is responsive
- 🔧 All AI providers functional

## 📞 Support

If issues persist after running the fix script:

- Check GitHub repository Actions tab
- Verify Vercel dashboard shows correct domain
- Test deployment with `vercel --prod` manually

---

**Remember:** Run `./deploy-fix-forever.sh` once to fix all deployment issues permanently!
