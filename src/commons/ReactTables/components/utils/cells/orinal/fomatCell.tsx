export const formatDate = (date) => {
    if (!date || date === "") {
      return '';
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return 'Invalid date';
    }
    const locale = navigator.language;
    return new Intl.DateTimeFormat(locale, {
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


  export const formatDateTime = (date) => {
    if (!date || date === "") {
      return '';
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return 'Invalid date';
    }
  
    const locale = navigator.language; // Lấy ngôn ngữ và thiết lập khu vực của máy tính
  
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

  export const formatNumber = (number, minFractionDigits, maxFractionDigits) => {
    if (!number || number === "") {
        return '';
    }
    const locale = navigator.language; 
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
    }).format(number);
};

export const formatUsNumber = (number, minFractionDigits, maxFractionDigits) => {
    if (!number || number === "") {
        return '';
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
    }).format(number);
};

export const formatVnNumber = (number, minFractionDigits, maxFractionDigits) => {
    if (!number || number === "") {
        return '';
    }
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
    }).format(number);
};