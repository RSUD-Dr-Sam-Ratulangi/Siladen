import {
  saveIdUser,
  saveName,
  saveRole,
  saveToken,
  saveUsername,
  saveJob,
  // DATA_KARAKTERISTIK
  saveNamePasien,
  saveNoMR,
  saveRuangan,
  saveAge,
  saveAgeNo,
  saveSelectedAgeType,
  saveAsuransi,
  saveJenisKelamin,
  saveWaktuMendapatPelayanan,
  // RINCIAN KEJADIAN
  saveWaktuInsiden,
  saveInsiden,
  saveKronologiInsiden,
  saveInsidenTerjadiPadaPasien,
  saveInsidenTerjadiPadaPasienOption,
  savePelaporPertama,
  saveInputPelaporPertama,
  savePasienTerkait,
  saveDampakInsiden,
  saveLokasiInsiden,
  saveProbabilitas,
  saveUnitTerkait,
  saveTindakLanjut,
  saveTindakLanjutOleh,
  saveInputTindakLanjutOleh,
  saveIsPernahTerjadi,
  saveDeskripsiPernahTerjadi,
  savePernahTerjadi,
  // FOTO PENDUKUNG
  saveImageCamera,
  // channel id
  saveChannelId,
  //AdminHistoryItems
  saveMonth,
  saveYear,
} from './tipe';

export const saveIdUserAction = (data: string) => ({
  type: saveIdUser,
  data,
});

export const saveNameAction = (data: string) => ({
  type: saveName,
  data,
});

export const saveRoleAction = (data: string) => ({
  type: saveRole,
  data,
});

export const saveTokenAction = (data: string) => ({
  type: saveToken,
  data,
});

export const saveUsernameAction = (data: string) => ({
  type: saveUsername,
  data,
});
export const saveJobAction = (data: string) => ({
  type: saveJob,
  data,
});

export const saveNamePasienAction = (data: string) => ({
  type: saveNamePasien,
  data,
});

export const saveNoMRAction = (data: string) => ({
  type: saveNoMR,
  data,
});

export const saveRuanganAction = (data: string) => ({
  type: saveRuangan,
  data,
});

export const saveAgeAction = (data: string) => ({
  type: saveAge,
  data,
});

export const saveAgeNoAction = (data: string) => ({
  type: saveAgeNo,
  data,
});

export const saveSelectedAgeTypeAction = (data: string) => ({
  type: saveSelectedAgeType,
  data,
});

export const saveAsuransiAction = (data: string) => ({
  type: saveAsuransi,
  data,
});

export const saveJenisKelaminAction = (data: string) => ({
  type: saveJenisKelamin,
  data,
});

export const saveWaktuMendapatPelayananAction = (data: string) => ({
  type: saveWaktuMendapatPelayanan,
  data,
});

export const saveWaktuInsidenAction = (data: string) => ({
  type: saveWaktuInsiden,
  data,
});

export const saveInsidenAction = (data: string) => ({
  type: saveInsiden,
  data,
});

export const saveKronologiInsidenAction = (data: string) => ({
  type: saveKronologiInsiden,
  data,
});

export const saveInsidenTerjadiPadaPasienAction = (data: string) => ({
  type: saveInsidenTerjadiPadaPasien,
  data,
});

export const saveInsidenTerjadiPadaPasienOptionAction = (data: string) => ({
  type: saveInsidenTerjadiPadaPasienOption,
  data,
});

export const savePelaporPertamaAction = (data: string) => ({
  type: savePelaporPertama,
  data,
});

export const saveInputPelaporPertamaAction = (data: string) => ({
  type: saveInputPelaporPertama,
  data,
});

export const savePasienTerkaitAction = (data: number) => ({
  type: savePasienTerkait,
  data,
});

export const saveDampakInsidenAction = (data: string) => ({
  type: saveDampakInsiden,
  data,
});

export const saveLokasiInsidenAction = (data: string) => ({
  type: saveLokasiInsiden,
  data,
});

export const saveProbabilitasAction = (data: string) => ({
  type: saveProbabilitas,
  data,
});

export const saveUnitTerkaitAction = (data: string) => ({
  type: saveUnitTerkait,
  data,
});

export const saveTindakLanjutAction = (data: string) => ({
  type: saveTindakLanjut,
  data,
});

export const saveTindakLanjutOlehAction = (data: string) => ({
  type: saveTindakLanjutOleh,
  data,
});

export const saveInputTindakLanjutOlehAction = (data: string) => ({
  type: saveInputTindakLanjutOleh,
  data,
});

export const saveIsPernahTerjadiAction = (data: boolean) => ({
  type: saveIsPernahTerjadi,
  data,
});

export const saveDeskripsiPernahTerjadiAction = (data: string) => ({
  type: saveDeskripsiPernahTerjadi,
  data,
});

export const savePernahTerjadiAction = (data: string) => ({
  type: savePernahTerjadi,
  data,
});

export const saveImageCameraAction = (data: any) => ({
  type: saveImageCamera,
  data,
});
export const saveChannelIdAction = (data: any) => ({
  type: saveChannelId,
  data,
});
export const saveMonthAction = (data: any) => ({
  type: saveMonth,
  data,
});
export const saveYearAction = (data: string) => ({
  type: saveYear,
  data,
});
