# Antigravity Oyun İstemi: Gökyüzü Görevi – Türk Bayraklarını Topla

## 1. Rolün ve hedefin

Deneyimli bir HTML5 oyun geliştiricisi ve çocuklara yönelik arayüz tasarımcısı gibi çalış. İlkokul öğrencilerinin okulda akıllı tahta üzerinden oynayabileceği, Türkçe arayüzlü, eğlenceli ve güvenli bir **2D arcade uçuş oyunu** geliştir.

Oyunun adı: **Gökyüzü Görevi: Türk Bayraklarını Topla**

Oyuncu bir uçağı kontrol eder, uçuş rotasında beliren Türk bayraklarını toplar ve bulut kümeleri, kuş sürüleri, sıcak hava balonları ve dağ zirveleri gibi engellerden kaçar. Oyun bir gerçekçi pilotaj simülatörü değil; ilkokul öğrencileri için anlaşılır, akıcı ve refleks geliştirmeye yönelik bir uçuş oyunudur.

**Yalnızca tasarım önerisi veya örnek kod verme. Çalışan oyunu proje dosyalarıyla oluştur, çalıştır ve temel oynanış hatalarını kontrol et.**

## 2. Hedef cihaz ve teknik gereksinimler

- Öncelik: okul akıllı tahtası ve masaüstü tarayıcı.
- Yatay ekran ve 16:9 görünüm için tasarla; farklı ekran boyutlarına da uyum sağla.
- HTML, CSS ve saf JavaScript kullan. Harici kütüphane, sunucu, hesap, API veya internet bağlantısı gerektirme.
- Projeyi `index.html`, `style.css` ve `game.js` dosyalarına ayır.
- Oyun tarayıcıda doğrudan açıldığında çalışmalı.
- Ana oyun alanı ekranı mümkün olduğunca doldurmalı; sayfa kaydırma çubukları oluşmamalı.
- Bir **Tam Ekran** düğmesi ekle. Tarayıcının tam ekran kısıtlamaları varsa düğmeye basıldıktan sonra ilgili tarayıcı API'sini çağır.
- Pencere boyutu değiştiğinde oyun alanı ve dokunmatik kontroller doğru biçimde yeniden ölçeklensin.
- Haricî görsel dosyalarına bağımlı olma. Uçak, bayrak, bulut, kuş, balon ve arka planı Canvas üzerinde veya CSS şekilleriyle çiz.
- Kod okunabilir, işlevlere ayrılmış ve açıklayıcı yorumlar içeren yapıda olsun.

## 3. Görsel tasarım

- Canlı, ferah ve çocuk dostu çizgi film estetiği kullan.
- Gökyüzünde açık mavi tonlardan oluşan yumuşak bir gradyan, uzak bulutlar ve ufukta deniz veya yeşil tepeler bulunsun.
- Uçak belirgin, sempatik ve kolay seçilebilir olsun. Uçak ekranın alt-orta bölümünde başlayabilir.
- Görseller sade ama özenli olsun; çocuksu görünürken amatör bir tasarım hissi vermesin.
- Türk bayrakları kırmızı zemin, beyaz hilal ve beyaz beş köşeli yıldız ile anlaşılır biçimde çizilsin. Bayraklar toplanabilir nesne olarak gösterilsin.
- Engeller bayraklardan ilk bakışta ayırt edilsin. Engelleri gereksiz korkutucu veya saldırgan tasarlama.
- Yazılar büyük, yüksek kontrastlı ve uzaktan okunaklı olsun. Akıllı tahtada yaklaşık 2–4 metre mesafeden okunması hedeflensin.
- Hareketler akıcı olsun; gereksiz yanıp sönme ve rahatsız edici ekran efektleri kullanma.

## 4. Başlangıç ekranı

Oyun açılınca bir başlangıç ekranı göster. Şunlar bulunsun:

- Başlık: **GÖKYÜZÜ GÖREVİ**
- Alt başlık: **Türk Bayraklarını Topla!**
- Büyük ve dokunması kolay **OYUNA BAŞLA** düğmesi
- Kısa yönerge: “Bayrakları topla, engellerden kaç ve gökyüzü görevini tamamla!”
- Kontrol bilgisi: “Ok tuşlarıyla hareket et. Akıllı tahtada uçağı parmağınla sürükleyebilirsin.”
- **Ses Aç/Kapat** seçeneği
- **Tam Ekran** düğmesi

Başlangıç ekranı sade ve düzenli olsun. Öğrencinin ne yapacağını tek bakışta anlaması sağlansın.

## 5. Oynanış ve kontroller

- Uçak yukarı, aşağı, sağa ve sola hareket edebilsin.
- Klavye kontrolleri: yön tuşları ve alternatif olarak WASD.
- Dokunmatik akıllı tahtada oyuncu uçağa dokunup sürükleyebilsin. Sürükleme olmuyorsa ekranda dört büyük yön düğmesi de sun.
- Fare ile sürükleme de desteklensin.
- Uçak oyun alanının dışına çıkamasın.
- Uçak ileri doğru uçuyormuş hissi vermek için bulutlar, manzara ve nesneler aşağıya doğru hareket etsin.
- Bayraklar uçuş rotasının farklı noktalarında belirsin. Uçak bayrağa değince bayrak toplansın, puan artsın ve kısa, olumlu bir geri bildirim gösterilsin.
- Engeller uçağa değdiğinde bir can azalsın. Tek bir çarpışma için art arda birden fazla can kaybı yaşanmasın. Çarpışma sonrası uçak yaklaşık 1,5 saniye boyunca yeniden hasar almaya karşı korunsun.
- Canı sıfırlanan oyuncuya **Görev Bitti** ekranı gösterilsin. Oyuncu skorunu görebilsin ve **Tekrar Dene** düğmesiyle yeniden başlayabilsin.
- Oyun sırasında **Duraklat**, **Devam Et**, **Sesi Aç/Kapat** ve **Ana Menü** kontrolleri bulunsun.
- Sekme odağı kaybolduğunda oyun otomatik olarak duraklatılsın veya güvenli biçimde zaman adımını sıfırlasın; ekrana dönünce nesneler bir anda fırlamasın.

## 6. Puanlama, can ve seviyeler

- Başlangıçta oyuncunun **3 canı** olsun. Can göstergesi kalp simgeleriyle veya büyük ve açık bir göstergeyle sunulsun.
- Toplanan her Türk bayrağı **10 puan** kazandırsın.
- HUD üzerinde şu bilgiler sürekli görünür olsun:
  - Toplanan bayrak sayısı
  - Toplam puan
  - Kalan can
  - Seviye
- Üç seviye tasarla:
  - **Seviye 1 – İlk Uçuş:** yavaş nesne hareketleri ve az sayıda engel.
  - **Seviye 2 – Bulutların Arasında:** orta hız ve daha çeşitli engel dizilimleri.
  - **Seviye 3 – Usta Pilot:** biraz daha yüksek hız ve daha dikkatli hareket gerektiren ama adil engeller.
- Her 5 bayrak toplandığında bir sonraki seviyeye geçilsin. Geçişte kısa bir bildirim gösterilsin; oyun uzun süre kontrolsüz biçimde durmasın.
- Toplam **15 bayrak** toplanınca görev başarıyla tamamlansın.
- Kazanma ekranında “Görev Tamamlandı!”, toplanan bayrak sayısı ve toplam puan gösterilsin. **Yeniden Oyna** düğmesi bulunsun.
- Oyun zorluğu kademeli artsın. Engeller kaçınılmaz biçimde oyuncunun üzerine doğmasın; her zaman kaçış alanı bırak.
- Nesne üretiminde adil aralıklar kullan. Ekranda bir anda aşırı sayıda engel oluşturma.

## 7. Engeller ve toplanabilir nesneler

İlk sürümde şu nesneler yeterlidir:

**Toplanabilir:**
- Türk bayrağı: +10 puan ve bayrak sayacına +1.

**Engeller:**
- Koyu veya gri bulut kümeleri
- Uzak ve stilize kuş grupları
- Renkli sıcak hava balonları
- Dağ zirvelerini temsil eden engel şekilleri

Nesneler farklı yükseklik ve yatay konumlarda, rastgele ama adil aralıklarla gelsin. Bayrağın görünümü engellerle karışmasın. Her bayrak toplandığında kısa bir parıltı veya yumuşak bir ölçek animasyonu kullanılabilir.

## 8. Ses ve erişilebilirlik

- Ses isteğe bağlı olsun ve başlangıçta kapalı veya kullanıcı tarafından etkinleştirilebilir biçimde ayarlansın.
- Dış ses dosyaları kullanmak yerine gerekirse Web Audio API ile basit ve kısa sinyaller üret. Ses üretimi kullanıcı bir düğmeye bastıktan sonra etkinleşsin.
- Ses kapalıyken oyunun tüm özellikleri çalışmaya devam etsin.
- Renk tek başına anlam taşımasın; can, puan ve seviye metin/simgelerle de gösterilsin.
- Dokunmatik hedefler büyük olsun; küçük ve sıkışık düğmeler kullanma.
- Hareket hassasiyeti ve oyun hızı çocuklar için yönetilebilir olsun.
- Metinleri Türkçe karakterlerle doğru yaz: ç, ğ, ı, İ, ö, ş, ü.

## 9. Eğitimsel dokunuş

Oyun CodeWeek etkinliğinde kullanılabilecek şekilde yön bulma, el-göz koordinasyonu, örüntü fark etme ve karar verme becerilerini desteklesin. Başlangıç ekranında tek cümlelik bir öğrenme hedefi gösterilebilir: “Doğru yönü seç, rotanı planla ve engellerden kaç!”

Oyun öğrenci hakkında kişisel veri toplamasın; üyelik, giriş, reklam, sohbet veya çevrim içi skor tablosu ekleme.

## 10. Arayüz durumları

Aşağıdaki ekranların hepsi gerçekten çalışır durumda olsun:

1. Başlangıç ekranı
2. Aktif oyun ekranı
3. Duraklatma ekranı
4. Seviye geçiş bildirimi
5. Görev başarıyla tamamlandı ekranı
6. Canlar bitince görev sonu ekranı
7. Tekrar oynama akışı

Tüm düğmeler gerçek işlev yapsın; yalnızca görsel olarak yerleştirilmiş, tepkisiz kontroller bırakma.

## 11. Teknik kalite ve hata kontrolü

- Oyun döngüsünde `requestAnimationFrame` kullan.
- Hız ve hareketi kare hızına olabildiğince bağımsız hesapla; uzun sekme gecikmelerinde büyük sıçramaları engelle.
- Çarpışma algılamasını tutarlı yap. Gerekirse görsel boyutundan biraz küçük çarpışma alanları kullanarak oyunu adil kıl.
- Yeniden başlatıldığında eski zamanlayıcılar, nesneler, olay dinleyicileri ve oyun döngüleri birikmesin.
- Pencere yeniden boyutlanınca Canvas ve kontroller doğru güncellensin.
- Klavye kontrolleri çalışırken ok tuşlarının sayfayı kaydırmasını engelle.
- Oyun başlangıcı, duraklatma ve yeniden başlatma işlemlerinin her biri doğru oyun durumuna geçsin.
- Oyun bittiğinde skor ve bayrak sayıları doğru kalsın.
- Konsolda açık hata bırakmamak için kodu kontrol et.

## 12. Tamamlama ölçütleri

Projeyi tamamlamadan önce şu kontrol listesini uygula:

- [ ] Oyun başlangıç ekranından başlatılabiliyor.
- [ ] Uçak ok tuşları ve WASD ile hareket ediyor.
- [ ] Dokunmatik veya fareyle uçak sürüklenebiliyor.
- [ ] Bayrak toplamak puanı ve bayrak sayısını artırıyor.
- [ ] Engellere çarpmak bir can azaltıyor; tek çarpışmada can birden fazla kez azalmıyor.
- [ ] Can bitince görev sonu ekranı açılıyor.
- [ ] Beşer bayrakta seviye ilerlemesi gerçekleşiyor.
- [ ] On beş bayrakta kazanma ekranı açılıyor.
- [ ] Duraklatma, devam etme, ses ve tekrar oynama çalışıyor.
- [ ] Tam ekran düğmesi çalışıyor.
- [ ] Akıllı tahta boyutunda yazılar ve düğmeler okunaklı kalıyor.
- [ ] Haricî internet veya görsel dosyası olmadan çalışıyor.
- [ ] Tarayıcı konsolunda önemli hata görünmüyor.

## 13. Çalışma biçimin

Önce mevcut proje klasörünü incele. Var olan dosyalar varsa gereksiz yere silme veya alakasız dosyaları değiştirme. Ardından oyunu tamamlayacak dosyaları oluştur. Uygulamayı çalıştırıp başlangıç ekranını, hareketleri, bayrak toplama, çarpışma, seviye geçişi ve yeniden başlatmayı test et. Bir özellik çalışmıyorsa tamamlandı diye belirtmeden düzelt.

Son yanıtında kısa biçimde şunları yaz:
1. Oluşturduğun dosyalar.
2. Oyunu yerelde nasıl açacağım.
3. Akıllı tahtada kontrol yöntemleri.
4. Gerçekten test ettiğin özellikler ve varsa kalan sınırlamalar.

**Şimdi oyunu oluştur ve çalışır hâle getir.**
