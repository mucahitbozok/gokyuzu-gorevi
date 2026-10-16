/**
 * ============================================================================
 * GÖKYÜZÜ GÖREVİ: TÜRK BAYRAKLARINI TOPLA
 * Okul Akıllı Tahtaları ve Masaüstü Tarayıcılar İçin 2D Arcade Uçuş Oyunu
 * ============================================================================
 */

'use strict';

// -----------------------------------------------------------------------------
// 1. SES YÖNETİCİSİ (Web Audio API - Harici Dosya Gerektirmez)
// -----------------------------------------------------------------------------
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API başlatılamadı:', e);
    }
  }

  resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Bayrak toplama sesi: Neşeli, parlak melodi
  playFlagCollect() {
    if (!this.enabled || !this.ctx) return;
    this.resumeContext();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.05);

      gain.gain.setValueAtTime(0.18, now + index * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + index * 0.05);
      osc.stop(now + index * 0.05 + 0.22);
    });
  }

  // Engele çarpma sesi: Yumuşak, çocuk dostu bas sekme sesi
  playHit() {
    if (!this.enabled || !this.ctx) return;
    this.resumeContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Seviye atlama sesi: Coşkulu akor
  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    this.resumeContext();
    const now = this.ctx.currentTime;
    const chord = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.15, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.45);
    });
  }

  // Görevi tamamlama (Kazanma) sesi: Zafer marşı melodisi
  playWin() {
    if (!this.enabled || !this.ctx) return;
    this.resumeContext();
    const now = this.ctx.currentTime;
    const melody = [
      { f: 523.25, t: 0.0,  d: 0.15 }, // C5
      { f: 523.25, t: 0.16, d: 0.15 }, // C5
      { f: 523.25, t: 0.32, d: 0.15 }, // C5
      { f: 659.25, t: 0.48, d: 0.25 }, // E5
      { f: 783.99, t: 0.75, d: 0.3  }, // G5
      { f: 1046.5, t: 1.1,  d: 0.6  }  // C6
    ];

    melody.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0.2, now + item.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + item.t);
      osc.stop(now + item.t + item.d + 0.05);
    });
  }

  // Oyun sonu sesi: Şefkatli, motive edici iniş melodisi
  playGameOver() {
    if (!this.enabled || !this.ctx) return;
    this.resumeContext();
    const now = this.ctx.currentTime;
    const notes = [440, 392, 349.23, 293.66]; // A4, G4, F4, D4
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);

      gain.gain.setValueAtTime(0.18, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.4);
    });
  }

  // Düğme tıklama sesi
  playClick() {
    if (!this.enabled || !this.ctx) return;
    this.resumeContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }
}

// -----------------------------------------------------------------------------
// 2. PARÇACIK VE GÖRSEL GERİ BİLDİRİM SİSTEMİ
// -----------------------------------------------------------------------------
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
  }

  reset() {
    this.particles = [];
    this.floatingTexts = [];
  }

  // Bayrak toplandığında yıldız ve ışıltı patlaması
  spawnFlagSparkles(x, y) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 180;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 6,
        color: Math.random() > 0.4 ? '#ffc107' : (Math.random() > 0.5 ? '#ffffff' : '#e30a17'),
        life: 0.6 + Math.random() * 0.4,
        maxLife: 1.0,
        shape: Math.random() > 0.5 ? 'star' : 'circle'
      });
    }

    // Yüzen +10 Puan Metni
    this.floatingTexts.push({
      x: x,
      y: y - 10,
      text: '+10 Puan! 🇹🇷',
      color: '#ffc107',
      life: 1.0,
      vy: -60
    });
  }

  // Çarpışma olduğunda yumuşak bulut pufu
  spawnHitPuff(x, y) {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 100;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 8 + Math.random() * 12,
        color: 'rgba(255, 255, 255, 0.75)',
        life: 0.4 + Math.random() * 0.3,
        maxLife: 0.7,
        shape: 'cloud'
      });
    }

    this.floatingTexts.push({
      x: x,
      y: y - 10,
      text: '-1 Can!',
      color: '#ef4444',
      life: 0.9,
      vy: -50
    });
  }

  // Uçak arkasındaki tatlı beyaz rüzgar izleri
  spawnEngineSmoke(x, y) {
    this.particles.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y,
      vx: (Math.random() - 0.5) * 15,
      vy: 120 + Math.random() * 40,
      size: 4 + Math.random() * 4,
      color: 'rgba(255, 255, 255, 0.45)',
      life: 0.35,
      maxLife: 0.35,
      shape: 'circle'
    });
  }

  update(dt) {
    // Parçacıkları güncelle
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.size = Math.max(0.5, p.size * (1 - dt * 0.5));
    }

    // Yüzen yazıları güncelle
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life -= dt;
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
        continue;
      }
      ft.y += ft.vy * dt;
    }
  }

  draw(ctx) {
    // Parçacıkları çiz
    for (let p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'star') {
        drawStarShape(ctx, p.x, p.y, 5, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Yüzen yazıları çiz (Akıllı tahta için kalın ve gölgeli)
    for (let ft of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, ft.life * 1.5);
      ctx.font = 'bold 24px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#000000';
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }
}

// -----------------------------------------------------------------------------
// 3. ÇİZİM YARDIMCILARI (Türk Bayrağı, Uçak, Engeller)
// -----------------------------------------------------------------------------

/**
 * 5 Köşeli Yıldız Çizer
 */
function drawStarShape(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

/**
 * Türk Bayrağı Çizici (Kanvas üzerinde orantılı Hilal ve Yıldız)
 */
function drawTurkishFlag(ctx, x, y, width, height, waveAngle = 0) {
  ctx.save();
  ctx.translate(x, y);

  // Hafif dalgalanma efekti
  if (waveAngle !== 0) {
    ctx.rotate(Math.sin(waveAngle) * 0.08);
  }

  // 1. Dış Çerçeve ve Bayrak Kırmızısı (#e30a17)
  ctx.fillStyle = '#e30a17';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;

  const radius = 6;
  ctx.beginPath();
  ctx.roundRect(-width / 2, -height / 2, width, height, radius);
  ctx.fill();

  // Bayrak beyaz kenarlık (net seçilebilirlik için)
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 2. Hilal Çizimi
  // Hilal dış dairesi (Beyaz)
  const cOuterR = height * 0.27;
  const cInnerR = height * 0.21;
  const cOuterX = -width * 0.08;
  const cInnerX = cOuterX + height * 0.065;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cOuterX, 0, cOuterR, 0, Math.PI * 2);
  ctx.fill();

  // Hilal iç dairesi (Bayrak kırmızısı ile oyulur)
  ctx.fillStyle = '#e30a17';
  ctx.beginPath();
  ctx.arc(cInnerX, 0, cInnerR, 0, Math.PI * 2);
  ctx.fill();

  // 3. Beş Köşeli Yıldız Çizimi
  const starX = width * 0.16;
  const starOuterR = height * 0.15;
  const starInnerR = starOuterR * 0.42;

  ctx.save();
  ctx.translate(starX, 0);
  ctx.rotate(-Math.PI / 10); // Hilale bakan doğru Türk bayrağı açısı
  ctx.fillStyle = '#ffffff';
  drawStarShape(ctx, 0, 0, 5, starOuterR, starInnerR);
  ctx.restore();

  // 4. Parlaklık Işıltısı (Göz alıcı çocuk dostu efekt)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.beginPath();
  ctx.ellipse(-width * 0.2, -height * 0.2, width * 0.25, height * 0.15, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Sevimli Çizgi Film Uçağı Çizici (Üstten / Yarı-perspektif)
 */
function drawCartoonAirplane(ctx, x, y, width, height, tilt = 0, isInvulnerable = false, time = 0) {
  ctx.save();
  ctx.translate(x, y);

  // Sağa/sola yatma açısı
  ctx.rotate(tilt);

  // Hasar sonrası dokunulmazlık yanıp sönmesi
  if (isInvulnerable) {
    const blink = Math.sin(time * 25) > 0;
    if (!blink) {
      ctx.globalAlpha = 0.4;
    }

    // Koruyucu altın kalkan çemberi
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, width * 0.75, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 215, 0, 0.12)';
    ctx.fill();
    ctx.restore();
  }

  // Uçak Alt Gölgesi
  ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
  ctx.beginPath();
  ctx.ellipse(0, height * 0.35, width * 0.45, height * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // 1. Ana Kanatlar (Beyaz & Kırmızı detaylı)
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(-width * 0.52, height * 0.05);
  ctx.quadraticCurveTo(-width * 0.4, -height * 0.15, 0, -height * 0.05);
  ctx.quadraticCurveTo(width * 0.4, -height * 0.15, width * 0.52, height * 0.05);
  ctx.lineTo(width * 0.48, height * 0.22);
  ctx.quadraticCurveTo(0, height * 0.12, -width * 0.48, height * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Kanat Uçlarındaki Kırmızı Şeritler
  ctx.fillStyle = '#e30a17';
  ctx.beginPath();
  ctx.rect(-width * 0.52, height * 0.05, width * 0.1, height * 0.15);
  ctx.rect(width * 0.42, height * 0.05, width * 0.1, height * 0.15);
  ctx.fill();

  // 2. Arka Yatay Kuyruk Kanatları
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, height * 0.38, width * 0.28, height * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 3. Gövde (Fuselage) - Kırmızı & Beyaz Aerodinamik Şekil
  const bodyGrad = ctx.createLinearGradient(-width * 0.2, 0, width * 0.2, 0);
  bodyGrad.addColorStop(0, '#e30a17');
  bodyGrad.addColorStop(0.4, '#ff3b47');
  bodyGrad.addColorStop(0.7, '#e30a17');
  bodyGrad.addColorStop(1, '#a3000b');

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(0, -height * 0.45); // Burun ucu
  ctx.bezierCurveTo(width * 0.24, -height * 0.3, width * 0.22, height * 0.25, 0, height * 0.45); // Sağ taraf
  ctx.bezierCurveTo(-width * 0.22, height * 0.25, -width * 0.24, -height * 0.3, 0, -height * 0.45); // Sol taraf
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Gövde Beyaz Yarış Şeridi
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-width * 0.04, -height * 0.35);
  ctx.lineTo(width * 0.04, -height * 0.35);
  ctx.lineTo(width * 0.04, height * 0.35);
  ctx.lineTo(-width * 0.04, height * 0.35);
  ctx.closePath();
  ctx.fill();

  // 4. Kokpit Camı (Parlama efektli cam göbeği)
  const canopyGrad = ctx.createLinearGradient(0, -height * 0.28, 0, -height * 0.05);
  canopyGrad.addColorStop(0, '#e0f2fe');
  canopyGrad.addColorStop(0.6, '#38bdf8');
  canopyGrad.addColorStop(1, '#0284c7');

  ctx.fillStyle = canopyGrad;
  ctx.beginPath();
  ctx.ellipse(0, -height * 0.16, width * 0.11, height * 0.16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Cam Yansıması
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.ellipse(-width * 0.04, -height * 0.2, width * 0.035, height * 0.08, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // 5. Arka Dikey Kuyruk (Fin)
  ctx.fillStyle = '#e30a17';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.18);
  ctx.lineTo(width * 0.05, height * 0.42);
  ctx.lineTo(-width * 0.05, height * 0.42);
  ctx.closePath();
  ctx.fill();

  // 6. Dönen Pervane Efekti
  ctx.save();
  ctx.translate(0, -height * 0.46);
  // Pervane ucu başlığı (Spinner)
  ctx.fillStyle = '#ffc107';
  ctx.beginPath();
  ctx.arc(0, 0, width * 0.07, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.stroke();

  // Dönen kanat disk illüzyonu
  const propAngle = (time * 40) % (Math.PI * 2);
  ctx.rotate(propAngle);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.beginPath();
  ctx.ellipse(0, 0, width * 0.32, height * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

/**
 * 4 Farklı Engel Türü Çizici:
 * 1. Fırtına Bulutu (Storm Cloud)
 * 2. Sıcak Hava Balonu (Hot Air Balloon)
 * 3. Kuş Sürüsü (Flock of Birds)
 * 4. Dağ Zirvesi (Mountain Peak)
 */
function drawObstacle(ctx, obs, time) {
  ctx.save();
  ctx.translate(obs.x, obs.y);

  switch (obs.type) {
    case 'cloud': {
      // Koyu Fırtına Bulutu
      ctx.fillStyle = '#475569';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;

      // Bulut kabarcıkları
      ctx.beginPath();
      ctx.arc(0, 0, obs.width * 0.34, 0, Math.PI * 2);
      ctx.arc(-obs.width * 0.28, obs.height * 0.08, obs.width * 0.24, 0, Math.PI * 2);
      ctx.arc(obs.width * 0.28, obs.height * 0.08, obs.width * 0.24, 0, Math.PI * 2);
      ctx.arc(-obs.width * 0.14, -obs.height * 0.18, obs.width * 0.22, 0, Math.PI * 2);
      ctx.arc(obs.width * 0.14, -obs.height * 0.18, obs.width * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Bulut içi hafif koyu gölge
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(0, obs.height * 0.12, obs.width * 0.3, 0, Math.PI);
      ctx.fill();

      // Küçük sevimli şimşek kıvılcımı
      const flash = Math.sin(time * 12 + obs.id) > 0.7;
      if (flash) {
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.moveTo(-5, obs.height * 0.25);
        ctx.lineTo(8, obs.height * 0.36);
        ctx.lineTo(0, obs.height * 0.38);
        ctx.lineTo(6, obs.height * 0.52);
        ctx.lineTo(-6, obs.height * 0.38);
        ctx.lineTo(1, obs.height * 0.36);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }

    case 'balloon': {
      // Renkli Sıcak Hava Balonu (Kırmızı / Sarı şeritli)
      const bW = obs.width * 0.45;
      const bH = obs.height * 0.55;

      // Balon Gövdesi
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(0, -bH * 0.7);
      ctx.bezierCurveTo(bW, -bH * 0.7, bW, bH * 0.1, 0, bH * 0.5);
      ctx.bezierCurveTo(-bW, bH * 0.1, -bW, -bH * 0.7, 0, -bH * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#9a3412';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Balon Sarı ve Beyaz Şeritleri
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(0, -bH * 0.7);
      ctx.quadraticCurveTo(bW * 0.45, -bH * 0.1, 0, bH * 0.5);
      ctx.quadraticCurveTo(-bW * 0.45, -bH * 0.1, 0, -bH * 0.7);
      ctx.closePath();
      ctx.fill();

      // Sepet İpleri
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-bW * 0.2, bH * 0.48);
      ctx.lineTo(-bW * 0.15, bH * 0.75);
      ctx.moveTo(bW * 0.2, bH * 0.48);
      ctx.lineTo(bW * 0.15, bH * 0.75);
      ctx.stroke();

      // Sepet (Wicker Basket)
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-bW * 0.18, bH * 0.72, bW * 0.36, bH * 0.22);
      ctx.strokeRect(-bW * 0.18, bH * 0.72, bW * 0.36, bH * 0.22);
      break;
    }

    case 'birds': {
      // Stilize Kuş Grubu (V şeklinde 3 kuş, kanat çırpan)
      const flap = Math.sin(time * 10 + obs.id) * 12;

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';

      // 1. Öncü Kuş (Merkezde)
      ctx.beginPath();
      ctx.moveTo(-16, -10 + flap);
      ctx.quadraticCurveTo(-8, -18, 0, -10);
      ctx.quadraticCurveTo(8, -18, 16, -10 + flap);
      ctx.stroke();

      // 2. Sol Kuş
      ctx.beginPath();
      ctx.moveTo(-38, 12 - flap);
      ctx.quadraticCurveTo(-30, 4, -22, 12);
      ctx.quadraticCurveTo(-14, 4, -6, 12 - flap);
      ctx.stroke();

      // 3. Sağ Kuş
      ctx.beginPath();
      ctx.moveTo(6, 12 - flap);
      ctx.quadraticCurveTo(14, 4, 22, 12);
      ctx.quadraticCurveTo(30, 4, 38, 12 - flap);
      ctx.stroke();
      break;
    }

    case 'mountain': {
      // Dağ Zirvesi (Alt kenardan yükselen sivri tepe)
      const mW = obs.width * 0.55;
      const mH = obs.height * 0.65;

      // Dağ Gövdesi (Kaya rengi)
      ctx.fillStyle = '#475569';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(0, -mH);
      ctx.lineTo(mW, mH);
      ctx.lineTo(-mW, mH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Karlı Zirve (Beyaz şapka)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(0, -mH);
      ctx.lineTo(mW * 0.35, -mH + mH * 0.45);
      ctx.lineTo(mW * 0.15, -mH + mH * 0.35);
      ctx.lineTo(0, -mH + mH * 0.48);
      ctx.lineTo(-mW * 0.15, -mH + mH * 0.38);
      ctx.lineTo(-mW * 0.35, -mH + mH * 0.45);
      ctx.closePath();
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

// -----------------------------------------------------------------------------
// 4. ARKA PLAN MANZARA VE DEKORATİF BULUTLAR SİSTEMİ
// -----------------------------------------------------------------------------
class BackgroundScenery {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.clouds = [];
    this.initClouds();
  }

  initClouds() {
    // 10 adet dekoratif beyaz bulut oluştur
    for (let i = 0; i < 10; i++) {
      this.clouds.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        scale: 0.6 + Math.random() * 0.8,
        speed: 35 + Math.random() * 45,
        opacity: 0.45 + Math.random() * 0.35
      });
    }
  }

  update(dt, baseSpeed) {
    for (let c of this.clouds) {
      c.y += (c.speed + baseSpeed * 0.25) * dt;
      if (c.y > this.height + 80) {
        c.y = -80;
        c.x = Math.random() * this.width;
      }
    }
  }

  draw(ctx) {
    // 1. Gökyüzü Yumuşak Gradyanı
    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    skyGrad.addColorStop(0, '#38bdf8');   // Canlı Açık Mavi
    skyGrad.addColorStop(0.55, '#7dd3fc');
    skyGrad.addColorStop(1, '#bae6fd');   // Ufuk Işıltısı
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Dekoratif Pamuk Bulutlar
    for (let c of this.clouds) {
      ctx.save();
      ctx.globalAlpha = c.opacity;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      const r = 40 * c.scale;
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.arc(c.x - r * 0.7, c.y + r * 0.2, r * 0.75, 0, Math.PI * 2);
      ctx.arc(c.x + r * 0.7, c.y + r * 0.2, r * 0.75, 0, Math.PI * 2);
      ctx.arc(c.x - r * 0.35, c.y - r * 0.35, r * 0.65, 0, Math.PI * 2);
      ctx.arc(c.x + r * 0.35, c.y - r * 0.35, r * 0.65, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. Ufuktaki Yeşil Tepeler (Hafif ve huzur verici derinlik)
    ctx.save();
    ctx.fillStyle = 'rgba(34, 197, 94, 0.25)'; // Uzak yeşil tepe
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.quadraticCurveTo(this.width * 0.25, this.height - 35, this.width * 0.5, this.height);
    ctx.quadraticCurveTo(this.width * 0.75, this.height - 45, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }
}

// -----------------------------------------------------------------------------
// 5. ANA OYUN MOTORU (GameEngine)
// -----------------------------------------------------------------------------
class SkyMissionGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Mantıksal çözünürlük 16:9 standart (1280x720)
    this.logicWidth = 1280;
    this.logicHeight = 720;
    this.canvas.width = this.logicWidth;
    this.canvas.height = this.logicHeight;

    // Alt Sistemler
    this.sound = new SoundManager();
    this.particles = new ParticleSystem();
    this.scenery = new BackgroundScenery(this.logicWidth, this.logicHeight);

    // Oyun Durumları: 'START', 'PLAYING', 'PAUSED', 'WIN', 'GAMEOVER'
    this.state = 'START';

    // Oyun İstatistikleri
    this.score = 0;
    this.flagsCollected = 0;
    this.flagsTarget = 15;
    this.lives = 3;
    this.maxLives = 3;
    this.level = 1;

    // Zaman ve Döngü
    this.lastTime = 0;
    this.gameTime = 0;
    this.screenShakeTime = 0;

    // Uçak (Oyuncu)
    this.plane = {
      x: this.logicWidth / 2,
      y: this.logicHeight * 0.78,
      width: 76,
      height: 76,
      vx: 0,
      vy: 0,
      speed: 430, // px / sn
      tilt: 0,
      invulnerableTimer: 0,
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0
    };

    // Nesne Listeleri
    this.collectibles = [];
    this.obstacles = [];

    // Nesne Üretim Zamanlayıcıları
    this.spawnTimerFlag = 0;
    this.spawnTimerObstacle = 0;
    this.nextObstacleId = 1;

    // Seviye Konfigürasyonu
    this.levelConfig = {
      1: {
        name: 'Seviye 1: İlk Uçuş',
        scrollSpeed: 190,
        flagInterval: 2.2,
        obstacleInterval: 3.2,
        types: ['cloud', 'balloon']
      },
      2: {
        name: 'Seviye 2: Bulutların Arasında',
        scrollSpeed: 240,
        flagInterval: 2.0,
        obstacleInterval: 2.4,
        types: ['cloud', 'balloon', 'birds']
      },
      3: {
        name: 'Seviye 3: Usta Pilot',
        scrollSpeed: 290,
        flagInterval: 1.8,
        obstacleInterval: 1.8,
        types: ['cloud', 'balloon', 'birds', 'mountain']
      }
    };

    // Kontrol Tuş Durumları
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    // DOM Elemanları Önbelleği
    this.dom = {
      container: document.getElementById('game-container'),
      hud: document.getElementById('game-hud'),
      hudScore: document.getElementById('hud-score'),
      hudFlags: document.getElementById('hud-flags'),
      hudLives: document.getElementById('hud-lives'),
      hudLevel: document.getElementById('hud-level'),
      touchControls: document.getElementById('touch-controls'),
      levelBanner: document.getElementById('level-banner'),
      bannerTitle: document.getElementById('banner-title'),
      bannerSubtitle: document.getElementById('banner-subtitle'),
      // Ekranlar
      screenStart: document.getElementById('screen-start'),
      screenPause: document.getElementById('screen-pause'),
      screenWin: document.getElementById('screen-win'),
      screenGameOver: document.getElementById('screen-gameover'),
      // İstatistikler
      winFlags: document.getElementById('win-flags'),
      winScore: document.getElementById('win-score'),
      winLives: document.getElementById('win-lives'),
      gameoverFlags: document.getElementById('gameover-flags'),
      gameoverScore: document.getElementById('gameover-score'),
      gameoverLevel: document.getElementById('gameover-level')
    };

    this.initEvents();
    this.updateHUD();
    this.showScreen('START');

    // Oyun Döngüsünü Başlat
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  // ---------------------------------------------------------------------------
  // 5.1 Olay Dinleyicileri (Klavye, Fare, Dokunmatik, Düğmeler)
  // ---------------------------------------------------------------------------
  initEvents() {
    // 1. Klavye Tuşları (Ok tuşları ve WASD)
    window.addEventListener('keydown', (e) => {
      // Ok tuşları, Space ve WASD'ın sayfayı kaydırmasını engelle
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'ArrowUp' || e.code === 'KeyW') this.keys.up = true;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') this.keys.down = true;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = true;

      // Duraklatma kısayolu (P tuşu veya Space)
      if (e.code === 'KeyP' || (e.code === 'Space' && this.state !== 'START')) {
        this.togglePause();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'KeyW') this.keys.up = false;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') this.keys.down = false;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = false;
    });

    // 2. Fare ve Dokunmatik Sürükleme (Pointer Events)
    const getCanvasCoords = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.logicWidth / rect.width;
      const scaleY = this.logicHeight / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    this.canvas.addEventListener('pointerdown', (e) => {
      if (this.state !== 'PLAYING') return;
      this.sound.init();
      const pos = getCanvasCoords(e);

      // Uçağa yakın dokunulduysa veya ekranda serbest sürükleme
      const dist = Math.hypot(pos.x - this.plane.x, pos.y - this.plane.y);
      if (dist < 140) {
        this.plane.isDragging = true;
        this.plane.dragOffsetX = this.plane.x - pos.x;
        this.plane.dragOffsetY = this.plane.y - pos.y;
      } else {
        // Uçağı dokunulan noktaya doğru yumuşak yönlendir
        this.plane.isDragging = true;
        this.plane.dragOffsetX = 0;
        this.plane.dragOffsetY = 0;
        this.plane.targetX = pos.x;
        this.plane.targetY = pos.y;
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.plane.isDragging || this.state !== 'PLAYING') return;
      const pos = getCanvasCoords(e);
      const targetX = pos.x + this.plane.dragOffsetX;
      const targetY = pos.y + this.plane.dragOffsetY;

      // Yumuşak takip ve yatma açısı hesapla
      const dx = targetX - this.plane.x;
      this.plane.x += dx * 0.35;
      this.plane.y += (targetY - this.plane.y) * 0.35;
      this.plane.tilt = Math.max(-0.35, Math.min(0.35, dx * 0.03));
      this.clampPlane();
    });

    const endDrag = () => {
      this.plane.isDragging = false;
    };
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    // 3. Akıllı Tahta Ekran D-PAD Düğmeleri
    const setupDpadButton = (id, direction) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      const activate = (e) => {
        e.preventDefault();
        this.sound.init();
        this.keys[direction] = true;
        btn.classList.add('pressed');
      };
      const deactivate = (e) => {
        e.preventDefault();
        this.keys[direction] = false;
        btn.classList.remove('pressed');
      };

      btn.addEventListener('pointerdown', activate);
      btn.addEventListener('pointerup', deactivate);
      btn.addEventListener('pointercancel', deactivate);
      btn.addEventListener('pointerleave', deactivate);
    };

    setupDpadButton('btn-dpad-up', 'up');
    setupDpadButton('btn-dpad-down', 'down');
    setupDpadButton('btn-dpad-left', 'left');
    setupDpadButton('btn-dpad-right', 'right');

    // 4. Arayüz Düğmeleri (UI Buttons)
    // Oyuna Başla Düğmesi
    document.getElementById('btn-start-game').addEventListener('click', () => {
      this.sound.init();
      this.sound.playClick();
      this.startGame();
    });

    // Duraklat Düğmesi (HUD)
    document.getElementById('btn-pause-game').addEventListener('click', () => {
      this.sound.playClick();
      this.togglePause();
    });

    // Devam Et Düğmesi (Pause Ekranı)
    document.getElementById('btn-resume-game').addEventListener('click', () => {
      this.sound.playClick();
      this.togglePause();
    });

    // Duraklatmadan Yeniden Başlat
    document.getElementById('btn-restart-from-pause').addEventListener('click', () => {
      this.sound.playClick();
      this.startGame();
    });

    // Duraklatmadan Ana Menüye Dön
    document.getElementById('btn-menu-from-pause').addEventListener('click', () => {
      this.sound.playClick();
      this.showScreen('START');
    });

    // Kazanma Ekranından Yeniden Oyna
    document.getElementById('btn-replay-win').addEventListener('click', () => {
      this.sound.playClick();
      this.startGame();
    });

    // Kazanma Ekranından Ana Menüye Dön
    document.getElementById('btn-menu-win').addEventListener('click', () => {
      this.sound.playClick();
      this.showScreen('START');
    });

    // Canlar Bitti Ekranından Tekrar Dene
    document.getElementById('btn-restart-gameover').addEventListener('click', () => {
      this.sound.playClick();
      this.startGame();
    });

    // Canlar Bitti Ekranından Ana Menüye Dön
    document.getElementById('btn-menu-gameover').addEventListener('click', () => {
      this.sound.playClick();
      this.showScreen('START');
    });

    // Ses Aç/Kapat Düğmeleri (Hem başlangıçta hem HUD'da)
    const soundButtons = document.querySelectorAll('.btn-sound-toggle');
    soundButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.sound.init();
        const isOn = this.sound.toggleSound();
        this.updateSoundIcons(isOn);
        if (isOn) this.sound.playClick();
      });
    });

    // Tam Ekran Düğmeleri
    const fsButtons = document.querySelectorAll('.btn-fullscreen-toggle');
    fsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.toggleFullscreen();
      });
    });

    // Sekme Görünürlüğü Değişimi (Otomatik duraklatma ve zaman adımını koruma)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'PLAYING') {
        this.state = 'PAUSED';
        this.showScreen('PAUSED');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 5.2 Oyun Durumları ve Ekran Geçişleri
  // ---------------------------------------------------------------------------
  showScreen(screenState) {
    this.state = screenState;

    // Tüm ekran kaplamalarını gizle
    this.dom.screenStart.classList.add('hidden');
    this.dom.screenStart.classList.remove('active');
    this.dom.screenPause.classList.add('hidden');
    this.dom.screenPause.classList.remove('active');
    this.dom.screenWin.classList.add('hidden');
    this.dom.screenWin.classList.remove('active');
    this.dom.screenGameOver.classList.add('hidden');
    this.dom.screenGameOver.classList.remove('active');

    // HUD ve Dokunmatik Kontrolleri Duruma Göre Ayarla
    if (screenState === 'PLAYING') {
      this.dom.hud.classList.remove('hidden');
      this.dom.touchControls.classList.remove('hidden');
    } else if (screenState === 'START') {
      this.dom.hud.classList.add('hidden');
      this.dom.touchControls.classList.add('hidden');
      this.dom.screenStart.classList.remove('hidden');
      this.dom.screenStart.classList.add('active');
    } else if (screenState === 'PAUSED') {
      this.dom.hud.classList.remove('hidden');
      this.dom.screenPause.classList.remove('hidden');
      this.dom.screenPause.classList.add('active');
    } else if (screenState === 'WIN') {
      this.dom.hud.classList.add('hidden');
      this.dom.touchControls.classList.add('hidden');
      this.dom.winFlags.textContent = `${this.flagsCollected} / ${this.flagsTarget} 🇹🇷`;
      this.dom.winScore.textContent = `${this.score} ⭐`;
      this.dom.winLives.textContent = '❤️'.repeat(this.lives);
      this.dom.screenWin.classList.remove('hidden');
      this.dom.screenWin.classList.add('active');
    } else if (screenState === 'GAMEOVER') {
      this.dom.hud.classList.add('hidden');
      this.dom.touchControls.classList.add('hidden');
      this.dom.gameoverFlags.textContent = `${this.flagsCollected} / ${this.flagsTarget} 🇹🇷`;
      this.dom.gameoverScore.textContent = `${this.score} ⭐`;
      this.dom.gameoverLevel.textContent = this.levelConfig[this.level].name;
      this.dom.screenGameOver.classList.remove('hidden');
      this.dom.screenGameOver.classList.add('active');
    }
  }

  startGame() {
    this.score = 0;
    this.flagsCollected = 0;
    this.lives = this.maxLives;
    this.level = 1;

    this.collectibles = [];
    this.obstacles = [];
    this.particles.reset();

    // Uçağı alt merkeze yerleştir
    this.plane.x = this.logicWidth / 2;
    this.plane.y = this.logicHeight * 0.78;
    this.plane.vx = 0;
    this.plane.vy = 0;
    this.plane.tilt = 0;
    this.plane.invulnerableTimer = 0;
    this.plane.isDragging = false;

    this.spawnTimerFlag = 1.0; // 1 saniye sonra ilk bayrak gelsin
    this.spawnTimerObstacle = 2.2; // 2.2 saniye sonra ilk engel gelsin

    this.updateHUD();
    this.showScreen('PLAYING');
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.showScreen('PAUSED');
    } else if (this.state === 'PAUSED') {
      this.showScreen('PLAYING');
    }
  }

  triggerLevelTransition(newLevel) {
    this.level = newLevel;
    this.sound.playLevelUp();
    this.updateHUD();

    // Seviye bildirim bannerını göster
    this.dom.bannerTitle.textContent = '🌟 TEBRİKLER! 🌟';
    this.dom.bannerSubtitle.textContent = this.levelConfig[this.level].name;
    this.dom.levelBanner.classList.remove('hidden');

    // Animasyonu yeniden tetiklemek için reflow
    void this.dom.levelBanner.offsetWidth;

    setTimeout(() => {
      this.dom.levelBanner.classList.add('hidden');
    }, 2500);
  }

  updateHUD() {
    this.dom.hudScore.textContent = this.score;
    this.dom.hudFlags.textContent = `${this.flagsCollected} / ${this.flagsTarget}`;
    this.dom.hudLevel.textContent = this.levelConfig[this.level].name;

    // Can simgeleri (Kalanlar kırmızı kalp, kaybedilenler gri kalp)
    let heartsHtml = '';
    for (let i = 0; i < this.maxLives; i++) {
      heartsHtml += i < this.lives ? '❤️' : '🤍';
    }
    this.dom.hudLives.textContent = heartsHtml;
  }

  updateSoundIcons(isOn) {
    const icons = document.querySelectorAll('.sound-icon');
    icons.forEach(el => {
      el.textContent = isOn ? '🔊' : '🔇';
    });
    const soundTexts = document.querySelectorAll('.sound-text');
    soundTexts.forEach(el => {
      el.textContent = isOn ? 'Ses: Açık' : 'Ses: Kapalı';
    });
  }

  toggleFullscreen() {
    const elem = this.dom.container || document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  clampPlane() {
    const marginX = this.plane.width / 2 + 10;
    const marginYTop = 85; // Üst HUD mesafesi
    const marginYBottom = this.plane.height / 2 + 15;

    this.plane.x = Math.max(marginX, Math.min(this.logicWidth - marginX, this.plane.x));
    this.plane.y = Math.max(marginYTop, Math.min(this.logicHeight - marginYBottom, this.plane.y));
  }

  // ---------------------------------------------------------------------------
  // 5.3 Adil Nesne Üretim Mekanizması (Spawning)
  // ---------------------------------------------------------------------------
  spawnFlag() {
    // 6 serbest koridordan birini seç (120px ile 1160px arası)
    const lanes = [140, 320, 500, 680, 860, 1040, 1140];
    const laneX = lanes[Math.floor(Math.random() * lanes.length)];

    this.collectibles.push({
      x: laneX,
      y: -60,
      width: 58,
      height: 38,
      collected: false,
      waveAngle: Math.random() * Math.PI * 2
    });
  }

  spawnObstacle() {
    const cfg = this.levelConfig[this.level];
    const availableTypes = cfg.types;
    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

    // Boyutları türe göre belirle
    let width = 74;
    let height = 64;
    if (type === 'balloon') {
      width = 68;
      height = 92;
    } else if (type === 'birds') {
      width = 86;
      height = 48;
    } else if (type === 'mountain') {
      width = 96;
      height = 110;
    }

    // Oyuncunun mevcut konumunun hemen tepesine birdenbire doğmaması için adil seçim
    const minX = width / 2 + 40;
    const maxX = this.logicWidth - width / 2 - 40;
    let spawnX = minX + Math.random() * (maxX - minX);

    // Eğer son bayrağa çok yakınsa biraz kaydır
    for (let f of this.collectibles) {
      if (Math.abs(f.x - spawnX) < 100 && f.y < 50) {
        spawnX = (spawnX + 300) % (maxX - minX) + minX;
      }
    }

    this.obstacles.push({
      id: this.nextObstacleId++,
      type: type,
      x: spawnX,
      y: -height - 20,
      width: width,
      height: height,
      active: true
    });
  }

  // ---------------------------------------------------------------------------
  // 5.4 Ana Güncelleme Döngüsü (Update)
  // ---------------------------------------------------------------------------
  update(dt) {
    this.gameTime += dt;

    // Başlangıç ekranında da arka plan aksın ve uçak süzülsün
    const currentSpeed = this.state === 'PLAYING' ? this.levelConfig[this.level].scrollSpeed : 120;
    this.scenery.update(dt, currentSpeed);

    if (this.state !== 'PLAYING') {
      // Menüde uçağın tatlı hover hareketi
      if (this.state === 'START') {
        this.plane.x = this.logicWidth / 2;
        this.plane.y = this.logicHeight * 0.72 + Math.sin(this.gameTime * 2.5) * 12;
        this.plane.tilt = Math.sin(this.gameTime * 1.5) * 0.08;
      }
      return;
    }

    // 1. Ekran Sarsıntısı (Screen Shake) Güncelleme
    if (this.screenShakeTime > 0) {
      this.screenShakeTime -= dt;
    }

    // 2. Hasar Dokunulmazlık Zamanlayıcısı
    if (this.plane.invulnerableTimer > 0) {
      this.plane.invulnerableTimer -= dt;
    }

    // 3. Klavye Kontrolleri ile Uçak Hareketi
    let moveX = 0;
    let moveY = 0;
    if (this.keys.left) moveX -= 1;
    if (this.keys.right) moveX += 1;
    if (this.keys.up) moveY -= 1;
    if (this.keys.down) moveY += 1;

    // Normalizasyon (Çapraz giderken aşırı hızlanmayı önler)
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.7071;
      moveY *= 0.7071;
    }

    if (!this.plane.isDragging) {
      this.plane.x += moveX * this.plane.speed * dt;
      this.plane.y += moveY * this.plane.speed * dt;

      // Sağa-sola dönüşlerde yumuşak yatma efekti (Banking tilt)
      const targetTilt = moveX * 0.28;
      this.plane.tilt += (targetTilt - this.plane.tilt) * 0.18;
      this.clampPlane();
    }

    // Uçaktan duman/rüzgar izi çıkar
    if (Math.random() > 0.4) {
      this.particles.spawnEngineSmoke(this.plane.x, this.plane.y + this.plane.height * 0.35);
    }

    // 4. Nesne Üretim Zamanlayıcıları
    const cfg = this.levelConfig[this.level];
    this.spawnTimerFlag -= dt;
    if (this.spawnTimerFlag <= 0 && this.flagsCollected < this.flagsTarget) {
      this.spawnFlag();
      this.spawnTimerFlag = cfg.flagInterval + (Math.random() * 0.6 - 0.3);
    }

    this.spawnTimerObstacle -= dt;
    if (this.spawnTimerObstacle <= 0) {
      this.spawnObstacle();
      this.spawnTimerObstacle = cfg.obstacleInterval + (Math.random() * 0.8 - 0.4);
    }

    // 5. Bayrakları Güncelle ve Çarpışma Kontrolü
    const planeHitRadius = this.plane.width * 0.38; // Adil ve affedici çarpışma alanı

    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const flag = this.collectibles[i];
      flag.y += currentSpeed * dt;
      flag.waveAngle += dt * 5;

      // Çarpışma Kontrolü (Daire mesafesi ile hızlı ve adil)
      const dist = Math.hypot(this.plane.x - flag.x, this.plane.y - flag.y);
      if (dist < planeHitRadius + flag.width * 0.45 && !flag.collected) {
        flag.collected = true;
        this.flagsCollected++;
        this.score += 10;
        this.sound.playFlagCollect();
        this.particles.spawnFlagSparkles(flag.x, flag.y);
        this.updateHUD();
        this.collectibles.splice(i, 1);

        // Seviye İlerlemesi Kontrolü (Her 5 bayrakta seviye atlar)
        if (this.flagsCollected === 5 && this.level === 1) {
          this.triggerLevelTransition(2);
        } else if (this.flagsCollected === 10 && this.level === 2) {
          this.triggerLevelTransition(3);
        } else if (this.flagsCollected >= this.flagsTarget) {
          // 15 Bayrak Toplandı: GÖREV TAMAMLANDI!
          this.sound.playWin();
          this.showScreen('WIN');
          return;
        }
        continue;
      }

      // Ekran dışına çıkan bayrağı temizle
      if (flag.y > this.logicHeight + 80) {
        this.collectibles.splice(i, 1);
      }
    }

    // 6. Engelleri Güncelle ve Çarpışma Kontrolü
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.y += currentSpeed * dt;

      // Çarpışma Kontrolü
      if (obs.active && this.plane.invulnerableTimer <= 0) {
        // Çarpışma kutusu nesne boyutundan biraz daha küçük tutularak çocuklara adil kılınır
        const obsHitRadius = obs.width * 0.36;
        const dist = Math.hypot(this.plane.x - obs.x, this.plane.y - obs.y);

        if (dist < planeHitRadius + obsHitRadius) {
          // ÇARPIŞMA GERÇEKLEŞTİ!
          this.lives--;
          this.plane.invulnerableTimer = 1.5; // 1.5 saniye dokunulmazlık
          this.screenShakeTime = 0.25; // 250ms yumuşak ekran titremesi
          this.sound.playHit();
          this.particles.spawnHitPuff(this.plane.x, this.plane.y);
          this.updateHUD();

          // Çarpılan engel puf olup kaybolsun
          obs.active = false;
          this.obstacles.splice(i, 1);

          // Can Bitti mi kontrolü
          if (this.lives <= 0) {
            this.sound.playGameOver();
            this.showScreen('GAMEOVER');
            return;
          }
          continue;
        }
      }

      // Ekran dışına çıkan engeli temizle
      if (obs.y > this.logicHeight + 120) {
        this.obstacles.splice(i, 1);
      }
    }

    // 7. Parçacıkları Güncelle
    this.particles.update(dt);
  }

  // ---------------------------------------------------------------------------
  // 5.5 Çizim Döngüsü (Draw)
  // ---------------------------------------------------------------------------
  draw() {
    this.ctx.save();

    // Ekran Sarsıntısı (Screen Shake)
    if (this.screenShakeTime > 0) {
      const shakeAmt = 6 * (this.screenShakeTime / 0.25);
      const offsetX = (Math.random() - 0.5) * shakeAmt;
      const offsetY = (Math.random() - 0.5) * shakeAmt;
      this.ctx.translate(offsetX, offsetY);
    }

    // 1. Arka Plan Manzarası ve Bulutlar
    this.scenery.draw(this.ctx);

    // 2. Toplanabilir Türk Bayrakları
    for (let flag of this.collectibles) {
      // Bayrağın etrafında altın pırıltı halkası
      this.ctx.save();
      this.ctx.shadowColor = 'rgba(255, 193, 7, 0.7)';
      this.ctx.shadowBlur = 14;
      drawTurkishFlag(this.ctx, flag.x, flag.y, flag.width, flag.height, flag.waveAngle);
      this.ctx.restore();
    }

    // 3. Engeller
    for (let obs of this.obstacles) {
      if (obs.active) {
        drawObstacle(this.ctx, obs, this.gameTime);
      }
    }

    // 4. Parçacıklar ve Yüzen Yazılar
    this.particles.draw(this.ctx);

    // 5. Uçak (Oyuncu)
    const isInvulnerable = this.plane.invulnerableTimer > 0;
    drawCartoonAirplane(
      this.ctx,
      this.plane.x,
      this.plane.y,
      this.plane.width,
      this.plane.height,
      this.plane.tilt,
      isInvulnerable,
      this.gameTime
    );

    this.ctx.restore();
  }

  // ---------------------------------------------------------------------------
  // 5.6 Kare Döngüsü (requestAnimationFrame)
  // ---------------------------------------------------------------------------
  gameLoop(timestamp) {
    if (!this.lastTime) this.lastTime = timestamp;
    let dt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    // Sekme geçişlerindeki büyük sıçramaları ve gecikmeleri sınırla
    if (dt > 0.1) dt = 0.1;

    this.update(dt);
    this.draw();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

// -----------------------------------------------------------------------------
// 6. UYGULAMA BAŞLATICI
// -----------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  window.game = new SkyMissionGame();
});
