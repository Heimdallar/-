interface Options {
  request: (data?: any) => Promise<any>;
  onSuccess: (res: any, otherParams:any) => any;
  onError: (error: any) => any;
  validateOnSucesss?: (res) => boolean
}

const adapter = ({
  request,
  onSuccess = () => {},
  onError = () => {},
  validateOnSucesss
}: Options) => {
  return async function(data?: Record<string, any>, otherParams?:Record<string, any>) {
    try {
      const res = await request(data)
      if(validateOnSucesss ? validateOnSucesss(res) : res.code === 200) {
        return onSuccess(res, otherParams)
      }
      return onError(res)
    } catch(error) {
      return onError(error)
    }
  }
}

export default adapter
