const formatTime = (date) => {
  //   console.log("type: ", typeof date);
  // untuk ambil waktu sekarang
  const dateNow = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const witaTime = dateNow.toLocaleTimeString("en-US", {
    timeZone: "Asia/Makassar",
    ...options,
  });

  const dateMoUbah = witaTime;
  const tanggal = dateMoUbah.split(", ")[0].split("/");
  const waktu = dateMoUbah.split(", ")[1];

  const tahun = tanggal[2];
  const bulan = tanggal[0];
  const day = tanggal[1];
  const tanggal_laporan_dikirim = `${tahun}-${bulan}-${day} ${waktu}`;

  return tanggal_laporan_dikirim;
};

module.exports = formatTime;
