/**
 * 格式化手机号
 * @param value 手机号 13912345678
 * @returns 格式化后的手机号 139 1234 5678
 */
export const formatPhoneNumber = (value: string) => {
  // 移除非数字字符
  const numbers = value.replace(/\D/g, '');
  // 限制长度为11位
  const trimmed = numbers.slice(0, 11);
  // 格式化：3-4-4
  if (trimmed.length > 7) {
    return `${trimmed.slice(0, 3)} ${trimmed.slice(3, 7)} ${trimmed.slice(7)}`;
  } else if (trimmed.length > 3) {
    return `${trimmed.slice(0, 3)} ${trimmed.slice(3)}`;
  }
  return trimmed;
};

/**
 * 验证手机号是否有效
 * @param phone 手机号 13912345678
 * @returns 是否有效
 */
export const isValidPhone = (phone: string) => {
  // 移除所有非数字字符后验证
  const cleanPhone = phone.replace(/\D/g, '');
  return /^1[3-9]\d{9}$/.test(cleanPhone);
};

/**
 * 固定滚动位置
 * @param visible 是否固定
 */
export const fixedScroll = (visible: boolean) => {
  if (visible) {
    // 保存当前滚动位置
    const scrollY = window.scrollY;
    // 添加样式到 body
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  } else {
    // 恢复滚动位置
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
};

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = (fn: Function, delay: number) => {
  let lastTime = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
};
