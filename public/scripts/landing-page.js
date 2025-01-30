document.addEventListener("DOMContentLoaded", () => {
  // Ambil parameter dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const nama = urlParams.get('nama') || ''; // Ambil 'nama' dari URL
  const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i,'; // Ambil sapaan

  // Menampilkan nama dan sapaan di elemen
  const namaContainer = document.querySelector('#nama');
  if (namaContainer) {
    namaContainer.innerText = `${pronoun} ${nama}`.replace(/ ,$/, ','); // Menambahkan sapaan dan nama
  }
});
// contoh url http://localhost:3000/index.html?nama=Frenzy%20Ardian%20Kusumo&p=Bapak#rsvp
