// SET WAKTU BUKA (SATU SAJA)
const waktuBuka = new Date("2026-05-04T19:00:00");

// COUNTDOWN + KONTROL TAMPILAN
setInterval(() => {
  const sekarang = new Date();
  const selisih = waktuBuka - sekarang;

  const el = document.getElementById("countdown");

  if (selisih > 0) {
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const menit = Math.floor((selisih / (1000 * 60)) % 60);
    const detik = Math.floor((selisih / 1000) % 60);

    el.innerHTML = `Pengumuman dibuka dalam:<br>
    <strong>${hari} hari ${jam} jam ${menit} menit ${detik} detik</strong>`;

    // sembunyikan input
    document.getElementById("main").style.display = "none";
    document.getElementById("blocked").style.display = "block";

  } else {
    el.innerHTML = "Pengumuman sudah dibuka";

    // tampilkan input
    document.getElementById("main").style.display = "block";
    document.getElementById("blocked").style.display = "none";
  }
}, 1000);
function formatTanggal(tgl) {
  const bulan = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  const [tahun, bulanAngka, hari] = tgl.split("-");
  return `${parseInt(hari)} ${bulan[parseInt(bulanAngka)-1]} ${tahun}`;
}

// CEK KELULUSAN
async function cekKelulusan() {
  const nisnInput = document.getElementById("nisn").value.trim();
  const hasilDiv = document.getElementById("hasil");

  if (!nisnInput) {
    hasilDiv.innerHTML = "Masukkan NISN terlebih dahulu!";
    return;
  }

  const response = await fetch("data.json");
  const data = await response.json();

  const siswa = data.find(s => s.nisn === nisnInput);

  if (siswa) {
    if (siswa.status === "LULUS") {
    hasilDiv.innerHTML = `
  <h3 style="margin-bottom:5px; color:#2a5298; font-size:22px; letter-spacing:0.5px;">
  ${siswa.nama}
</h3>
  <p style="color:gray;">${formatTanggal(siswa.tanggal_lahir)}</p>
  <br>
  <h2 style="color:green;">SELAMAT ANDA DINYATAKAN LULUS</h2>
`;
    } else {
    hasilDiv.innerHTML = `
  <h3 style="margin-bottom:5px; color:#2a5298; font-size:22px; letter-spacing:0.5px;">
  ${siswa.nama}
</h3>
  <p style="color:gray;">${formatTanggal(siswa.tanggal_lahir)}</p>
  <br>
  <h2 style="color:red;">ANDA DINYATAKAN TIDAK LULUS</h2>
`;
    }
  } else {
    hasilDiv.innerHTML = "Data tidak ditemukan!";
  }
}
