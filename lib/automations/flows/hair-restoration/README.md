# Hair Restoration Automation Flow

This automation transforms user selfies into hair restoration previews via Instagram DMs.

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local`:

```env
AI_MODEL_ENDPOINT=https://api.yourservice.com/hair-transformation
APPOINTMENT_BOOKING_URL=https://yourbooking.com/appointments
INSTAGRAM_USERNAME=your_instagram_username
INSTAGRAM_PASSWORD=your_instagram_password
WEBHOOK_URL=https://yourapp.com/webhooks/automation (optional)
```

### 2. Configuration

Edit `config.json` to customize:
- Trigger keywords
- AI model settings
- Rate limits
- Monitoring options

### 3. Installation

```typescript
import { initializeAutomation, deployAutomation } from './setup';

const config = {
  aiModelEndpoint: process.env.AI_MODEL_ENDPOINT!,
  appointmentBookingUrl: process.env.APPOINTMENT_BOOKING_URL!,
  instagramUsername: process.env.INSTAGRAM_USERNAME!,
  instagramPassword: process.env.INSTAGRAM_PASSWORD!,
  webhookUrl: process.env.WEBHOOK_URL,
};

// Initialize
const result = await initializeAutomation(config);
if (result.success) {
  // Deploy to production
  await deployAutomation(config);
}
```

### 4. Testing

```typescript
import { testAutomation } from './setup';

await testAutomation(config);
```

## Flow Steps

1. **Initial Message**: Bot asks for user's selfie
2. **Image Collection**: Receives and validates selfie
3. **Style Request**: Asks for desired hair style reference
4. **Style Collection**: Receives hair style image
5. **Processing**: AI transforms the image (3-5 seconds)
6. **Result Delivery**: Sends transformed image with CTA button
7. **Follow-up**: Friendly closing message

## Customization

### Modify Messages

Edit `../../templates/hair-restoration.ts` to change flow messages.

### Adjust AI Settings

Update `config.json`:
```json
{
  "ai": {
    "model": "hair-transformation-v2",
    "quality": "ultra_high",
    "timeout": 45000
  }
}
```

### Add Custom Logic

Extend `setup.ts` with custom handlers:
```typescript
export async function onImageReceived(image: Buffer) {
  // Custom pre-processing
}

export async function onTransformationComplete(result: Buffer) {
  // Custom post-processing
}
```

## Monitoring

View automation metrics at:
- Dashboard: `/analytics`
- Logs: Check console or webhook events
- Errors: Automatic alerting if webhook configured

## Troubleshooting

### Common Issues

**Issue**: AI model timeout
**Solution**: Increase timeout in `config.json` or check AI endpoint

**Issue**: Instagram authentication failed
**Solution**: Verify credentials and enable 2FA with app password

**Issue**: Image validation fails
**Solution**: Check image quality requirements in validation logic

## Support

For issues or questions:
- Check main docs: `/lib/automations/README.md`
- Contact: support@yourteam.com
