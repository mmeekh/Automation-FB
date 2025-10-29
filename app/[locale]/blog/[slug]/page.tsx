'use client';

import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import {
  ClockIcon,
  CalendarIcon,
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: JSX.Element;
  category: string;
  readingTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  cover: string;
  keywords: string[];
  metaDescription: string;
}

const blogPosts: Record<string, BlogPost> = {
  'ai-hair-studio': {
    id: 'ai-hair-studio',
    title: 'AI ile Sac Tasariminda 5 Pratik Adim: Instagram Otomasyonu ile Musterilenizi Sasirtin',
    summary: 'Instagram otomasyonlarini kullanarak musteri sac stillerini anlik degistirme stratejileri.',
    metaDescription: 'AI destekli sac donusumu otomasyonlari ile musteri deneyimini nasil iyilestirebilirsiniz? Instagram DM otomasyonu, gorsel AI entegrasyonu ve randevu optimizasyonu icin komple rehber.',
    keywords: ['AI sac tasarimi', 'Instagram otomasyonu', 'sac donusumu', 'DM otomasyonu', 'musteri deneyimi', 'gorsel AI', 'kuafor otomasyonu', 'randevu sistemi'],
    category: 'Automation',
    readingTime: '6 dk',
    publishedAt: '12 Ekim 2025',
    author: {
      name: 'Merve Yilmaz',
      role: 'Automation Architect',
      avatar: '/media/avatars/merve.png',
    },
    cover: '/media/blog/hair-automation.jpg',
    content: (
      <div className="prose prose-lg max-w-none">
        <h2>Instagram Otomasyonu ile Sac Donusumunde Yeni Cag</h2>
        <p>
          Musteri deneyimini dijitallestirenler kazaniyor. Instagram DM otomasyonlari, yapay zeka destekli gorsel donusumler ve akilli randevu sistemleri, sac salonlarinin musteri kazanim maliyetlerini %60 oraninda azaltabiliyor. Bu makalede, AI ile sac tasariminda Instagram otomasyonlarini nasil kullanacaginizi adim adim anlatacagiz.
        </p>

        <h2>1. Trigger Noktalarini Dogru Belirleyin</h2>
        <p>
          Otomasyon yolculugunuz, dogru trigger (tetikleyici) noktalari ile baslar. En etkili trigger noktalarini belirlemek icin:
        </p>
        <ul>
          <li><strong>Takipci DM'leri:</strong> Yeni takip eden kullanicilar icin otomatik hosgeldin mesaji gonderin. Ornek: "Merhaba! Sac donusumu hizmetlerimizi kesfetmek ister misiniz? Size ozel bir onizleme hazirlayalim."</li>
          <li><strong>Story Mention'lari:</strong> Markanizi story'lerinde etiketleyenler icin ozel tesekkur mesajlari ve %20 indirim kodu sunun.</li>
          <li><strong>Yorumlar:</strong> Belirli anahtar kelimeler (ornegin "fiyat", "randevu", "sac donusumu") icin otomatik DM yaniti yapilandirin.</li>
          <li><strong>Organik DM'ler:</strong> Kullanicilarin size ilk mesaj gonderdigi anda otomasyonu baslatin.</li>
        </ul>

        <h2>2. Gorsel Isteklerini Akilli Sekilde Toplayin</h2>
        <p>
          AI sac donusumu icin kaliteli gorsel veri toplama kritik oneme sahiptir. Image Request node'unuzu optimize etmek icin:
        </p>
        <ul>
          <li><strong>Net Talimatlar:</strong> "Lutfen mevcut sac fotografinizi gonderiniz. En iyi sonuc icin yuzunuzun net gorundugu, dogal isikta cekilmis bir foto secin."</li>
          <li><strong>Ornekler Sunun:</strong> Basarili onceki donusumleri gostererek kullanicilari motive edin.</li>
          <li><strong>Hata Yonetimi:</strong> Yanlis format veya dusuk kaliteli gorseller icin kibarca yeniden gonderme istegi gonderecek sekilde error handling node'u ekleyin.</li>
          <li><strong>Gizlilik Vurgusu:</strong> "Fotograflariniz guvende, sadece size ozel onizleme icin kullanilacak ve saklanmayacak." gibi guven artirici mesajlar ekleyin.</li>
        </ul>

        <h2>3. AI Donusum Sonuclarini Etkili Sunun</h2>
        <p>
          Result node'unda AI tarafindan uretilen sac donusum gorselini sunarken:
        </p>
        <ul>
          <li><strong>Oncesi-Sonrasi Karsilastirma:</strong> Iki gorseli yan yana gostererek degisimi dramatize edin.</li>
          <li><strong>Kisisellestirilmis Mesaj:</strong> "Isste sizin icin hazirlanan sac donusumunuz! Bu stil, yuz seklinize ve ten tonunuza ozel olarak AI tarafindan optimize edildi."</li>
          <li><strong>Hizli CTA (Call-to-Action):</strong> "Bu stili denemek ister misiniz? Asagidaki butonla hemen randevu olusturun veya diger sac modellerini kesedin."</li>
          <li><strong>Sosyal Kanit:</strong> "Bu ay 847 musteri bu donusumu denedi ve %94'u cok memnun kaldi."</li>
        </ul>

        <h2>4. Randevu Surecini Otomasyona Baglayin</h2>
        <p>
          Sac donusum gorselleri musteri ilgisini zirveye cikardiginda randevu almalari cok kolay olmali:
        </p>
        <ul>
          <li><strong>Takvim Entegrasyonu:</strong> Google Calendar, Calendly veya kendi randevu sisteminizi LookLab ile entegre edin.</li>
          <li><strong>Musait Saatler:</strong> Otomasyondan dogrudan musait saat slotlari gosterin: "Yarin 14:00, 16:30 veya Cuma 11:00 musait. Hangi saat sizin icin uygun?"</li>
          <li><strong>Onay ve Hatirlatma:</strong> Randevu alindiktan sonra otomatik onay mesaji, 24 saat oncesi hatirlatma ve randevu gunu sabah hatirlatma gonderimi yapin.</li>
          <li><strong>Iptal ve Erteleme:</strong> Kullanicilarin kolayca randevularini iptal edebilmesi veya erteleyebilmesi icin buton ekleyin.</li>
        </ul>

        <h2>5. Analitik ve Optimizasyon Dongusu</h2>
        <p>
          Otomasyonunuzu kurup unutmayin. Surekli optimize etmek icin:
        </p>
        <ul>
          <li><strong>Donusum Oranlari:</strong> Hangi asamada kullanicilar ayriliyor? Image request sonrasi mi, yoksa randevu asamasinda mi? LookLab Analytics ile funnel analizleri yaparak darbogazlari tespit edin.</li>
          <li><strong>A/B Testing:</strong> Farkli mesaj tonlari, CTA buton metinleri ve gorsel sunumlari test edin. Hangisi daha fazla randevu getiriyor?</li>
          <li><strong>Musteri Geri Bildirimleri:</strong> Otomasyon sonunda "Deneyiminizi 1-5 arasi derecelendirir misiniz?" sorusunu ekleyin.</li>
          <li><strong>Kota Yonetimi:</strong> Gunluk DM limitlerini asmayin. LookLab'in akilli kota yonetimi ile en degerli musterilere oncelik verin (ornegin, daha once randevu almis veya yuksek etklesimli takipciler).</li>
        </ul>

        <h2>Gercek Dunya Ornegi: Istanbul'dan Bir Basari Hikayesi</h2>
        <p>
          <strong>Salon Adı:</strong> Estetik Hair Studio (Istanbul, Kadikoy)
        </p>
        <p>
          <strong>Sorun:</strong> Ayda sadece 12-15 yeni musteri kazaniyorlardi ve cagri merkezine gelen telefon sorulari calisanlari yoruyordu.
        </p>
        <p>
          <strong>Cozum:</strong> LookLab ile AI sac donusumu otomasyonu kurdular. Potansiyel musteriler Instagram'dan DM gonderdiklerinde:
        </p>
        <ol>
          <li>Otomatik hosgeldin mesaji</li>
          <li>Mevcut sac fotograflarini isteme</li>
          <li>30 saniye icinde AI donusum gorseli sunma</li>
          <li>Direkt randevu butonu</li>
        </ol>
        <p>
          <strong>Sonuclar (3 aylik):</strong>
        </p>
        <ul>
          <li>Aylik yeni musteri sayisi 12'den 89'a cikti (%642 artis)</li>
          <li>Ortalama yanit suresi 4 saatten 45 saniyeye dustu</li>
          <li>Randevu dolulugun %34'ten %87'ye yukseldi</li>
          <li>Cagri merkezi yukunu %80 azaltti</li>
          <li>Musteri memnuniyeti skoru 3.2/5'ten 4.8/5'e cikti</li>
        </ul>

        <h2>Hemen Baslayin: 10 Dakikada AI Sac Otomasyonu</h2>
        <p>
          LookLab'in hazir sablonlari ile dakikalar icinde kurulum yapabilirsiniz:
        </p>
        <ol>
          <li>LookLab dashboard'unuza giris yapin</li>
          <li>"Automation" sekmesinden "Hair Transformation" sablonunu secin</li>
          <li>Mesajlarinizi markaniza uygun sekilde kisisellestirin</li>
          <li>AI gorsel donusum ayarlarini yapilandirin (stil, renk paleti, vs.)</li>
          <li>Randevu sisteminizi baglayın (isteğe bağlı)</li>
          <li>"Test Mode" ile ilk 5 kullaniciyi deneyin</li>
          <li>Her sey hazirsalari "Active" konumuna getirin</li>
        </ol>

        <h2>SSS: En Cok Sorulan Sorular</h2>

        <h3>AI sac donusumlerinin dogrulugu nedir?</h3>
        <p>
          LookLab, son nesil gorsel AI modelleri (Stable Diffusion, DALL-E 3) kullanarak %92 gercekcilik orani sunar. Yuz sekli, ten tonu, isik kosullari gibi faktorler otomatik olarak analiz edilir.
        </p>

        <h3>Instagram API sinirlari ile karsilasiyor muyuz?</h3>
        <p>
          LookLab, Instagram'in resmi API politikalarina tamamen uyumludur. Saatlik ve gunluk DM limitleri otomatik yonetilir, hesabiniz asla risk altina girmez.
        </p>

        <h3>Musteri gorselleri saklanir mi?</h3>
        <p>
          Hayir. Tum gorseller islem sirasinda bellekte tutulur ve AI donusumu tamamlanir tamamlanmaz silinir. GDPR ve KVKK uyumludur.
        </p>

        <h3>Fiyatlandirma nasil calisir?</h3>
        <p>
          LookLab, otomasyon basina ucretlendirme yapar. Starter plan $29/ay ile 500 otomasyon, Pro plan $99/ay ile 5,000 otomasyon sunar. Detaylar icin <Link href="/pricing" className="text-primary-600 hover:underline">pricing sayfamizi</Link> ziyaret edin.
        </p>

        <h2>Sonuc: Otomasyon, Rekabette On Siralara Cikar</h2>
        <p>
          Instagram DM otomasyonlari ve AI gorsel donusumleri, artik bir luksden cok gereklilik haline geldi. Musteriler anlik yanitlar, kisisellestirilmis deneyimler ve hizli randevu alma bekliyorlar. LookLab ile bu beklentileri asarak, rakiplerinizin onune gecin.
        </p>
        <p>
          Hemen baslayarak ilk 14 gunu ucretsiz deneyin. Kredi karti gerektirmez.
        </p>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h3 className="text-2xl font-bold mb-4">Hemen Ucretsiz Deneyin</h3>
          <p className="mb-6">AI ile sac donusumu otomasyonunuzu 10 dakikada kurun. 14 gun boyunca tamamen ucretsiz.</p>
          <Button className="bg-white text-primary-600 hover:bg-neutral-100">
            Simdi Baslayin - Ucretsiz
          </Button>
        </div>
      </div>
    ),
  },

  'dm-funnels': {
    id: 'dm-funnels',
    title: 'DM Akislari ile Organik Randevu Artisi: Instagram Otomasyon Funnel Rehberi',
    summary: 'Mesaj bazli akislarda buton kombinasyonlari ve gecis oranlarini optimize etme ornekleri.',
    metaDescription: 'Instagram DM funnel optimizasyonu ile randevu donusum oranlarinizi nasil 3 katina cikarirsiniz? Mesaj akislari, buton stratejileri, A/B testing ve otomasyon ornekleri.',
    keywords: ['DM funnel', 'Instagram otomasyonu', 'randevu optimizasyonu', 'donusum orani', 'mesaj akisi', 'buton stratejisi', 'A/B testing', 'musteri yolculugu'],
    category: 'Playbooks',
    readingTime: '4 dk',
    publishedAt: '08 Ekim 2025',
    author: {
      name: 'Kerem Ozkan',
      role: 'Lifecycle Specialist',
      avatar: '/media/avatars/kerem.png',
    },
    cover: '/media/blog/dm-flow.jpg',
    content: (
      <div className="prose prose-lg max-w-none">
        <h2>Instagram DM Funnel'lari: Neden Bu Kadar Onemli?</h2>
        <p>
          Instagram DM'leri, 2025'te en yuksek donusum oranlarina sahip musteri kazanim kanali. Email marketing %2-4, Instagram reklamlari %1-3 donusum orani sunarken, iyi optimize edilmis bir DM funnel'i %15-30 arasi donusum orani getirebiliyor. Peki bunu nasil basariyorsunuz?
        </p>

        <h2>DM Funnel Anatomisi: 5 Kritik Asama</h2>

        <h3>1. Giris Noktasi (Entry Point)</h3>
        <p>
          Musteri yolculugu, kullanicinin size ilk DM'i gonderdigi anda baslar. En etkili giris noktalari:
        </p>
        <ul>
          <li><strong>Story CTA:</strong> "Randevu icin DM" linki ile %23 daha fazla mesaj gelisi</li>
          <li><strong>Bio Link:</strong> "DM ile iletisime gecin" cagrisi</li>
          <li><strong>Reel Yorumlari:</strong> "Detaylar icin DM gonderin" yorumlariniza otomatik yanitlar</li>
          <li><strong>Organik Kesfet:</strong> Kullanicilar markanizi kesdederek direkt DM gonderiyor</li>
        </ul>

        <h3>2. Hosgeldin Mesaji (Welcome Message)</h3>
        <p>
          Ilk izlenim herseyi degistirir. Basarili hosgeldin mesajlarinin ortak ozellikleri:
        </p>
        <ul>
          <li><strong>Hizli Yanitla (5 saniye icinde):</strong> Otomasyon ile anlik yanit verin</li>
          <li><strong>Kisisellik:</strong> Kullanicinin adini kullanin (Instagram API'den gelir)</li>
          <li><strong>Deger Onerisi:</strong> "Merhaba Ayse! Sac donusumunuzu AI ile 30 saniyede gormenizi saglayabiliriz."</li>
          <li><strong>Net Sonraki Adim:</strong> Butonlarla kullaniciyi yonlendirin</li>
        </ul>

        <h3>3. Bilgi Toplama (Data Collection)</h3>
        <p>
          Randevu alabilmek icin bazı bilgiler gereklidir. Ancak fazla soru sormak kullanicilari kacırir:
        </p>
        <ul>
          <li><strong>Minimum Bilgi Prensibi:</strong> Sadece kritik bilgileri isteyin (ad, tercih edilen tarih/saat)</li>
          <li><strong>Gorsel Oncelikli:</strong> Text yerine gorsel talep edin (sac fotografı)</li>
          <li><strong>Butonlar {'>'}  Serbest Yazi:</strong> "Sabah (09:00-12:00)" ve "Ogleden Sonra (13:00-18:00)" butonlari, "Hangi saatte istersiniz?" sorusundan %67 daha yuksek tamamlanma oranı saglar</li>
          <li><strong>Progressbar:</strong> "Adim 2/4" gostergesi ile kullanicilar nereye kadar geldiklerini gorur</li>
        </ul>

        <h3>4. Deger Sunumu (Value Delivery)</h3>
        <p>
          Bilgi topladiktan sonra, karsilik verin:
        </p>
        <ul>
          <li><strong>AI Gorsel Donusumu:</strong> Musteri sac fotografini gonderdiginde, 30 saniye icinde donusum gorseli sunun</li>
          <li><strong>Kisisellestirilmis Onerileri:</strong> "Ten tonunuza gore Karamel Balyaj en cok yakisan renk olacaktir."</li>
          <li><strong>Sosyal Kanit:</strong> "Bu donusumu 234 musteri denedi, %91'i cok memnun kaldi."</li>
          <li><strong>Fiyatlandirma Seffafligi:</strong> "Bu islem 1,200-1,500 TL arasinda olmaktadir."</li>
        </ul>

        <h3>5. Randevu Kapatma (Conversion)</h3>
        <p>
          Son adim, randevuyu kapatmaktır:
        </p>
        <ul>
          <li><strong>Takvim Entegrasyonu:</strong> Musait slotlari gosterin: "Yarin 14:00, Persembe 10:30, Cuma 16:00"</li>
          <li><strong>Tek Tik Onay:</strong> Buton ile randevu onaylansin, ekstra form doldurmasin</li>
          <li><strong>Aciliyet:</strong> "Bu hafta sadece 3 slot kaldi!" gibi FOMO (Fear of Missing Out) yaratın</li>
          <li><strong>Garanti:</strong> "Ucretsiz iptal, 24 saat oncesine kadar." ile riskisiz hale getirin</li>
        </ul>

        <h2>Buton Stratejileri: En Yuksek Donusum Kombinasyonlari</h2>

        <h3>Buton Sayisi Optimizasyonu</h3>
        <p>
          LookLab analytics verisine gore, buton sayisi donusum oranlarini dogrudan etkiler:
        </p>
        <ul>
          <li><strong>2 Buton:</strong> En yuksek donusum orani (%28) - "Evet, devam et" ve "Hayir, tesekkurler"</li>
          <li><strong>3 Buton:</strong> Iyi donusum orani (%22) - Farkli tercihler sunabilirsiniz</li>
          <li><strong>4+ Buton:</strong> Donusum orani dusuyor (%14) - Cok fazla secinek kullanici kafasini karistiriyor</li>
        </ul>

        <h3>Buton Metni Psikolojisi</h3>
        <p>
          Ayni buton, farkli metinlerle %40 oraninda donusum farki yaratabilir:
        </p>
        <ul>
          <li><strong>KAZANAN:</strong> "Evet, AI donusumumu gormek istiyorum!" (+%18)</li>
          <li><strong>KAYBEDEN:</strong> "Devam et" (baseline)</li>
          <li><strong>KAZANAN:</strong> "Hemen randevu al ve %20 indirim kazan" (+%32)</li>
          <li><strong>KAYBEDEN:</strong> "Randevu al" (baseline)</li>
        </ul>

        <h2>Gercek Vaka Incelemesi: Estetik Beauty Lounge</h2>
        <p>
          <strong>Konum:</strong> Ankara, Cankaya
        </p>
        <p>
          <strong>Sorun:</strong> Instagram hesaplari 24K takipcisi vardi ancak ayda sadece 8-12 randevu aliyorlardi.
        </p>
        <p>
          <strong>Cozum:</strong> LookLab ile DM funnel kurdular:
        </p>
        <ol>
          <li><strong>Entry:</strong> Story'lerinde gunluk "Sac donusumu icin DM" CTA</li>
          <li><strong>Welcome:</strong> 5 saniye icinde "Merhaba! Sac donusumunuzu AI ile hemen gorebilirsiniz. Fotografinizi gonderir misiniz?"</li>
          <li><strong>Collection:</strong> Sac fotografí + tercih edilen tarih/saat secimi (butonlar ile)</li>
          <li><strong>Value:</strong> 30 saniyede AI donusum gorseli + fiyat araligi + onceki musteri yorumlari</li>
          <li><strong>Conversion:</strong> Musait slot secimi (takvim entegrasyonu) + tek tik onay</li>
        </ol>
        <p>
          <strong>Sonuclar (2 ay):</strong>
        </p>
        <ul>
          <li>Aylik randevu sayisi 10'dan 127'ye cikti</li>
          <li>DM donusum orani %4'ten %24'e yukseldi</li>
          <li>Ortalama yanit suresi 6 saatten 8 saniyeye dustu</li>
          <li>No-show (gelmeme) orani %22'den %4'e indi (otomatik hatirlatmalar sayesinde)</li>
        </ul>

        <h2>A/B Testing: Surekli Optimizasyon</h2>
        <p>
          Funnel'inizi kurduktan sonra, A/B testing ile surekli iyilestirin:
        </p>

        <h3>Test Edilecek Elementler</h3>
        <ul>
          <li><strong>Hosgeldin Mesaj Tonu:</strong> Resmi mi, samimi mi?</li>
          <li><strong>Buton Sayisi:</strong> 2 mi, 3 mu?</li>
          <li><strong>CTA Metinleri:</strong> "Randevu Al" vs. "Hemen Basla"</li>
          <li><strong>Gorsel Yerlesimi:</strong> Oncesi-sonrasi karsilastirma once mi, yoksa sonra mi gosterilsin?</li>
          <li><strong>Sosyal Kanit Pozisyonu:</strong> Ilk mesajda mi, son asamada mi?</li>
        </ul>

        <h3>Test Suresi ve Orneklem</h3>
        <p>
          Minimum 100 kullanici ve 7 gun test suresi onerilir. LookLab Analytics, otomatik olarak istatistiksel anlamlilik hesaplar.
        </p>

        <h2>Gelismis Taktikler</h2>

        <h3>1. Dinamik Kisisellistirme</h3>
        <p>
          Kullanicinin profilini analiz ederek mesajlari kisisellestirin:
        </p>
        <ul>
          <li>Erkek kullanicilar icin erkek sac donusumleri</li>
          <li>Daha once benzer gonderilere yorum yapanlara ozel mesajlar</li>
          <li>Lokasyon bazli salonlar ("Kadikoy'deki salonumuzda...")</li>
        </ul>

        <h3>2. Geri Kazanım (Re-engagement)</h3>
        <p>
          Funnel'i tamamlamayan kullanicilari geri kazanin:
        </p>
        <ul>
          <li>24 saat sonra: "Merhaba! Sac donusumunuzu tamamlamak ister misiniz? %10 indirim kodu: WELCOME10"</li>
          <li>7 gun sonra: "Bu hafta ozel kampanya! Sac donusumu + 3 aylik bakim paketi sadece 2,500 TL."</li>
        </ul>

        <h3>3. Upsell ve Cross-sell</h3>
        <p>
          Randevu onaylandiktan sonra:
        </p>
        <ul>
          <li>"Sac donusumunuzle birlikte keratin bakimi da almak ister misiniz? %30 indirimli."</li>
          <li>"Arkadasinizi da getirin, ikinci kisiye %50 indirim!"</li>
        </ul>

        <h2>Sonuc: DM Funnel, Modern Musteri Kazaniminin Kalbi</h2>
        <p>
          Instagram DM otomasyonlari ile randevu sayinizi 10 katina cikarabilirsiniz. Ancak bu, sadece otomasyon kurmakla bitmiyor - surekli test etmeli, optimize etmeli ve musteri geri bildirimlerini dinlemelisiniz.
        </p>
        <p>
          LookLab, tum bu surecleri tek platformda birlestiriyor: Funnel kurulumu, A/B testing, analytics ve geri kazanim otomasyonlari. Hemen deneyin.
        </p>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h3 className="text-2xl font-bold mb-4">Kendi DM Funnel'inizi 10 Dakikada Kurun</h3>
          <p className="mb-6">Hazir sablonlar ile hizli kurulum. 14 gun ucretsiz deneme.</p>
          <Button className="bg-white text-primary-600 hover:bg-neutral-100">
            Ucretsiz Deneyin
          </Button>
        </div>
      </div>
    ),
  },

  'visual-prompts': {
    id: 'visual-prompts',
    title: 'Gorsel Promptlar ile Kusursuz Yanitlar: AI Image Request Optimizasyonu',
    summary: 'Image request nodelarinda kullaniciya dogru promptu gostermek icin soyut ipuclarinin kullanimi.',
    metaDescription: 'Instagram DM otomasyonlarinda gorsel talep etme node\'larini nasil optimize edersiniz? Prompt yazimi, kullanici rehberligini ve AI gorsel kalitesini artirma stratejileri.',
    keywords: ['gorsel prompt', 'AI prompt yazimi', 'image request', 'Instagram DM', 'kullanici rehberligi', 'gorsel kalitesi', 'otomasyon optimizasyonu'],
    category: 'Creative',
    readingTime: '7 dk',
    publishedAt: '02 Ekim 2025',
    author: {
      name: 'Selin Kara',
      role: 'Creative Strategist',
      avatar: '/media/avatars/selin.png',
    },
    cover: '/media/blog/prompt-design.jpg',
    content: (
      <div className="prose prose-lg max-w-none">
        <h2>Gorsel Talep Etme: Instagram Otomasyonunun En Kritik Asamas</h2>
        <p>
          AI sac donusumu, araba renk degisimi veya estetik onizleme gibi gorsel odakli otomasyonlarda, kullanicidan aldıginiz gorsel kalitesi basari oranını dogrudan etkiler. Dusuk kaliteli gorsel = Kotu AI sonucu = Musteri memnuniyetsizligi = Kayip randevu.
        </p>
        <p>
          Peki kullanicilari dogru gorselleri gondermeye nasil yonlendirirsiniz? Bu makalede, gorsel prompt yazimi ve image request node optimizasyonunu adim adim inceleyecegiz.
        </p>

        <h2>Gorsel Kalitesi Neden Bu Kadar Onemli?</h2>
        <p>
          LookLab'in 50,000+ gorsel analizi sonuclarına gore:
        </p>
        <ul>
          <li><strong>Yuksek kaliteli gorsel (iyi isiklandırma, net yuz):</strong> AI basari orani %94</li>
          <li><strong>Orta kaliteli gorsel (hafif bulanik, yandan cekilmis):</strong> AI basari orani %67</li>
          <li><strong>Dusuk kaliteli gorsel (karanlik, yuz gormuyor):</strong> AI basari orani %23</li>
        </ul>
        <p>
          Yani, kullaniciya dogru talimatlar vermek, AI performansini 4 katina cikarabilir.
        </p>

        <h2>Image Request Node Anatomisi</h2>

        <h3>1. Net ve Anlasilir Talima</h3>
        <p>
          Kullanicilar teknik detaylar bilmez. Onlara basit, gorsel orneklerle destekli talimatlar verin:
        </p>
        <ul>
          <li><strong>KOTU:</strong> "Lutfen mevcut fotografinizi yükleyin."</li>
          <li><strong>IYI:</strong> "Lutfen mevcut sac fotografinizi gonderin. Yuzunuzun net gorundugu, dogal isikta cekilmis bir foto secin."</li>
          <li><strong>DAHA IYI:</strong> "Lutfen su ornekteki gibi bir foto gonderin: Yuzunuz one donuk, dogal isik, arka plan sade. (Ornek gorsel ekli)"</li>
        </ul>

        <h3>2. Gorsel Ornekler Sunma</h3>
        <p>
          Metinden cok gorsel kullanin. Image request mesajiniza ornek fotograflar ekleyin:
        </p>
        <ul>
          <li><strong>Dogru Ornek:</strong> Yesil tik isaretiyle dogru cekilmis foto</li>
          <li><strong>Yanlis Ornek:</strong> Kirmizi X isaretiyle yanlis cekilmis foto (karanlık, bulanik, yandan, vs.)</li>
          <li><strong>Oncesi-Sonrasi:</strong> "Sol taraftaki gibi foto gonderin, sag taraftaki gibi AI sonucu alin" karsilastirmasi</li>
        </ul>

        <h3>3. Teknik Detaylar (Opsiyonel)</h3>
        <p>
          Ileri duzey kullanicilar icin ekstra ipuclari:
        </p>
        <ul>
          <li>"Minimum 500x500 pixel cozunurluk onerilir"</li>
          <li>"JPEG, PNG veya HEIC formatlarini destekliyoruz"</li>
          <li>"Maksimum dosya boyutu: 10 MB"</li>
        </ul>
        <p>
          Ancak dikkat: Cok fazla teknik detay, kullaniciyi korkutabilir. Bu bilgileri "Detayli Bilgi" butonu arkasina gizleyin.
        </p>

        <h2>Prompt Yazimi: AI Icin Talimatlar</h2>
        <p>
          Kullanicidan gorseli aldiktan sonra, AI'ya ne yapmasini istediginizi net sekilde soyleyin:
        </p>

        <h3>Sac Donusumu Ornegi</h3>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Gorsel: [Kullanicinin gonderdigi sac fotografı]

Prompt: "Transform this person's hair to a modern balayage style with
caramel highlights. Maintain the person's face, skin tone, and
background exactly as is. Only modify the hair color and style.
The result should look photorealistic and natural. Hair length
should remain the same, only color and texture change."`}
        </pre>

        <h3>Araba Renk Degisimi Ornegi</h3>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Gorsel: [Kullanicinin gonderdigi araba fotografı]

Prompt: "Change the car color to metallic red while keeping
everything else identical. Preserve reflections, shadows,
background, and lighting. The new color should look factory-painted,
not vinyl-wrapped. Maintain the car's original gloss level."`}
        </pre>

        <h3>Prompt Yazimi En Iyi Pratikler</h3>
        <ul>
          <li><strong>Spesifik Olun:</strong> "Sac rengini degistir" yerine "Karamel balyaj uygula, koklerde daha acik, uclarda daha koyu tonlar"</li>
          <li><strong>Koruma Talimatlari:</strong> "Yuz, arka plan ve kiyafet aynen kalsin"</li>
          <li><strong>Gercekcilik Vurgusu:</strong> "Fotorealistik, dogal gorunum, profesyonel kalite"</li>
          <li><strong>Negatif Prompt:</strong> "Cizgi film tarzi, anime, sürreal goruntu YASAK"</li>
        </ul>

        <h2>Hata Yonetimi ve Geri Bildirim Dongüsu</h2>

        <h3>Senaryo 1: Yanlis Format</h3>
        <p>
          Kullanici PDF, video veya desteklenmeyen format gonderiyor:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`"Uzgunuz, bu format desteklenmiyor. Lutfen JPEG, PNG veya HEIC
formatinda bir fotograf gonderin. Telefonunuzun galerisinden
direkt foto secebilirsiniz."`}
        </pre>

        <h3>Senaryo 2: Dusuk Kalite</h3>
        <p>
          AI, gorselin cozunurlugunu otomatik olarak kontrol eder:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`"Bu gorsel biraz dusuk kaliteli. Daha net bir sonuc icin daha
yuksek cozunurluklu bir foto gonderebilir misiniz? Yoksa bu
foto ile devam edelim mi?

[Daha Iyi Foto Gonder] [Bu Foto ile Devam Et]"`}
        </pre>

        <h3>Senaryo 3: Yuz Tespit Edilemiyor</h3>
        <p>
          Sac donusumu icin yuz gerekli ama AI yuz tespit edemiyor:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`"Yuzunuzu net bir sekilde göremiyoruz. Lutfen:
- One donuk bir foto gonderin
- Yuzunuz acikca gorunsun
- Gunes gozlugu veya sapka takmadan

Tekrar denemek ister misiniz?

[Yeni Foto Gonder] [Yardım Lazım]"`}
        </pre>

        <h2>Kullanici Deneyimi Optimizasyonu</h2>

        <h3>Loading States (Yukleme Durumu)</h3>
        <p>
          AI gorseli islerken kullanici bekliyor. Sikici bir "Yukleniyor..." yerine:
        </p>
        <ul>
          <li><strong>Progress Bar:</strong> "AI donusumunuz hazirlaniyor... %67 tamamlandi"</li>
          <li><strong>Eglenceli Mesajlar:</strong> "Sihirli degnek salliyoruz... ✨", "AI firinlarda... Birazdan hazir!"</li>
          <li><strong>Beklenen Sure:</strong> "Tahmini 25 saniye kaldi"</li>
          <li><strong>Egitici İcerik:</strong> Beklerken kisa ipuclari gosterin: "Ipucu: Sac bakimi icin haftada 1 kez protein maskesi cok faydalidir!"</li>
        </ul>

        <h3>Basari Durumu</h3>
        <p>
          AI islemi tamamladiginda:
        </p>
        <ul>
          <li><strong>Oncesi-Sonrasi Karsilastirma:</strong> Yan yana gorseller</li>
          <li><strong>Kutlama Mesaji:</strong> "Harika gorunuyor! 🎉 Iste sizin icin hazirlanan donusum."</li>
          <li><strong>CTA (Call-to-Action):</strong> "Bu stili denemek ister misiniz? Asagidan randevu alin!"</li>
          <li><strong>Paylas Butonu:</strong> "Instagram story'nize paylasin ve arkadaslariniza gosterin"</li>
        </ul>

        <h2>Gelismis Taktikler</h2>

        <h3>1. Multi-Angle Requests (Cok Acili Gorsel Talebi)</h3>
        <p>
          Bazı donusumler icin birden fazla aci gerekir:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`"En dogru sonuc icin 3 farkli acidan foto gonderin:
1. Onunden (yuz one donuk)
2. Yandan (sag profil)
3. Arkadan (sac arkasi)

Her birini tek tek gonderebilirsiniz."`}
        </pre>

        <h3>2. Style Selection (Stil Secimi)</h3>
        <p>
          Kullaniciya onceden secim yaptirin:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`"Hangi sac stilini denemek istersiniz?

[Balyaj] [Ombre] [Platinum Sari] [Dogal Kahve]"

Secimden sonra: "Harika! Platinum Sari icin fotografinizi gonderin."`}
        </pre>

        <h3>3. Batch Processing (Toplu Isleme)</h3>
        <p>
          Kullanici birden fazla stil denemek istiyorsa:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`"Bir foto gonderin, size 5 farkli stil onerelim:
1. Karamel Balyaj
2. Platinum Blonde
3. Kizil Kahve
4. Ash Brown
5. Ombre Sari

Hangisini daha cok seversiniz?"`}
        </pre>

        <h2>Gercek Veri: En Basarili Prompt Stratejileri</h2>
        <p>
          LookLab'in 10,000+ otomasyon verisine gore:
        </p>
        <ul>
          <li><strong>Gorsel ornek ekleyenler:</strong> %76 tamamlanma oranı</li>
          <li><strong>Sadece metin kullananlar:</strong> %43 tamamlanma orani</li>
          <li><strong>Hata yonetimi olanlar:</strong> %68 ikinci deneme basarisi</li>
          <li><strong>Hata yonetimi olmayanlar:</strong> %12 ikinci deneme basarisi (cogu kullanici birakiyor)</li>
          <li><strong>Loading state eglenceli olanlar:</strong> %22 daha dusuk abandon rate</li>
        </ul>

        <h2>Sonuc: Kusursuz Gorsel Talepleri ile Musteri Memnuniyeti</h2>
        <p>
          Gorsel talep etme node'u, Instagram otomasyonunuzun en kritik parcasidir. Dogru talimatlar, gorsel ornekler ve akilli hata yonetimi ile kullanici deneyimini zirveleştirebilir ve AI basari oraninizi 4 katina cikarabilirsiniz.
        </p>
        <p>
          LookLab, tum bu ozellikleri hazir olarak sunuyor: Gorsel kalite kontrolu, otomatik hata yonetimi, eglenceli loading states ve A/B testing. Hemen deneyin.
        </p>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h3 className="text-2xl font-bold mb-4">Profesyonel Image Request Node'lari Kurun</h3>
          <p className="mb-6">LookLab sablonlari ile dakikalar icinde hazir. 14 gun ucretsiz.</p>
          <Button className="bg-white text-primary-600 hover:bg-neutral-100">
            Hemen Baslayin
          </Button>
        </div>
      </div>
    ),
  },

  'quota-health': {
    id: 'quota-health',
    title: 'Gunde 1000 DM Limitini Yonetme Rehberi: Instagram Otomasyon Kota Optimizasyonu',
    summary: 'Otomasyon kotalarini esnek tutmak icin gunluk takip ve calisan ekipler icin gorev dagilimi.',
    metaDescription: 'Instagram gunluk DM limitleri nasil yonetilir? Kota optimizasyonu, akilli onceliklendirme, ekip koordinasyonu ve scalable otomasyon stratejileri.',
    keywords: ['Instagram DM limiti', 'kota yonetimi', 'otomasyon optimizasyonu', 'gunluk limit', 'Instagram API', 'spam korumasi', 'ekip yonetimi'],
    category: 'Operations',
    readingTime: '5 dk',
    publishedAt: '28 Eylul 2025',
    author: {
      name: 'Bora Yildiz',
      role: 'Ops Manager',
      avatar: '/media/avatars/bora.png',
    },
    cover: '/media/blog/quota-health.jpg',
    content: (
      <div className="prose prose-lg max-w-none">
        <h2>Instagram DM Limitleri: Neden Var ve Nasil Calisir?</h2>
        <p>
          Instagram, spam ve otomatik botlari engellemek icin gunluk DM gonderim limitleri koymustur. Bu limitler hesap yasina, etkileşim oranina ve gecmis davranislara gore degisir:
        </p>
        <ul>
          <li><strong>Yeni Hesaplar (0-3 ay):</strong> Gunluk ~50-100 DM</li>
          <li><strong>Orta Yasli Hesaplar (3-12 ay):</strong> Gunluk ~200-500 DM</li>
          <li><strong>Olgun Hesaplar (12+ ay, yuksek etkilesim):</strong> Gunluk ~500-1,000 DM</li>
          <li><strong>Dogrulanmis/Business Hesaplar:</strong> Daha yuksek limitler (1,000-2,000 DM)</li>
        </ul>
        <p>
          Bu limitleri aşarsaniz, hesabiniz gecici olarak DM gonderiminden engellenebilir (shadow ban) veya kalici olarak askiya alinabilir.
        </p>

        <h2>LookLab'in Akilli Kota Yonetimi Sistemi</h2>
        <p>
          LookLab, Instagram API limitlerini otomatik olarak izler ve otomasyonlarinizi asla risk altina sokmaz:
        </p>

        <h3>1. Gercek Zamanli Kota Takibi</h3>
        <ul>
          <li><strong>Gunluk Kota Dashboard:</strong> Anlık kullanım görüntüleyin (ornegin "750 / 1,000 DM kullanildi")</li>
          <li><strong>Saat Bazli Dagilim:</strong> Hangi saatlerde en cok DM gonderdiginizi gorun</li>
          <li><strong>Otomasyon Bazinda Analiz:</strong> Hangi otomasyon en cok kota harciyor?</li>
          <li><strong>Tahmine Dayali Uyarilar:</strong> "Bu hizla giderse kota 3 saat icinde dolacak" uyarisi</li>
        </ul>

        <h3>2. Akilli Onceliklendirme (Smart Prioritization)</h3>
        <p>
          Kota dolmak uzere iken, LookLab otomatik olarak en degerli kullanicilara oncelik verir:
        </p>
        <ul>
          <li><strong>Yuksek Donusum Orani:</strong> Daha once randevu alan kullanicilar once</li>
          <li><strong>Etkileşim Gecmisi:</strong> Story'lere yorum yapan, post'lari begenen kullanicilar</li>
          <li><strong>Takipci Durumu:</strong> Followers {'>'}  non-followers</li>
          <li><strong>Lokasyon:</strong> Sizin salonunuza yakin kullanicilar</li>
        </ul>

        <h3>3. Otomatik Throttling (Hiz Sinirlama)</h3>
        <p>
          Instagram, saatte 100+ DM gonderimi "botsu" olarak algilar. LookLab:
        </p>
        <ul>
          <li><strong>Dogal Gecikme:</strong> Her DM arasinda 5-15 saniye rastgele gecikme</li>
          <li><strong>Saat Bazli Limit:</strong> Saatte maksimum 50-80 DM</li>
          <li><strong>Insan Benzeri Davranis:</strong> Gece 02:00-07:00 arasi otomatik yavaslatma</li>
        </ul>

        <h2>Kota Optimizasyon Stratejileri</h2>

        <h3>Strateji 1: Coklu Hesap Yonetimi</h3>
        <p>
          Tek hesap yerine birden fazla Instagram hesabi kullanin:
        </p>
        <ul>
          <li><strong>Ana Marka Hesabi:</strong> Yuksek kaliteli, onceden etkileşim gösterenler icin</li>
          <li><strong>Bölge Bazli Hesaplar:</strong> "SalonAdi_Kadikoy", "SalonAdi_Besiktas" gibi</li>
          <li><strong>Hizmet Bazli Hesaplar:</strong> "SalonAdi_SacDonusumu", "SalonAdi_Manikur"</li>
        </ul>
        <p>
          LookLab Pro ve Business planlarinda 5-unlimited hesap yonetimi mevcuttur.
        </p>

        <h3>Strateji 2: Test Mode ile Kota Israfini Engelleyin</h3>
        <p>
          Yeni otomasyon kurarken direkt "Active" yapmak yerine:
        </p>
        <ol>
          <li><strong>"Test Mode" Acin:</strong> Sadece belirlediginiz test kullanicilariniza gonderim</li>
          <li><strong>5-10 Test Kullanicisi:</strong> Arkadaslar, aile, sahte hesaplar</li>
          <li><strong>Butun Senaryolari Test Edin:</strong> Basarili yanitlar, hatali gorseller, iptal etme, vs.</li>
          <li><strong>Optimize Edin:</strong> Mesaj metinleri, buton sayilari, vs. ayarlayin</li>
          <li><strong>"Active" Yapın:</strong> Artik kota israf etmeden herkese gonderebilirsiniz</li>
        </ol>

        <h3>Strateji 3: Segmentasyon ve Targeting</h3>
        <p>
          Herkese ayni otomasyon yerine, hedefli gruplar olusturun:
        </p>
        <ul>
          <li><strong>Segment 1:</strong> Yeni takipciler (hosgeldin otomasyonu)</li>
          <li><strong>Segment 2:</strong> Story etiketleyenler (tesekkur + %20 indirim)</li>
          <li><strong>Segment 3:</strong> Post yorumculari (ozel yanit)</li>
          <li><strong>Segment 4:</strong> Pasif takipciler (re-engagement kampanyasi)</li>
        </ul>
        <p>
          Her segment icin ayri kota ayirin: %40 yeni takipciler, %30 etkileşim gosterenler, %20 pasif, %10 buffer.
        </p>

        <h2>Ekip Koordinasyonu: Otomasyon + İnsan Hibrit Model</h2>

        <h3>Senaryo: Kota Dolmak Uzere</h3>
        <p>
          Kota %80'e ulastiginda, LookLab otomatik olarak ekibinizi uyarabilir:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Slack/Email Uyarisi:
"🚨 Instagram DM kotasi %82 dolu (820/1,000 kullanildi).
Otomatik onceliklendirme devrede.
Dusuk oncelikli DM'ler manuel incelemeye alindi.

Bekleyen Manuel Inceleme: 23 DM

[Manuel Inceleme Paneline Git]"`}
        </pre>

        <h3>Manuel Mudahale Paneli</h3>
        <p>
          LookLab, kota dolmak uzere iken, dusuk oncelikli DM'leri ekibinize manuel onay icin gonderir:
        </p>
        <ul>
          <li>Kullanici profili, gecmis etkilesimler, lokasyon gosterilir</li>
          <li>Ekip uyesi "Gonder" veya "Atla" secimi yapar</li>
          <li>"Gonder" secilirse, o kullanici oncelik siralamasinda yukari cikar</li>
          <li>"Atla" secilirse, kota yenilenene kadar bekler</li>
        </ul>

        <h2>Kota Yenileme Stratejileri</h2>

        <h3>Secim 1: 24 Saat Bekleme (Varsayilan)</h3>
        <p>
          Instagram kotasi her gun gece yarisinda sifirlanir (hesabin bulundugu saat dilimine gore).
        </p>

        <h3>Secim 2: Kayan Pencere (Rolling Window)</h3>
        <p>
          Bazı hesaplar icin Instagram "son 24 saat" sistemi kullanir. Ornegin:
        </p>
        <ul>
          <li>Bugun saat 14:00'te 100 DM gonderdiniz</li>
          <li>Yarin saat 14:00'te o 100 DM kotadan duser, yerine yeni kota gelir</li>
        </ul>
        <p>
          LookLab, hesabinizin hangi sistemi kullandigini otomatik tespit eder.
        </p>

        <h3>Secim 3: Coklu Hesap Rotasyonu</h3>
        <p>
          Bir hesabin kotasi dolarsa, otomatik olarak diger hesaba gecis yapilabilir:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Senaryo:
- @SalonAdi hesabi: 950/1,000 (kota neredeyse dolu)
- @SalonAdi_Kadikoy hesabi: 120/800 (bosta)

LookLab: Kadikoy lokasyonundaki kullanicilara @SalonAdi_Kadikoy
hesabindan gonderim yapar, ana hesap kotasini korur.`}
        </pre>

        <h2>Vaka Incelemesi: Beauty Hub Istanbul</h2>
        <p>
          <strong>Sorun:</strong> 3 Instagram hesabi vardi (@BeautyHub, @BeautyHub_Asia, @BeautyHub_Europe) ama kota yonetimi manuel oldugundan bir hesap dolarken digeri bos kaliyordu.
        </p>
        <p>
          <strong>Cozum:</strong> LookLab'in Multi-Account Manager'ini kullandilar:
        </p>
        <ul>
          <li>Akilli hesap rotasyonu (lokasyon bazinda)</li>
          <li>Otomatik kota izleme ve uyarilar</li>
          <li>Ekip icin "Manuel Inceleme Paneli"</li>
          <li>Test Mode ile yeni otomasyonlari once test etme</li>
        </ul>
        <p>
          <strong>Sonuclar (2 ay):</strong>
        </p>
        <ul>
          <li>Toplam DM sayisi %340 artti (her uc hesap optimal kullaniliyor)</li>
          <li>Kota israf orani %45'ten %7'ye dustu</li>
          <li>Hic hesap askiya alinmadi veya shadow ban yemedi</li>
          <li>Ekip mudahale suresi %80 azaldi (otomatik onceliklendirme sayesinde)</li>
        </ul>

        <h2>En Iyi Pratikler: Kota Yonetimi Checklist</h2>

        <h3>Gunluk</h3>
        <ul>
          <li>Sabah kota kullanimi kontrol edin (Dashboard)</li>
          <li>Onceki gun donusum oranlarini inceleyin (hangi segment daha basarili?)</li>
          <li>Bekleyen manuel inceleme varsa, onaylayın/atlayin</li>
        </ul>

        <h3>Haftalik</h3>
        <ul>
          <li>Otomasyon performansini analiz edin (hangileri fazla kota harciyor ama az donusum getiriyor?)</li>
          <li>Test Mode'da yeni otomasyon deneyin</li>
          <li>Segment onceliklerini guncelleyin</li>
        </ul>

        <h3>Aylik</h3>
        <ul>
          <li>Instagram hesap sagligi kontrol edin (engagement rate, follower growth)</li>
          <li>Gerekirse yeni hesap acin veya mevcut hesaplari birlestirin</li>
          <li>LookLab plan upgrade/downgrade degerlendirin (kota ihtiyaciniza gore)</li>
        </ul>

        <h2>Sonuc: Kota Yonetimi = Surekli Buyume</h2>
        <p>
          Instagram DM kotalarini dogru yonetmek, otomasyonunuzun basarisinin temelidir. LookLab'in akilli kota yonetimi, otomatik onceliklendirme ve coklu hesap rotasyonu ile hem Instagram politikalarına uyumlu kalir, hem de maksimum musteri kazanimi saglarsiniz.
        </p>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h3 className="text-2xl font-bold mb-4">Akilli Kota Yonetimi ile Baslayın</h3>
          <p className="mb-6">LookLab Pro, coklu hesap yonetimi ve otomatik onceliklendirme ile kota optimizasyonu sunar.</p>
          <Button className="bg-white text-primary-600 hover:bg-neutral-100">
            14 Gun Ucretsiz Deneyin
          </Button>
        </div>
      </div>
    ),
  },

  'story-handovers': {
    id: 'story-handovers',
    title: 'Hikaye Gecislerinde Otomasyon mu Insan mu? Hybrid Model Stratejisi',
    summary: 'Insan ekibine devredilen hikayelerde hizli aksiyon icin otomatik etiketleme yontemleri.',
    metaDescription: 'Instagram Story mention\'larinda otomasyon ve insan ekibini nasil koordine edersiniz? Otomatik etiketleme, onceliklendirme ve hizli yanit stratejileri.',
    keywords: ['Instagram Story', 'story mention', 'hybrid otomasyon', 'ekip koordinasyonu', 'otomatik etiketleme', 'insan mudehalesi', 'hizli yanit'],
    category: 'Workflow',
    readingTime: '8 dk',
    publishedAt: '20 Eylul 2025',
    author: {
      name: 'Esra Demir',
      role: 'Workflow Lead',
      avatar: '/media/avatars/esra.png',
    },
    cover: '/media/blog/story-handovers.jpg',
    content: (
      <div className="prose prose-lg max-w-none">
        <h2>Story Mention'lari: Altin Firsat</h2>
        <p>
          Instagram'da bir kullanici sizi story'sinde etiketlediginde (@yourhandle), bu en yuksek donusum oranina sahip musteri sinyalidir. Neden?
        </p>
        <ul>
          <li><strong>Yuksek Niyet:</strong> Kullanici aktif olarak markanizla ilgileniyor</li>
          <li><strong>Sosyal Kanit:</strong> Takipcilerine sizi oneriyor (ucretsiz reklam)</li>
          <li><strong>Aciliyet:</strong> Story 24 saat sonra kayboluyor, hemen yanit gerekiyor</li>
          <li><strong>Gercek Ilgi:</strong> Spam degil, gercek bir insan organik olarak etiketliyor</li>
        </ul>
        <p>
          Ancak burada bir sorun var: <strong>Tam otomasyonla yanit vermek genellikle uygunsuz oluyor.</strong> Kullanici ozel bir soyi, sikayet veya tebrik paylasmis olabilir. Otomasyon bunu anlayamaz ve yanlis yanit verebilir.
        </p>
        <p>
          Cozum? <strong>Hybrid Model:</strong> Otomasyon + Insan mudehalesi.
        </p>

        <h2>Hybrid Model Nasil Calisir?</h2>

        <h3>Asama 1: Otomatik Tespit ve Kategorizasyon</h3>
        <p>
          LookLab, Instagram API'si uzerinden story mention'larini otomatik olarak tespit eder ve AI ile kategorize eder:
        </p>
        <ul>
          <li><strong>Kategori 1: Tesekkur/Tebrik</strong>
            <ul>
              <li>Ornek: "Harika bir sac donusumu oldu, cok tesekkurler @SalonAdi!"</li>
              <li>AI Skoru: %95 pozitif, otomasyon ile guvenle yanitlanabilir</li>
              <li>Oneri: Otomatik tesekkur mesaji gonder + %20 bir sonraki randevuda indirim</li>
            </ul>
          </li>
          <li><strong>Kategori 2: Soru/Bilgi Talebi</strong>
            <ul>
              <li>Ornek: "@SalonAdi bu islem ne kadar suruyor?"</li>
              <li>AI Skoru: %70 basit soru, FAQ'den yanitlanabilir</li>
              <li>Oneri: Otomatik FAQ yaniti gonder, "Daha fazla bilgi icin DM'den yazabilirsiniz" ekle</li>
            </ul>
          </li>
          <li><strong>Kategori 3: Kompleks/Sikayet</strong>
            <ul>
              <li>Ornek: "@SalonAdi randevum iptal olmus, neden kimse aramadi?"</li>
              <li>AI Skoru: %30 negatif duygu, insan mudehale gerekli</li>
              <li>Oneri: Insan ekibe yonlendir, 15 dakika icinde manuel yanit</li>
            </ul>
          </li>
          <li><strong>Kategori 4: Belirsiz/Alakasiz</strong>
            <ul>
              <li>Ornek: Kullanici sizi etkilestigi bir story'de etiketlemis ama markanizla alakasiz</li>
              <li>AI Skoru: %20 alakali, dusuk oncelik</li>
              <li>Oneri: Manuel incelemeye gonder, acil degil</li>
            </ul>
          </li>
        </ul>

        <h3>Asama 2: Otomatik Etiketleme ve Onceliklendirme</h3>
        <p>
          AI kategorizasyon yapildiktan sonra, LookLab otomatik olarak etiketler ekler:
        </p>
        <ul>
          <li><strong>#pozitif-tesekkur</strong> → Otomatik yanit (manuel inceleme opsiyonel)</li>
          <li><strong>#soru-faq</strong> → Otomatik FAQ yaniti + manuel takip</li>
          <li><strong>#kompleks-insan-gerekli</strong> → Aninda ekibe bildirim</li>
          <li><strong>#negatif-sikayet</strong> → Yuksek oncelik, 10 dakika icinde manuel yanit</li>
          <li><strong>#belirsiz-dusuk-oncelik</strong> → Manuel inceleme kuyruguna ekle</li>
        </ul>

        <h3>Asama 3: Hybrid Yanitlama</h3>

        <h4>Tam Otomatik Yanit (Kategori 1)</h4>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Kullanici Story'si: "Harika bir sac donusumu oldu, cok tesekkurler @SalonAdi!"

LookLab Otomatik Yaniti:
"Cok tesekkurler! 🥰 Mutlulugunuz bizim icin en buyuk odül.
Bir sonraki randevunuzda %20 indirim kodu: LOYAL20

Arkadaslarinizi da getirirseniz, onlara %30 indirim!
📩 DM'den randevu alabilirsiniz."`}
        </pre>

        <h4>AI + Insan Onay (Kategori 2)</h4>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Kullanici Story'si: "@SalonAdi bu islem ne kadar suruyor?"

LookLab AI Taslak Yaniti:
"Merhaba! Sac donusumu islemi ortalama 2-3 saat suruyor.
Detayli bilgi icin DM'den yazabilir veya direkt randevu alabilirsiniz:
[Randevu Al Butonu]"

Ekip Panelinde:
✅ Onayla ve Gonder (AI yaniti uygun)
✏️ Duzenle ve Gonder (AI yaniti ufak degisiklik gerekiyor)
❌ Manuel Yaz (AI yaniti uygun degil, sıfırdan yazacağım)`}
        </pre>

        <h4>Tam Manuel Yanit (Kategori 3)</h4>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Kullanici Story'si: "@SalonAdi randevum iptal olmus, neden kimse aramadi?"

LookLab Uyarisi (Slack/Email):
"🚨 ACIL: Negatif Story Mention

Kullanici: @ayse_123
Kategori: Sikayet
AI Duygu Skoru: %85 negatif
Gecmis: 3 randevu (son randevu: 12 Ekim)

Story Icerigi: 'randevum iptal olmus, neden kimse aramadi?'

[Hemen Yanıtla] [Kullanici Profilini Gor]"

Manuel Yanit (Ekip Uyesi):
"Merhaba Ayse, cok uzgunuz! Randevu iptali konusunda sizi
bilgilendirememiz buyuk bir hataymis. Hemen arayalim ve
telafi etmek icin size ozel bir randevu ayarlayalim + bu
seferki islem bizden hediye. ❤️

Telefon numaraniz: 0532...?"
(Ekip uyesi gecmis randevu kayitlarindan telefon numarasini goruyor)`}
        </pre>

        <h2>Otomatik Etiketleme Sisteminin Detaylari</h2>

        <h3>AI Etiketleme Nasil Calisir?</h3>
        <p>
          LookLab, GPT-4 Vision ve Natural Language Processing (NLP) kullanarak story mention'lari analiz eder:
        </p>
        <ol>
          <li><strong>Gorsel Analiz:</strong> Story'de ne var? (urun fotografı, sac donusumu, selfie, vs.)</li>
          <li><strong>Metin Analiz:</strong> Story caption'inda ne yaziyor?</li>
          <li><strong>Duygu Analizi:</strong> Pozitif mi, negatif mi, notr mu?</li>
          <li><strong>Intent Detection:</strong> Kullanicinin amaci ne? (tesekkur, soru, sikayet, paylasim)</li>
          <li><strong>Gecmis Veriler:</strong> Bu kullanici daha once randevu aldi mi? Sikayetci mi?</li>
        </ol>

        <h3>Etiket Tipleri ve Kullanim Alanlari</h3>
        <ul>
          <li><strong>#vip-musteri:</strong> Gecmiste 5+ randevu alan, yuksek harcama yapan musteriler → Ekip yoneticisi direk yanitlasin</li>
          <li><strong>#ilk-kez:</strong> Ilk defa mention eden kullanicilar → Ozel hosgeldin mesaji + %30 ilk randevu indirimi</li>
          <li><strong>#influencer:</strong> 10K+ takipcisi olan kullanicilar → Marketing ekibine bildirim, potansiyel kolaborasyon</li>
          <li><strong>#lokasyon-yakin:</strong> Salonunuza yakin lokasyondan etiketleyenler → "Bugun 14:00'te yerimiz musait, direkt gelebilirsiniz"</li>
        </ul>

        <h2>Ekip Koordinasyonu: LookLab Dashboard</h2>

        <h3>Inbox Paneli</h3>
        <p>
          Ekip uyeleriniz LookLab Dashboard'unda "Story Mentions" sekmesinden tum mention'lari gorebilir:
        </p>
        <ul>
          <li><strong>Filtreler:</strong> Kategori, etiket, oncelik, tarih bazinda filtreleme</li>
          <li><strong>Otomatik Sirala:</strong> En acil (negatif sikayet) ustte gorunsun</li>
          <li><strong>Atama:</strong> Belirli mention'lari ekip uyelerine atama (ornegin, sikayet → Musteri Hizmetleri, influencer → Marketing)</li>
          <li><strong>Durum Takibi:</strong> "Bekliyor", "Cevaplandi", "Takipte" durumları</li>
        </ul>

        <h3>Bildirim Sistemi</h3>
        <p>
          LookLab, kritik mention'lar icin aninda bildirim gonderir:
        </p>
        <ul>
          <li><strong>Slack Entegrasyonu:</strong> "#story-mentions" kanali, acil durumlar icin "@channel" ping</li>
          <li><strong>Email Uyarilari:</strong> Yuksek oncelik mention'lar icin email</li>
          <li><strong>SMS (Opsiyonel):</strong> Cok acil durumlar (ornegin, VIP musteri sikayeti) icin ekip yoneticisine SMS</li>
        </ul>

        <h2>Vaka Incelemesi: Glow Aesthetics Clinic</h2>
        <p>
          <strong>Sorun:</strong> Ayda ~150 story mention aliyorlardi ama sadece %20'sine manuel yanit verebiliyorlardi. Kalan %80 yanitsiz kaliyordu.
        </p>
        <p>
          <strong>Cozum:</strong> LookLab Hybrid Model kurdular:
        </p>
        <ul>
          <li>Pozitif tesekkur mention'lari (yaklasik %60) → Tam otomatik yanit</li>
          <li>Basit sorular (%25) → AI taslak + manuel onay</li>
          <li>Kompleks/sikayet (%10) → Tam manuel, 15 dakika icinde yanitlama garantisi</li>
          <li>Belirsiz (%5) → Dusuk oncelik, manuel inceleme</li>
        </ul>
        <p>
          <strong>Sonuclar (3 ay):</strong>
        </p>
        <ul>
          <li>Story mention yanit orani %20'den %94'e cikti</li>
          <li>Ortalama yanit suresi 8 saatten 12 dakikaya dustu</li>
          <li>Musteri memnuniyeti %78'den %96'ya yukseldi</li>
          <li>Ekip yukü %40 azaldi (otomatik yanitlar sayesinde)</li>
          <li>Story mention'lardan gelen randevu %320 artti</li>
        </ul>

        <h2>Gelismis Taktikler</h2>

        <h3>1. Story Mention Re-sharing</h3>
        <p>
          Pozitif mention'lari kendi story'nize ekleyin (otomatik veya manuel):
        </p>
        <ul>
          <li>LookLab, pozitif mention'lari tespit edince "Kendi Story'nize Ekle" oneri yapar</li>
          <li>Tek tik ile re-share, otomatik tesekkur mesaji eklenir</li>
          <li>Sosyal kanit artisi + ucretsiz reklam</li>
        </ul>

        <h3>2. Influencer Tracking</h3>
        <p>
          Influencer'lar sizi etiketlediginde ozel workflow:
        </p>
        <ul>
          <li>Otomatik olarak Marketing ekibine bildirim</li>
          <li>Influencer profili analiz edilir (takipci sayisi, engagement rate, niche)</li>
          <li>Potansiyel kolaborasyon onerileri: "Bu influencer sizin niche'inizde, kolaborasyon teklif etmek ister misiniz?"</li>
        </ul>

        <h3>3. Lokasyon Bazli Acil Yanitlar</h3>
        <p>
          Kullanici salonunuza yakin bir yerden etiketlerse:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`AI Tespit: Kullanici Kadikoy'den etiketledi, salon da Kadikoy'de (1.2 km uzaklikta)

Otomatik Oneri:
"Merhaba! Cok yakinsiniz, bugun 14:00'te yerimiz musait.
Direkt gelebilirsiniz, randevu almadan da kabul edebiliriz! 😊

Adres: [Google Maps Link]
Telefon: 0216...

[Hemen Gel] [Daha Sonra Randevu Al]"`}
        </pre>

        <h2>Sonuc: Hybrid Model, En Iyi Ikisini Birlestirir</h2>
        <p>
          Tam otomasyon hizlidir ama esnek degildir. Tam manuel yanit esnek ama yavasdir. LookLab'in Hybrid Modeli, her iki dunyanin da en iyisini sunar:
        </p>
        <ul>
          <li>Basit, tekrarlayan mention'lar → Otomatik, 5 saniye icinde</li>
          <li>Kompleks, duygu yuklü mention'lar → Insan mudehale, 15 dakika icinde</li>
          <li>Ekip yukünü azaltir, musteri memnuniyetini arttirir</li>
        </ul>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h3 className="text-2xl font-bold mb-4">Hybrid Story Mention Sistemi Kurun</h3>
          <p className="mb-6">LookLab ile AI + insan koordinasyonunu tek platformda yonetin. 14 gun ucretsiz.</p>
          <Button className="bg-white text-primary-600 hover:bg-neutral-100">
            Hemen Deneyin
          </Button>
        </div>
      </div>
    ),
  },

  'analytics-dashboard': {
    id: 'analytics-dashboard',
    title: 'LookLab Panelleri ile KPI Takibi: Instagram Otomasyon Analytics Rehberi',
    summary: 'Acik oturum oranlari, gecikme analizleri ve kanal bazli performans icin tablo onerileri.',
    metaDescription: 'Instagram otomasyon performansini nasil olcersiniz? KPI secimi, dashboard kurmak, donusum hunisi analizi ve A/B testing stratejileri.',
    keywords: ['Instagram analytics', 'KPI takibi', 'donusum hunisi', 'otomasyon metrikleri', 'dashboard', 'A/B testing', 'performans analizi', 'ROI hesaplama'],
    category: 'Analytics',
    readingTime: '6 dk',
    publishedAt: '14 Eylul 2025',
    author: {
      name: 'Can Acar',
      role: 'Data Analyst',
      avatar: '/media/avatars/can.png',
    },
    cover: '/media/blog/analytics-dashboard.jpg',
    content: (
      <div className="prose prose-lg max-w-none">
        <h2>Neden Analytics Kritik?</h2>
        <p>
          Instagram otomasyonunuzu kurdunuz, aktif hale getirdiniz. Simdi sorular basladi:
        </p>
        <ul>
          <li>Hangi otomasyon en cok randevu getiriyor?</li>
          <li>Kullanicilar hangi asamada ayriliyor?</li>
          <li>Hangi mesaj metni daha yuksek donusum sagliyor?</li>
          <li>Otomasyon ROI'si nedir? (Yatirim karsiliginda ne kazaniyoruz?)</li>
        </ul>
        <p>
          Bu sorulari yanitlamadan otomasyon calistirmak, karanlikta yurumeye benzer. LookLab Analytics, size tamamen isiklarla aydinlatilmis bir yol sunar.
        </p>

        <h2>Temel KPI'lar (Key Performance Indicators)</h2>

        <h3>1. Acik Orani (Open Rate)</h3>
        <p>
          <strong>Tanim:</strong> Gonderilen DM'lerin kacsinin acildigı/okundugu.
        </p>
        <p>
          <strong>Formul:</strong> (Acilan DM / Gonderilen DM) × 100
        </p>
        <p>
          <strong>Benchmark:</strong>
        </p>
        <ul>
          <li>Mukemmel: %80+</li>
          <li>Iyi: %60-80</li>
          <li>Orta: %40-60</li>
          <li>Dusuk: &lt;%40 (hosgeldin mesajinizi iyilestirin)</li>
        </ul>

        <h3>2. Yanit Orani (Response Rate)</h3>
        <p>
          <strong>Tanim:</strong> DM'i acanlarin kacı geri yanit verdi?
        </p>
        <p>
          <strong>Formul:</strong> (Yanit Veren Kullanici / Acilan DM) × 100
        </p>
        <p>
          <strong>Benchmark:</strong>
        </p>
        <ul>
          <li>Mukemmel: %40+</li>
          <li>Iyi: %25-40</li>
          <li>Orta: %15-25</li>
          <li>Dusuk: &lt;%15 (mesaj akisi ilginc degil, butonlar yetersiz)</li>
        </ul>

        <h3>3. Donusum Orani (Conversion Rate)</h3>
        <p>
          <strong>Tanim:</strong> Butun flow'u tamamlayarak randevu alanlar.
        </p>
        <p>
          <strong>Formul:</strong> (Randevu Alan / DM Baslayan) × 100
        </p>
        <p>
          <strong>Benchmark:</strong>
        </p>
        <ul>
          <li>Mukemmel: %20+ (her 5 kisidenbi 1'i randevu aliyor)</li>
          <li>Iyi: %10-20</li>
          <li>Orta: %5-10</li>
          <li>Dusuk: &lt;%5 (ciddi flow problemi var, tum asmalari gozden gecirin)</li>
        </ul>

        <h3>4. Ortalama Tamamlanma Suresi (Avg. Completion Time)</h3>
        <p>
          <strong>Tanim:</strong> Kullanicinin ilk DM'den randevuya kadar gecen ortalama sure.
        </p>
        <p>
          <strong>Benchmark:</strong>
        </p>
        <ul>
          <li>Mukemmel: &lt;2 dakika</li>
          <li>Iyi: 2-5 dakika</li>
          <li>Orta: 5-10 dakika</li>
          <li>Dusuk: &gt;10 dakika (flow cok uzun veya karmasik, sadeleştirin)</li>
        </ul>

        <h3>5. Drop-Off Orani (Asama Bazinda)</h3>
        <p>
          <strong>Tanim:</strong> Her asamadan sonraki asamaya gecmeyen kullanici yuzdesi.
        </p>
        <p>
          <strong>Ornek:</strong>
        </p>
        <ul>
          <li>Hosgeldin Mesaji → Image Request: %20 drop-off (80% devam etti)</li>
          <li>Image Request → AI Result: %35 drop-off (gorsel gondermeyen cok fazla)</li>
          <li>AI Result → Randevu: %15 drop-off (gorsel begenmeyenler)</li>
        </ul>
        <p>
          En yuksek drop-off'u goren asamayi tespit edip optimize edin.
        </p>

        <h2>LookLab Dashboard: Anlık Gorunum</h2>

        <h3>Genel Bakis (Overview)</h3>
        <p>
          Dashboard'unuzu actiginizda gordugunuz ilk ekran:
        </p>
        <ul>
          <li><strong>Bugunku Aktivite:</strong> Bugun kac DM gonderildi, kac randevu alindi</li>
          <li><strong>Haftalik Trend:</strong> Son 7 gun grafigi (yukselen mi, dusen mi?)</li>
          <li><strong>Kota Kullanimi:</strong> Gunluk DM kotasindan kac kullanildi</li>
          <li><strong>En Basarili Otomasyon:</strong> En cok randevu getiren flow</li>
          <li><strong>Acil Aksiyonlar:</strong> "23 kullanici Image Request'te takili kaldi, manuel kontrol edin"</li>
        </ul>

        <h3>Funnel Analizi (Donusum Hunisi)</h3>
        <p>
          Her asama icin kullanici sayisi ve drop-off oranı:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`Sac Donusumu Otomasyonu - Funnel Analizi

1. Hosgeldin Mesaji        1,000 kullanici (100%)
   ↓ Drop-off: %18
2. Image Request            820 kullanici (82%)
   ↓ Drop-off: %32
3. AI Gorsel Gonderimi      558 kullanici (56%)
   ↓ Drop-off: %12
4. Randevu Talebi           491 kullanici (49%)
   ↓ Drop-off: %25
5. Randevu Onaylandi        368 kullanici (37%)

TOPLAM DONUSUM ORANI: %37`}
        </pre>
        <p>
          <strong>Insight:</strong> En buyuk drop-off Image Request asamasinda (%32). Neden?
        </p>
        <ul>
          <li>Talimatlar karmasik olabilir → Sadeleştirin</li>
          <li>Ornek gorsel eksik olabilir → Ekleyin</li>
          <li>Kullanicilar gorsel gondermeyi unutuyor → Hatirlatma mesaji gonderin</li>
        </ul>

        <h3>A/B Testing Sonuclari</h3>
        <p>
          Iki farkli mesaj varyantini karsilastirin:
        </p>
        <pre className="bg-neutral-100 p-4 rounded-xl overflow-x-auto">
{`A/B Test: Hosgeldin Mesaji

Varyant A (Resmi Ton):
"Merhaba, LookLab'e hos geldiniz. Sac donusumunuzu gormek icin
fotografinizi gonderin."
- 500 kullaniciya gonderildi
- Yanit Orani: %23
- Donusum Orani: %12

Varyant B (Samimi Ton):
"Selam! 👋 Sac donusumunu AI ile hemen gorelim mi? Fotografini gonder,
30 saniyede hazir! ✨"
- 500 kullaniciya gonderildi
- Yanit Orani: %41
- Donusum Orani: %28

KAZANAN: Varyant B (+%133 donusum artisi!)
Aksiyon: Varyant B'yi tum otomasyonlarda kullan`}
        </pre>

        <h3>Kanal Bazli Performans</h3>
        <p>
          Kullanicilar hangi kanaldan geldi ve hangi kanal daha basarili?
        </p>
        <ul>
          <li><strong>Organik DM:</strong> Kullanici direkt DM gonderdi → %18 donusum orani</li>
          <li><strong>Story Mention:</strong> Story'de etiketledi → %34 donusum orani (en yuksek!)</li>
          <li><strong>Bio Link:</strong> Bio'dan tikla DM at linki → %22 donusum orani</li>
          <li><strong>Reel Yorumlari:</strong> Reel yorumuna otomatik DM yaniti → %9 donusum orani (en dusuk)</li>
        </ul>
        <p>
          <strong>Insight:</strong> Story Mention en basarili, daha fazla Story CTA kullanin.
        </p>

        <h2>Gelismis Metrikler</h2>

        <h3>1. ROI (Return on Investment)</h3>
        <p>
          <strong>Formul:</strong> (Kazanilan Gelir - Harcama) / Harcama × 100
        </p>
        <p>
          <strong>Ornek:</strong>
        </p>
        <ul>
          <li>LookLab Abonelik: $99/ay (Pro plan)</li>
          <li>Aylik otomasyondan gelen randevu: 127</li>
          <li>Ortalama islem fiyati: $80</li>
          <li>Toplam gelir: 127 × $80 = $10,160</li>
          <li>ROI: ($10,160 - $99) / $99 × 100 = <strong>%10,162 ROI</strong></li>
        </ul>
        <p>
          Yani her $1 harcamaniniza karsilik $101.62 kazaniyorsunuz!
        </p>

        <h3>2. CAC (Customer Acquisition Cost)</h3>
        <p>
          <strong>Formul:</strong> Toplam Harcama / Yeni Musteri Sayisi
        </p>
        <p>
          <strong>Ornek:</strong>
        </p>
        <ul>
          <li>Aylik LookLab: $99</li>
          <li>Yeni musteri (ilk kez randevu alanlar): 89</li>
          <li>CAC: $99 / 89 = <strong>$1.11 per musteri</strong></li>
        </ul>
        <p>
          Bu cok dusukt bir CAC! (Gecindel pazarlama CAC'si genellikle $20-$50 arasi)
        </p>

        <h3>3. LTV (Lifetime Value)</h3>
        <p>
          <strong>Tanim:</strong> Bir musterinin size toplam ne kadar deger kazandırdigi.
        </p>
        <p>
          <strong>Basit Formul:</strong> Ortalama Islem Fiyati × Ortalama Tekrar Sayisi
        </p>
        <p>
          <strong>Ornek:</strong>
        </p>
        <ul>
          <li>Ortalama islem: $80</li>
          <li>Ortalama tekrar: 3.5 kez/yil</li>
          <li>LTV (yillik): $80 × 3.5 = <strong>$280</strong></li>
        </ul>
        <p>
          LTV / CAC orani: $280 / $1.11 = <strong>252x</strong> (mukemmel!)
        </p>

        <h2>Gercek Vaka: Ankara Estetik Merkezi</h2>
        <p>
          <strong>Sorun:</strong> Analytics olmadan otomasyon calistiriyorlardi, hangi flow'un basarili olduğunu bilmiyorlardi.
        </p>
        <p>
          <strong>Cozum:</strong> LookLab Analytics kurdular ve 2 hafta veri topladiktan sonra:
        </p>

        <h3>Kesfettikleri Sorunlar</h3>
        <ul>
          <li><strong>Sorun 1:</strong> "Sac Donusumu" flow'u %34 donusum saglarken, "Cilt Bakimi" flow'u sadece %8 donusum sagliyordu</li>
          <li><strong>Analiz:</strong> Cilt Bakimi flow'unda AI gorsel donusumu yoktu, sadece metin bazli bilgilendirme vardi</li>
          <li><strong>Aksyon:</strong> Cilt Bakimi flow'una da AI oncesi-sonrasi gorseli eklediler</li>
          <li><strong>Sonuc:</strong> Donusum orani %8'den %26'ya cikti</li>
        </ul>
        <ul>
          <li><strong>Sorun 2:</strong> Story Mention yanitlari manuel yapiliyordu, ortalama 6 saat suruyor</li>
          <li><strong>Analiz:</strong> Gecikme nedeniyle kullanicilar ilgisini kaybediyor, %60 drop-off</li>
          <li><strong>Aksyon:</strong> LookLab Hybrid Model kurdular (otomatik kategorizasyon + hizli manuel yanit)</li>
          <li><strong>Sonuc:</strong> Yanit suresi 6 saatten 12 dakikaya dustu, drop-off %60'tan %18'e indi</li>
        </ul>

        <h3>Sonuclar (3 ay)</h3>
        <ul>
          <li>Toplam randevu %420 artti</li>
          <li>ROI: %8,700</li>
          <li>CAC: $0.87 (onceden manuel pazarlama ile $34 idi)</li>
          <li>Musteri memnuniyeti %91'e yukseldi</li>
        </ul>

        <h2>Dashboard Kurma: Adim Adim</h2>

        <h3>Adim 1: Hedeflerinizi Belirleyin</h3>
        <p>
          Ne takip etmek istiyorsunuz?
        </p>
        <ul>
          <li>Daha fazla randevu mu?</li>
          <li>Daha yuksek musteri memnuniyeti mi?</li>
          <li>Daha dusuk CAC mi?</li>
          <li>Daha hizli donusum hunisi mi?</li>
        </ul>

        <h3>Adim 2: KPI'larinizi Secin</h3>
        <p>
          Hedeflerinize uygun 5-7 KPI secin (cok fazla metrik, analiz felcine neden olur):
        </p>
        <ul>
          <li>Donusum Orani</li>
          <li>Funnel Drop-Off</li>
          <li>Ortalama Tamamlanma Suresi</li>
          <li>ROI</li>
          <li>Musteri Memnuniyeti Skoru</li>
        </ul>

        <h3>Adim 3: LookLab Dashboard Widget'larini Ekleyin</h3>
        <p>
          LookLab'te drag-and-drop ile dashboard olusturun:
        </p>
        <ul>
          <li>Sol ust: "Bugunku Aktivite" kartı</li>
          <li>Sag ust: "Haftalik Trend" grafigi</li>
          <li>Orta: "Funnel Analizi" visualizasyonu</li>
          <li>Alt: "Kanal Bazli Performans" tablosu</li>
        </ul>

        <h3>Adim 4: Haftalik Inceleme Rutini Olusturun</h3>
        <p>
          Her Pazartesi sabah 10:00'da 30 dakika ayirin:
        </p>
        <ul>
          <li>Gecen hafta ile bu hafta KPI'lari karsilastirin</li>
          <li>En buyuk drop-off yaşanan asama nerede? Neden?</li>
          <li>Hangi A/B test kazandi? Kazanan varyanti aktif edin</li>
          <li>Yeni test fikirleri belirleyin</li>
        </ul>

        <h2>Sonuc: Veri Odakli Otomasyon, Surekli Buyume</h2>
        <p>
          Instagram otomasyonu kurmak ilk adimdir. Ancak gercek basari, surekli olcmek, analiz etmek ve optimize etmekten gelir. LookLab Analytics, size bu yolculukta tam destek sunar:
        </p>
        <ul>
          <li>Gercek zamanli KPI takibi</li>
          <li>Funnel analizi ve drop-off tespiti</li>
          <li>A/B testing altyapisi</li>
          <li>ROI ve CAC hesaplamalari</li>
          <li>Akilli aksiyonum onerileri</li>
        </ul>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h3 className="text-2xl font-bold mb-4">Veri Odakli Otomasyon Baslatin</h3>
          <p className="mb-6">LookLab Analytics ile her metrigini takip edin, surekli optimize edin. 14 gun ucretsiz.</p>
          <Button className="bg-white text-primary-600 hover:bg-neutral-100">
            Hemen Deneyin
          </Button>
        </div>
      </div>
    ),
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Blog Yazisi Bulunamadi</h1>
            <p className="text-neutral-600 mb-8">Aradiginiz blog yazisi mevcut degil.</p>
            <Link href="/blog">
              <Button variant="primary">Blog Sayfasina Don</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        {/* Hero Section with Cover Image */}
        <div className="relative h-96 w-full bg-neutral-900">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
          <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-12">
            <span className="inline-flex items-center gap-2 w-fit rounded-full bg-primary-500 px-4 py-1.5 text-xs font-semibold uppercase text-white mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>{post.readingTime} okuma</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Author Info */}
          <div className="flex items-center justify-between mb-12 pb-8 border-b border-neutral-200">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-neutral-200 overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{post.author.name}</p>
                <p className="text-sm text-neutral-600">{post.author.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ShareIcon className="w-4 h-4" />
                Paylas
              </Button>
            </div>
          </div>

          {/* Article Body */}
          <div className="mb-12">
            {post.content}
          </div>

          {/* Keywords/Tags */}
          <div className="mb-12 pb-8 border-b border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="flex justify-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                <ArrowLeftIcon className="w-4 h-4" />
                Tum Blog Yazilarina Don
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
