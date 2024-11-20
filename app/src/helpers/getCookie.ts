const getCookie = (name: string) => {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }
  
  const setCookie = (name: string, val: string, expires: any) => {
    const date = new Date();
    date.setDate(date.getDate() + ( expires * 86400000));
    document.cookie = name+"="+val+"; path=/; expires=" + date.toUTCString();
  }
  
  const deleteCookie = (name: string) => {
    setCookie(name, "", {
        'max-age': -1
    })
  }
  
  export { getCookie, setCookie, deleteCookie }
  