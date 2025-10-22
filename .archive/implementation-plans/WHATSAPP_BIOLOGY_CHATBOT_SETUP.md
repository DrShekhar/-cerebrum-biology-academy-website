# WhatsApp Biology Chatbot - Complete Implementation Guide

## 🎯 Overview

This is a comprehensive WhatsApp chatbot integration for Cerebrum Biology Academy that provides:

- **Multi-format Question Support**: Text, voice notes, and biology diagram images
- **AI-Powered Responses**: Uses Claude and GPT-4 for educational explanations
- **NCERT References**: Automatic textbook references for all topics
- **Student Tracking**: Progress monitoring and rate limiting (50 questions/day)
- **Multi-language Support**: English, Hindi, and Hinglish

## 🏗️ Architecture

```
WhatsApp Cloud API → Webhook → Message Processor → AI Analysis → Response
                          ↓
                   Student Tracker & Rate Limiting
                          ↓
                   NCERT References & Analytics
```

## 📁 Files Created

### Core API Endpoints

- `/src/app/api/whatsapp/webhook/route.ts` - Main webhook for WhatsApp
- `/src/app/api/whatsapp/process-message/route.ts` - Manual message processing

### Service Classes

- `/src/lib/whatsapp/messageProcessor.ts` - Main processing logic
- `/src/lib/whatsapp/voiceTranscription.ts` - Voice note transcription
- `/src/lib/whatsapp/imageAnalysis.ts` - Biology diagram analysis
- `/src/lib/whatsapp/studentTracker.ts` - Student management & rate limiting
- `/src/lib/whatsapp/ncertReference.ts` - NCERT textbook references

## 🔧 Setup Instructions

### 1. WhatsApp Business Account Setup

1. **Create Facebook Business Account**
   - Go to [Facebook Business](https://business.facebook.com)
   - Create account and verify business

2. **Set up WhatsApp Business API**
   - Go to [Facebook Developers](https://developers.facebook.com)
   - Create new app → Business → WhatsApp
   - Add WhatsApp product to your app

3. **Get Required Credentials**
   ```
   WHATSAPP_PHONE_NUMBER_ID=123456789012345
   WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxx
   WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
   ```

### 2. Webhook Configuration

1. **Set Webhook URL**

   ```
   Webhook URL: https://your-domain.com/api/whatsapp/webhook
   Verify Token: cerebrum_webhook_verify_2024_secure
   ```

2. **Subscribe to Events**
   - messages
   - message_deliveries
   - message_reads

### 3. Environment Variables Setup

Update `.env.local` with:

```env
# AI APIs
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_ACCESS_TOKEN=your-access-token
WHATSAPP_VERIFY_TOKEN=cerebrum_webhook_verify_2024_secure
WHATSAPP_WEBHOOK_SECRET=cerebrum_webhook_secret_harvard_standards_2024
WHATSAPP_BUSINESS_ACCOUNT_ID=your-business-account-id
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

### 4. Install Dependencies

```bash
npm install @anthropic-ai/sdk openai
```

## 📱 Message Flow Examples

### Text Question

```
Student: "What is photosynthesis?"
Bot: 🧬 *Plant Biology - Photosynthesis*

Photosynthesis is the process by which plants make food using sunlight! 🌱☀️

💡 *Examples:*
• Plants capture light energy through chlorophyll in leaves
• CO₂ + H₂O + Light → Glucose + O₂
• Think of it as nature's solar panels! 🔋

🎯 *NEET Relevance:* High weightage topic (8-10 marks expected)

📚 *Reference:* Class 11 Biology, Chapter 13: Photosynthesis in Higher Plants, Pages 220-240

❓ *Test Your Understanding:*
1. What is the role of chlorophyll in photosynthesis?
2. Explain light and dark reactions
3. What factors affect the rate of photosynthesis?

Ready for your next question! 💪
```

### Voice Question (Hindi/Hinglish)

```
Student: [Voice note] "Cell structure ke bare mein batao"
Bot: [Transcribes to] "cell structure ke bare mein batao"

🧬 *Cell Biology - Cell Structure*

Cell हमारे शरीर की basic unit है! 🔬

💡 *Examples:*
• Nucleus - कोशिका का brain
• Mitochondria - powerhouse of cell
• Cell membrane - boundary wall

🎯 *NEET Relevance:* Very important (12-15 marks)
📚 *Reference:* Class 11 Biology, Chapter 8: Cell - Unit of Life
```

### Image Analysis

```
Student: [Sends diagram image] "Explain this heart diagram"
Bot: 📸 *Analyzing biology diagram...*

🧬 *Human Biology - Circulatory System*

I can see a human heart diagram with labeled chambers! ❤️

💡 *Identified Structures:*
• Right atrium and ventricle
• Left atrium and ventricle
• Aorta and pulmonary artery
• Valves (tricuspid, bicuspid)

🎯 *NEET Relevance:* High importance (6-8 marks)
📚 *Reference:* Class 11 Biology, Chapter 18: Body Fluids and Circulation
```

## 🚀 Key Features

### 1. Intelligent Question Processing

- **Biology Relevance Check**: Filters non-biology questions
- **Multi-language Support**: Hindi, English, Hinglish
- **Context Awareness**: Maintains conversation history

### 2. Advanced Media Processing

- **Voice Transcription**: Whisper AI for Hindi/English
- **Image Analysis**: GPT-4 Vision + Claude Vision for diagrams
- **Text Extraction**: OCR for handwritten notes

### 3. Educational Features

- **NCERT Integration**: Automatic textbook references
- **NEET Focus**: Exam-specific importance and marks
- **Follow-up Questions**: Interactive learning prompts
- **Progress Tracking**: Student learning analytics

### 4. Rate Limiting & Management

- **Daily Limits**: 50 questions/day for free users
- **Student Profiles**: Track topics, weak areas, progress
- **Premium Upgrades**: Unlimited questions for paid users

## 🔧 Testing the Chatbot

### 1. Webhook Verification

```bash
curl -X GET "https://your-domain.com/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=cerebrum_webhook_verify_2024_secure&hub.challenge=test123"
```

### 2. Manual Message Processing

```bash
curl -X POST "https://your-domain.com/api/whatsapp/process-message" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+919876543210",
    "studentName": "Test Student",
    "message": {
      "type": "text",
      "content": "What is photosynthesis?"
    }
  }'
```

### 3. Student Stats

```bash
curl "https://your-domain.com/api/whatsapp/process-message?phoneNumber=+919876543210"
```

## 📊 Analytics & Monitoring

### Student Metrics

- Total questions asked
- Daily activity patterns
- Top studied topics
- Weak vs strong areas
- Study streak tracking

### Bot Performance

- Response accuracy
- Processing time
- Error rates
- Popular topics

## 🔒 Security Features

- **Webhook Signature Verification**: HMAC SHA-256
- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Sanitizes all inputs
- **Error Handling**: Graceful degradation

## 🚀 Deployment Checklist

- [ ] WhatsApp Business Account verified
- [ ] Webhook URL configured and verified
- [ ] API keys added to environment variables
- [ ] Domain SSL certificate active
- [ ] Phone number verified for WhatsApp Business
- [ ] Test messages working end-to-end
- [ ] Rate limiting functioning
- [ ] NCERT references displaying correctly

## 🆘 Troubleshooting

### Common Issues

1. **Webhook Verification Failed**
   - Check verify token matches exactly
   - Ensure HTTPS is working
   - Verify URL is publicly accessible

2. **Messages Not Processing**
   - Check webhook signature verification
   - Verify access token permissions
   - Check API rate limits

3. **Voice Transcription Failed**
   - Ensure OpenAI API key is valid
   - Check audio file format support
   - Verify file download permissions

4. **Image Analysis Not Working**
   - Confirm GPT-4 Vision access
   - Check image URL accessibility
   - Verify file size limits

## 💰 Cost Estimates

### API Usage Costs (Monthly)

- **OpenAI GPT-4**: ~$200-500 (1000 students)
- **Anthropic Claude**: ~$150-300 (1000 students)
- **WhatsApp Business API**: $0.005-0.03 per message
- **Total for 30 students**: ~$20-50/month

## 🔮 Future Enhancements

- **Voice Response**: Text-to-speech in Shekhar Sir's voice
- **Video Analysis**: Biology experiment video explanations
- **Quiz Generation**: Automatic NEET practice questions
- **Study Groups**: Multi-student chat rooms
- **Parent Updates**: Progress reports via WhatsApp
- **Offline Mode**: SMS fallback for poor internet

## 📞 Support

For setup assistance or issues:

- **Technical**: Check logs in Next.js console
- **WhatsApp API**: Facebook Developer Support
- **Biology Content**: Verify NCERT curriculum alignment

---

🎓 **Ready to revolutionize biology education with AI-powered WhatsApp learning!**
