export const isNullOrUndefinedOrEmpty = (value) => {
  if (value === null || value === undefined || value === "") return true;
  return false;
};

export const identifyFields = [
  { name: "Adı", field: "name" },
  { name: "Soyadı", field: "surname" },
  { name: "TC Kimlik No", field: "identifyNumber" },
  { name: "Doğum Tarihi", field: "birthDate" },
  { name: "Cinsiyet", field: "gender" },
];

export const educationFields = [
  { name: "Lise", field: "highSchool" },
  { name: "Mezuniyet Tarihi", field: "highSchoolGradiationDate" },
  { name: "Lise Diploması", field: "highSchoolFile" },
  { name: "Üniversite", field: "university" },
  { name: "Bölüm", field: "universityDepartment" },
  { name: "Mezuniyet Tarihi", field: "universityGradiationDate" },
  { name: "Üniversite Diploması", field: "universityFile" },
];

export const personalFields = [
  { name: "İletişim Adresi", field: "address" },
  { name: "İlçe", field: "district" },
  { name: "İl", field: "city" },
  { name: "Cep Telefonu", field: "phoneNumber" },
  { name: "E posta", field: "email" },
];

export const UserRoles = {
  Student: "Student",
  Educator: "Educator",
  Admin: "Admin",
};

export const userRolesValidation = (allowedRoles) => {
  const storage = localStorage.getItem("user");
  if (storage === undefined) return false;
  const user = JSON.parse(storage);

  return allowedRoles?.some((item) => user?.roles?.includes(item));
};

export const convertDateTimeToDate = (value) => {
  if (!isNullOrUndefinedOrEmpty(value) && value.includes("T")) {
    let index = value.indexOf("T");
    const _value = value.slice(0, index);
    const partialDate = _value.split("-");
    let date = "";
    if (partialDate.length === 3) {
      // Yıl, Ay ve Gün'ü ters sırada birleştiriyoruz
      const formattedDate = `${partialDate[2]}.${partialDate[1]}.${partialDate[0]}`;
      return formattedDate;
    }
    // partialDate.forEach((element) => {
    //   date += element + ".";
    // });
    // date = date.slice(0, -1);
    return date;
  } else {
    return value;
  }
};

export const convertDateTimeToDateTime = (value) => {
  if (!isNullOrUndefinedOrEmpty(value) && value.includes("T")) {
    const [datePart, timePart] = value.split("T");
    const [year, month, day] = datePart.split("-");
    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = timePart.split(":").slice(0, 2).join(":");
    return `${formattedDate} ${formattedTime}`;
  } else {
    return value;
  }
};

export const truncate = (str, maxlength) => {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
};

export const createDateFromDateTime = (dateString) => {
  return new Date(dateString);
};

export const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};
