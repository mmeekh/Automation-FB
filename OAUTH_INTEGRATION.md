# OAuth Integration Guide

Bu dosya, backend developer'ın OAuth sistemini nasıl entegre edeceğini açıklar.

## 📋 Mevcut Durum

Frontend'de 4 OAuth provider hazır ve çalışıyor:
- ✅ **Google OAuth**
- ✅ **Facebook OAuth**
- ✅ **Instagram OAuth**
- ✅ **Email/Password (2FA ile)**

## 🔧 Frontend Yapısı

### Dosyalar:
- `/lib/auth.ts` - OAuth handler fonksiyonları
- `/app/[locale]/login/page.tsx` - Login sayfası

### Fonksiyonlar:

```typescript
// OAuth login başlatma
handleOAuthLogin(provider: 'google' | 'facebook' | 'instagram' | 'email')

// OAuth callback işleme
handleOAuthCallback(provider, code)

// Email/Password login
handleEmailLogin(email, password, twoFactorCode?)
```

## 🚀 Backend Integration Adımları

### 1. OAuth Initialize Endpoint

**Endpoint:** `GET /api/auth/oauth/:provider`

**Response:**
```json
{
  "redirectUrl": "https://accounts.google.com/o/oauth2/v2/auth?client_id=..."
}
```

**Frontend'de kullanımı:**
```typescript
// lib/auth.ts dosyasında bu kısım var, sadece comment'i kaldırın
const response = await fetch(`/api/auth/oauth/${provider}`);
const { redirectUrl } = await response.json();
window.location.href = redirectUrl;
```

### 2. OAuth Callback Endpoint

**Endpoint:** `POST /api/auth/oauth/:provider/callback`

**Request:**
```json
{
  "code": "authorization_code_from_provider"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://..."
  }
}
```

### 3. Email/Password Login Endpoint

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "twoFactorCode": "123456"  // Optional
}
```

**Response (2FA Required):**
```json
{
  "requires2FA": true,
  "message": "2FA code required"
}
```

**Response (Success):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 4. Logout Endpoint

**Endpoint:** `POST /api/auth/logout`

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true
}
```

## 🔑 OAuth Provider Credentials

### Google OAuth
1. https://console.cloud.google.com
2. Create OAuth 2.0 Client ID
3. Authorized redirect URIs: `{YOUR_DOMAIN}/api/auth/google/callback`
4. Scopes: `email`, `profile`

### Facebook OAuth
1. https://developers.facebook.com
2. Create App
3. Add Facebook Login product
4. Valid OAuth Redirect URIs: `{YOUR_DOMAIN}/api/auth/facebook/callback`
5. Scopes: `email`, `public_profile`, `instagram_basic` (Instagram için)

### Instagram OAuth
1. Facebook Developer Console (same as above)
2. Add Instagram Basic Display or Instagram Graph API
3. Redirect URI: `{YOUR_DOMAIN}/api/auth/instagram/callback`
4. Scopes: `instagram_basic`, `instagram_manage_insights`

**Not:** Instagram API business hesap gerektirir!

## 📝 Environment Variables

Backend'e eklenecek env variables:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Instagram OAuth (Facebook ile aynı credentials)
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3007
API_URL=http://localhost:8000
```

## 🔄 Frontend'de Backend'e Geçiş

`lib/auth.ts` dosyasında:

1. Development mode kontrolünü kaldır:
```typescript
// ❌ Bunu sil
if (process.env.NODE_ENV === 'development') {
  alert('OAuth will be implemented');
  return;
}

// ✅ Direkt production kodunu çalıştır
const response = await fetch(`/api/auth/oauth/${provider}`);
```

2. Tüm `TODO` comment'lerini takip et ve backend endpoint'leri ekle

## 📊 OAuth Flow Diagram

```
User                Frontend              Backend               OAuth Provider
  |                     |                     |                        |
  |--click Google------>|                     |                        |
  |                     |--GET /oauth/google->|                        |
  |                     |<--redirectUrl-------|                        |
  |                     |--redirect-----------|----------------------->|
  |<----------------user authorizes---------------------------|------->|
  |                     |<--callback with code----------------|--------|
  |                     |--POST /oauth/google/callback------->|        |
  |                     |    with code        |--exchange code-------->|
  |                     |                     |<--access token---------|
  |                     |                     |--get user info-------->|
  |                     |<--JWT token + user--|<--user info-----------|
  |<--redirect to dashboard                   |                        |
```

## 🧪 Testing

Development ortamında test etmek için:

1. `.env.local` dosyasına credentials ekle
2. Backend'i başlat
3. Frontend'i başlat (`npm run dev`)
4. http://localhost:3007/en/login adresine git
5. OAuth butonlarını test et

## ⚠️ Güvenlik Notları

1. **HTTPS zorunlu:** Production'da mutlaka HTTPS kullan
2. **CSRF Protection:** OAuth state parameter kullan
3. **Token Güvenliği:** JWT'yi HttpOnly cookie'de sakla
4. **Rate Limiting:** Login endpoint'lerine rate limit ekle
5. **2FA:** Email/Password için 2FA zorunlu olabilir

## 📚 Önerilen Kütüphaneler

**Backend (Python/FastAPI örnek):**
```bash
pip install python-jose[cryptography]
pip install passlib[bcrypt]
pip install httpx  # OAuth request'leri için
pip install python-multipart
```

**Backend (Node.js örnek):**
```bash
npm install passport passport-google-oauth20 passport-facebook
npm install jsonwebtoken bcrypt
```

## 🆘 Sorun Giderme

### Instagram API 401 Error
- Business hesap mı kontrol et
- App Review'den gerekli permission'ları al
- Redirect URI'ler doğru mu kontrol et

### Facebook Graph API Hatası
- App'in "Live" mode'da olduğundan emin ol
- Test kullanıcıları ekle
- Permissions doğru mu kontrol et

### CORS Hatası
- Backend'de CORS ayarlarını kontrol et
- Frontend origin'i whitelist'e ekle

## 📞 İletişim

Sorular için: Backend Developer'a bu dosyayı gönderin!
