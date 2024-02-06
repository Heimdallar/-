export const logError = (
  eventName: string,
  { params = {}, options = {} }: { params: Record<string, any>; options?: any },
) => {
  try {
    if (!(window?.DUOTEL instanceof Object) && !(window?.DUOTEL?.send instanceof Object)) {
      return;
    }

    window.DUOTEL.send(eventName, params, options);
  } catch (error) {
    console.log(error);
  }
};
