# Facebook App Review Backend & Data Compliance Checklist

Bu proje için henüz bir backend kurmadığını belirttin. Facebook App Review sürecinde, özellikle kullanıcı verisiyle ilgili bir uygulama gönderiyorsan aşağıdaki zorunlu gereksinimleri göz önünde bulundurman gerekir. Bu liste, bir backend veya veri katmanı eklerken denetçilerin görmek isteyeceği unsurları kapsar.

## 1. Backend & Sunucu Gereksinimleri
- **Erişilebilir bir test ortamı:** İnceleme ekibinin erişebileceği (genelde HTTPS ile korunan) herkese açık bir test URL’si sağlamalısın.
- **Kimlik doğrulama:** Facebook OAuth’ını kullanan oturum açma/bağlama akışın varsa, geçerli OAuth yönlendirme URL’leri ve test kullanıcıları tanımlı olmalı.
- **Webhook’lar (varsa):** Realtime Updates veya Webhook kullanıyorsan, doğrulanmış bir callback URL ve onaylanmış `verify_token` içermeli; HTTP 200 döndüren bir sağlık kontrolü sağlamalısın.
- **Günlükleme ve hata ayıklama:** Sunucu tarafında API çağrılarını, hataları ve kullanıcı etkileşimlerini (Kişisel Verileri maskeleyerek) kaydeden log sistemi bulunmalı. İnceleme sırasında bu logların ekran görüntüsü veya çıktısı istenebilir.

## 2. API Kullanım Kuralları
- **İzin gerekçelendirme:** Uygulaman hangi Facebook izinlerini istiyorsa (ör. `pages_manage_posts`, `pages_read_engagement`, `public_profile`), backend’inde bu izinleri kullandığın akışları açıkça belgelemelisin.
- **Graph API çağrılarının belgelenmesi:** Her API uç noktası için çağrı örnekleri, parametreler ve beklenen cevap formatlarını (ör. Postman koleksiyonu veya cURL çıktısı) sunmalısın.
- **Orantılı veri kullanımı:** Facebook politikalarına göre topladığın verileri sadece kullanıcıya sunduğun işlevleri sağlamak için kullanmalı ve gereksiz verileri çekmemelisin.

## 3. Veri Saklama & Veritabanı Politikaları
- **Veri minimizasyonu:** Kullanıcıdan toplanan kişisel verileri (örneğin isim, e-posta) sadece gerekli olduğu süre boyunca sakla; gereksiz verileri tutma.
- **Silme mekanizması:** Kullanıcı verisi silme taleplerine yanıt vermek için otomatik veya yarı otomatik bir uç nokta (ör. `/user/delete`) ve prosedür oluştur. Uygulama kontrol paneline “Data Deletion Callback URL” girmek zorunludur.
- **Güvenli saklama:** Verileri şifrelenmiş olarak sakla (örn. disk şifreleme, TLS üzerinden erişim). İnceleme sırasında şifreleme stratejin ve yetkilendirme modelin sorulabilir.
- **Veri paylaşımı:** Facebook’tan aldığın verileri üçüncü taraflarla paylaşmıyorsan bunu açıkça belirt; paylaşıyorsan sözleşme ve kullanıcı onayı kanıtlarını hazır bulundur.

## 4. İnceleme Paketi Hazırlığı
- **Video/ekran kaydı:** Facebook, uygulama akışını (özellikle istenen izinlerin kullanıldığı yerleri) gösteren bir video veya ekran kaydı ister. Backend etkileşimleri için (API yanıt ekranları gibi) kanıt ekle.
- **Test kullanıcıları:** Facebook geliştirici panelinden test kullanıcı veya rolleri (ör. developer, tester) ekle ve uygulama inceleme ekibiyle paylaş.
- **Dokümantasyon:** Uygulamanın ne yaptığını, hangi API uç noktalarını çağırdığını, neden bu izinlere ihtiyaç duyduğunu açıklayan bir doküman hazırla. Bu dosya bu ihtiyacı karşılamak üzere kullanılabilir.
- **Şartlar & Gizlilik:** Uygulamanın web üzerinde yayınlanmış gizlilik politikası ve hizmet şartları bağlantılarını panelde belirt.

## 5. Başvuru Öncesi Kontrol Listesi
1. [ ] Backend sunucusu HTTPS üzerinden erişilebilir ve test hesapları tanımlı.
2. [ ] Gerekli Graph API izinlerinin kullanımını gösteren canlı uç noktalar mevcut.
3. [ ] Veri silme uç noktası ve politikası hazır, panelde bildirildi.
4. [ ] İnceleme videosu veya ekran kayıtları tamamlandı.
5. [ ] Gizlilik politikası ve kullanım şartları yayınlandı ve linkleri güncel.

Bu adımları tamamladıktan sonra Facebook Developer Dashboard üzerinden App Review talebini gönderebilirsin. İnceleme sürecinde ek kanıt talep edilirse, loglar, Postman koleksiyonları veya ekran görüntülerini hızlıca paylaşmak için hazır tut.
