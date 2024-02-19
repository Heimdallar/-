import { Data } from '../interface/fetchSubmit'

const buildMakeIeaSubmit = () => {
  return function makeIeaSubmit(record: Data) {
    if (!record) {
      return null
    }

    return {
      invitationCode: record.invitationCode,
      invitationCodeStartTime: record.invitationCodeStartTime,
      invitationCodeEndTime: record.invitationCodeEndTime,
    }
  }
}

export default buildMakeIeaSubmit
