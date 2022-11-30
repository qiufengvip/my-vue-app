/**
 * @desc 转tree
 * @param data      原数据
 * @param pid       pid的值
 * @param pdata     父级的data
 * @param children  字集的名称
 * @returns {*[]}
 */
export const toTree: any = (data: any[], pid: string, pdata: any, children: string) => {
  let a: any[] = [],
    b: any[] = [];
  data.forEach((item) => {
    if (item.pid === pid) {
      a.push(item);
    } else {
      b.push(item);
    }
  });
  if (pdata === null) {
    pdata = a;
  } else {
    pdata[children] = a;
  }
  if (b.length > 0) {
    a.forEach((item) => {
      toTree(b, item.id, item, children);
    });
  }
  return a;
};
//寻找树形结构的树杈

export const lookingBranch: any = (data: any[], pid: string | number) => {
  let a: any[] = [],
    b: any[] = [],
    c: any[] = [];
  data.forEach((item) => {
    if (item.pid === pid) {
      a.push(item);
    } else {
      b.push(item);
    }
  });
  if (a.length > 0) {
    a.forEach((item) => {
      c = lookingBranch(b, item.id);
    });
  }
  a.concat(c);
  return a;
};

/**
 * @desc 复制内容到剪贴板
 * @param txt
 */
export const copyText: any = function (txt: string) {
  const input = document.createElement('input');
  input.value = txt;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
};

export const imgFileType: any = [
  '',
  '',
  '',
  '',
  'image/tiff',
  'image/tiff',
  'image/vnd.svf',
  'image/png',
  'image/jpeg',
  'image/jpeg',
  'image/jpeg',
  'image/jp2',
  'image/gif',
  'image/vnd.dxf',
  'image/vnd.dwg',
];

// @ts-ignore
Date.prototype.Format = function (fmt: string) {
  let o: any = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
  };
  if (/(y+)/.test(fmt)) {
    //根据y的长度来截取年
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substring(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length));
  }
  return fmt;
};
