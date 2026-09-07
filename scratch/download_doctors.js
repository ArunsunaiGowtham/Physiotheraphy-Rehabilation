const fs = require('fs');

const doctors = [
  { id: 'hayes', photoId: 'photo-1537368910025-700350fe46c7' }, // Dr. Robert Hayes
  { id: 'almansoor', photoId: 'photo-1559839734-2b71ea197ec2' }, // Dr. Hannah Al-Mansoor
  { id: 'watson', photoId: 'photo-1594824813973-86105f23438e' }, // Dr. Emily Watson
  { id: 'brooks', photoId: 'photo-1622253692010-333f2da6031d' }, // Dr. Tyler Brooks
  { id: 'voronov', photoId: 'photo-1612349317150-e413f6a5b16d' }, // Dr. Alexei Voronov
  { id: 'laurent', photoId: 'photo-1551601651-2a8555f1a136' }, // Dr. Sophie Laurent
  { id: 'sterling', photoId: 'photo-1582750433449-648ed127bb54' }, // Dr. James Sterling
  { id: 'cross', photoId: 'photo-1576091160399-112ba8d25d1d' }, // Dr. Nathan Cross
  { id: 'patel', photoId: 'photo-1573496359142-b8d87734a5a2' } // Dr. Maya Patel
];

async function downloadAll() {
  for (const doc of doctors) {
    const url = `https://images.unsplash.com/${doc.photoId}?w=600&h=600&auto=format&fit=crop&crop=faces,center&q=85`;
    const target = `assets/images/therapist-${doc.id}.jpg`;
    const consultTarget = `assets/images/therapist-consult-${doc.id}.jpg`;
    console.log(`Downloading ${doc.id}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(target, buffer);
      // For consultation hero, we can use a slightly wider format or the same
      const heroUrl = `https://images.unsplash.com/${doc.photoId}?w=1200&h=800&auto=format&fit=crop&crop=faces,center&q=85`;
      const heroRes = await fetch(heroUrl);
      if (heroRes.ok) {
        fs.writeFileSync(consultTarget, Buffer.from(await heroRes.arrayBuffer()));
      } else {
        fs.copyFileSync(target, consultTarget);
      }
      console.log(`Saved ${target} (${buffer.length} bytes) and ${consultTarget}`);
    } catch (e) {
      console.error(`Error downloading ${doc.id}:`, e.message);
    }
  }
}

downloadAll();
