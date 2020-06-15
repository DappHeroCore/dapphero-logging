import Axios from 'axios'

const axios = Axios.create({ headers: { 'content-type': 'application/json' } })

// Refactor when this is more fleshed out
const DEV_URL = 'https://dapphero-admin.bubbleapps.io/version-state-page/api/1.1/wf/contracts'
const PROD_URL = 'https://dapphero-admin.bubbleapps.io/api/1.1/wf/contracts'

export const getContractsByProjectKey = async (projectId): Promise<Record<string, any>> => {
  // logger.log(`projectId: ${projectId}`)

  const body = { projectId }
  try {
    const axiosPromiseProd = axios({
      method: 'post',
      url: PROD_URL,
      data: body,
    })
    const axiosPromiseDev = axios({
      method: 'post',
      url: DEV_URL,
      data: body,
    })
    try {
      const axiosResponseProd = await axiosPromiseProd

      // data.response.data comes back as string, if the projectId is missing data will be "[]" which has length of two
      if (axiosResponseProd?.data?.response?.data?.length <= 2) throw new Error('Production database contains no data.  Checking dev URL')
      return axiosResponseProd?.data?.response?.data
    } catch (err1) {
      console.log(err1)
      try {
        const axiosResponseDev = await axiosPromiseDev
        return axiosResponseDev?.data?.response?.data
      } catch (err2) {
        throw new Error(err2)
      }
    }
  } catch (err) {
    // logger.error('Error in dappHero api, getContractsByProjectKey', err)
    throw new Error(err)
  }
}
