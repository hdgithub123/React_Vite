export const formatDate = (date, locale = null ) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }
  let localechange= ''
  if(locale){
     localechange = locale;
  } else {
    localechange = navigator.language;
  }

  return new Intl.DateTimeFormat(localechange, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};

export const formatVnDate = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};


export const formatUsDate = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};


export const formatDateTime = (date, locale= null) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  let localechange= ''
  if(locale){
     localechange = locale;
  } else {
    localechange = navigator.language;
  }

  const datePart = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);

  const timePart = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    //   second: '2-digit',
    hourCycle: 'h23' // Đảm bảo sử dụng định dạng 24 giờ
  }).format(parsedDate);

  return `${datePart} ${timePart}`;
};

export const formatVnDateTime = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  const datePart = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);

  const timePart = new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    //   second: '2-digit',
    hourCycle: 'h23' // Đảm bảo sử dụng định dạng 24 giờ
  }).format(parsedDate);

  return `${datePart} ${timePart}`;
};

export const formatUsDateTime = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  const datePart = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    //   second: '2-digit',
    hourCycle: 'h23' // Đảm bảo sử dụng định dạng 24 giờ
  }).format(parsedDate);

  return `${datePart} ${timePart}`;
};

export const formatNumber = (number, minFractionDigits = 0, maxFractionDigits = 2, option = {}, locale = null) => {
  if (number == null || number === "") {
    return '';
  }
  let localechange= ''
  if(locale){
     localechange = locale;
  } else {
    localechange = navigator.language;
  }
  const options = {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  };

  // Kiểm tra nếu option không null hoặc undefined và là một object hợp lệ
  if (option && typeof option === 'object') {
    // Lặp qua các phần tử trong object option và gán vào options
    Object.entries(option).forEach(([key, value]) => {
      options[key] = value;
    });
  }

  return new Intl.NumberFormat(localechange, options).format(number);
};


export const formatUsNumber = (number, minFractionDigits, maxFractionDigits, option = {}) => {
  if (number == null || number === "") {
    return '';
  }

  const locale = 'en-US';
  const options = {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  };

  // Kiểm tra nếu option không null hoặc undefined và là một object hợp lệ
  if (option && typeof option === 'object') {
    // Lặp qua các phần tử trong object option và gán vào options
    Object.entries(option).forEach(([key, value]) => {
      options[key] = value;
    });
  }

  return new Intl.NumberFormat(locale, options).format(number);
};

export const formatVnNumber = (number, minFractionDigits, maxFractionDigits, option = {}) => {
  if (number == null || number === "") {
    return '';
  }

  const locale = 'vi-VN';
  const options = {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  };

  // Kiểm tra nếu option không null hoặc undefined và là một object hợp lệ
  if (option && typeof option === 'object') {
    // Lặp qua các phần tử trong object option và gán vào options
    Object.entries(option).forEach(([key, value]) => {
      options[key] = value;
    });
  }

  return new Intl.NumberFormat(locale, options).format(number);
};


// note:
// Value of option:
// 1.decimal-- default { style: 'decimal' } example: 1234.56 → 1,234.56
// 2. currency: { style: 'currency', currency: 'USD' } example: 1234.56 → $1,234.56 (với currency: 'USD')
// 3. percent: { style: 'percent' } example:  0.123 → 12%
// 4. unit: { style: 'unit', unit: 'kg' } example: 1234.56 → 1,234.56 kg