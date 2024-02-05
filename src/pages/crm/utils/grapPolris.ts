// @ts-ignore
import Cookies from 'js-cookie';

export function getGrap(): Record<string, any> {
  let ginfoValue: Record<string, any> = {};
  const ginfo = JSON.parse(Cookies.get('Ginfo') || '{}');
  if (ginfo.backend && Object.keys(ginfo.backend).length > 0) {
    ginfoValue = ginfo.backend;
  }
  return ginfoValue;
}
