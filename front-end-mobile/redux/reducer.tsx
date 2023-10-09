import {createSelector} from 'reselect';
import {
  saveIdUser,
  saveName,
  saveRole,
  saveToken,
  saveUsername,
  // DATA KARAKTERISTIK PASIEN
  saveNamePasien,
  saveNoMR,
  saveRuangan,
  saveAge,
  saveAgeNo,
  saveSelectedAgeType,
  saveAsuransi,
  saveJenisKelamin,
  saveWaktuMendapatPelayanan,
  // DATA RINCIAN KEJADIAN
  saveWaktuInsiden,
  saveInsiden,
  saveKronologiInsiden,
  saveInsidenTerjadiPadaPasien,
  savePelaporPertama,
  savePasienTerkait,
  saveDampakInsiden,
  saveLokasiInsiden,
  saveProbabilitas,
  saveUnitTerkait,
  saveTindakLanjut,
  saveTindakLanjutOleh,
  saveIsPernahTerjadi,
  saveDeskripsiPernahTerjadi,
  savePernahTerjadi,
  // FOTO PENDUKUNG
  saveImageCamera,
} from './tipe';

const initData = {
  id_user: '',
  name: '',
  role: '',
  token: '',
  username: '',
  // DATA KARAKTERISTIK PASIEN
  namePasien: '',
  noMR: '',
  ruangan: '',
  age: '',
  ageNo: '',
  selectedAgeType: '',
  asuransi: '',
  jenisKelamin: '',
  waktuMendapatPelayanan: new Date(),
  // DATA RINCIAN KEJADIAN
  waktuInsiden: new Date(),
  insiden: '',
  kronologiInsiden: '',
  insidenTerjadiPadaPasien: '',
  pelaporPertama: '',
  pasienTerkait: 0,
  dampakInsiden: '',
  lokasiInsiden: '',
  probabilitas: '',
  unitTerkait: '',
  tindakLanjut: '',
  tindakLanjutOleh: '',
  isPernahTerjadi: undefined,
  deskripsiPernahTerjadi: '',
  pernahTerjadi: '',
  // FOTO PENDUKUNG
  imageCamera: null,
};

export const rootReducer = (state = initData, action: any) => {
  switch (action.type) {
    case saveIdUser:
      //   console.log('print value halo: ', action);
      //   console.log('ini didalam state: ', state);
      //   return {...state, value: action.data};
      console.log('Berhasil simpan data id user yyyeeee rasengan!!!');
      return {...state, id_user: action.data};

    case saveName:
      return {...state, name: action.data};

    case saveRole:
      return {...state, role: action.data};

    case saveToken:
      return {...state, token: action.data};

    case saveUsername:
      return {...state, username: action.data};

    case saveNamePasien:
      return {...state, namePasien: action.data};

    case saveNoMR:
      return {...state, noMR: action.data};

    case saveRuangan:
      return {...state, ruangan: action.data};

    case saveAge:
      return {...state, age: action.data};

    case saveAgeNo:
      return {...state, ageNo: action.data};

    case saveSelectedAgeType:
      return {...state, selectedAgeType: action.data};

    case saveAsuransi:
      return {...state, asuransi: action.data};

    case saveJenisKelamin:
      return {...state, jenisKelamin: action.data};

    case saveWaktuMendapatPelayanan:
      return {...state, waktuMendapatPelayanan: action.data};

    // ACTION RINCIAN KEJADIAN
    case saveWaktuInsiden:
      return {...state, waktuInsiden: action.data};

    case saveInsiden:
      return {...state, insiden: action.data};

    case saveKronologiInsiden:
      return {...state, kronologiInsiden: action.data};

    case saveInsidenTerjadiPadaPasien:
      return {...state, insidenTerjadiPadaPasien: action.data};

    case savePelaporPertama:
      return {...state, pelaporPertama: action.data};

    case savePasienTerkait:
      return {...state, pasienTerkait: action.data};

    case saveDampakInsiden:
      return {...state, dampakInsiden: action.data};

    case saveLokasiInsiden:
      return {...state, lokasiInsiden: action.data};

    case saveProbabilitas:
      return {...state, probabilitas: action.data};

    case saveUnitTerkait:
      return {...state, unitTerkait: action.data};

    case saveTindakLanjut:
      return {...state, tindakLanjut: action.data};

    case saveTindakLanjutOleh:
      return {...state, tindakLanjutOleh: action.data};

    case saveIsPernahTerjadi:
      return {...state, isPernahTerjadi: action.data};

    case saveDeskripsiPernahTerjadi:
      return {...state, deskripsiPernahTerjadi: action.data};

    case savePernahTerjadi:
      return {...state, pernahTerjadi: action.data};

    case saveImageCamera:
      return {...state, imageCamera: action.data};

    default:
      return state;
  }
};
