# ✈️ Gökyüzü Görevi: Türk Bayraklarını Topla 🇹🇷

[![Canlı Oyna](https://img.shields.io/badge/🎮_Canlı_Oyna-GitHub_Pages-brightgreen?style=for-the-badge)](https://mucahitbozok.github.io/gokyuzu-gorevi/)

İlkokul öğrencileri ve eğitimciler için özel olarak geliştirilmiş, okul akıllı tahtalarında (ETAP, Vestel, Arçelik, Promethean vb.) ve masaüstü tarayıcılarda sorunsuz çalışan **2D Arcade Uçuş Oyunu**.

🌐 **Canlı Oyun Linki:** [https://mucahitbozok.github.io/gokyuzu-gorevi/](https://mucahitbozok.github.io/gokyuzu-gorevi/)

Bu proje, öğrencilerin yön bulma, el-göz koordinasyonu, örüntü fark etme ve karar verme reflekslerini eğlenceli ve güvenli bir ortamda geliştirmeyi amaçlar (CodeWeek etkinlikleri ve bilişim dersleri için uygundur).

---

## 🎮 Oyunun Konusu ve Hedefleri

* **Öğrenme Hedefi:** *"Doğru yönü seç, rotanı planla ve engellerden kaç!"*
* **Görevin:** Gökyüzünde süzülen **15 Türk bayrağını** topla ve toplam 3 seviyeyi başarıyla tamamlayarak görevi bitir!
* **Puanlama:** Toplanan her Türk bayrağı **+10 puan** kazandırır.
* **Can Sistemi:** 3 can ile başlarsın. Engellere çarptığında 1 can kaybedersin ve 1,5 saniye boyunca koruyucu altın kalkan kazanırsın.

---

## 🌈 Seviyeler

1. **Seviye 1 – İlk Uçuş:** Başlangıç hızı, sakin gökyüzü ve temel engeller (Fırtına bulutları, sıcak hava balonları).
2. **Seviye 2 – Bulutların Arasında:** Orta hız, artan bayrak temposu ve uçan kuş sürüleri.
3. **Seviye 3 – Usta Pilot:** Yüksek refleks temposu, dinamik koridorlar ve karlı dağ zirveleri.

---

## 🕹️ Kontroller

Oyun, akıllı tahtalarda tek dokunuşla ve masaüstü bilgisayarlarda tam uyumlu çalışacak şekilde tasarlanmıştır:

| Kontrol Yolu | Kullanım |
| :--- | :--- |
| **👆 Akıllı Tahta Dokunmatik** | Uçağa doğrudan parmağınla dokunup ekran üzerinde serbestçe sürükle. |
| **🎯 Ekran D-PAD Tuşları** | Ekranın sağ altındaki büyük yön oklarına dokunarak uçağı yönlendir. |
| **⌨️ Klavye Yön Tuşları** | `▲`, `▼`, `◀`, `▶` ok tuşları. |
| **⌨️ Alternatif Klavye** | `W`, `A`, `S`, `D` tuşları. |
| **⏸️ Duraklat / Devam Et** | Ekrandaki duraklat butonu, `Space` (Boşluk) veya `P` tuşu. |
| **⛶ Tam Ekran** | Ekrandaki "Tam Ekran" butonu ile akıllı tahta ekranını tam kapla. |
| **🔊 Ses Kontrolü** | Web Audio API destekli neşeli sesleri açıp kapatma düğmesi. |

---

## 🛠️ Teknik Özellikler

* **Saf Web Teknolojileri:** Yalnızca HTML5 Canvas, CSS3 ve saf JavaScript (Vanilla JS).
* **Sıfır Dış Bağımlılık:** Harici görsel, font, kütüphane veya internet bağlantısı gerektirmez; tamamen yerel ve çevrimdışı (offline) çalışır.
* **Canvas Tabanlı Çizimler:** Uçak, Türk bayrağı (hilal & yıldız matematiğiyle), bulutlar, balonlar, kuşlar ve dağ zirveleri doğrudan Canvas üzerinde dinamik çizilir.
* **Sentetik Sesler:** Web Audio API ile harici MP3/WAV dosyası olmadan gerçek zamanlı ses sentezleme.
* **16:9 Ekran Duyarlılığı:** Akıllı tahta çözünürlüklerine (Full HD, 4K) otomatik ölçeklenen, kaydırma çubuksuz düzen.

---

## 🚀 Yerelde Çalıştırma

Projeyi bilgisayarınıza klonlayın veya indirin:

```bash
git clone https://github.com/mucahitbozok/gokyuzu-gorevi.git
```

Klasör içindeki `index.html` dosyasına çift tıklayarak herhangi bir modern tarayıcıda doğrudan oynayabilirsiniz.

---

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiş olup MIT lisansı kapsamında özgürce kullanılabilir ve paylaşılabilir.
