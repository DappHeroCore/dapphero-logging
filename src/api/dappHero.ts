import Axios from 'axios'

const axios = Axios.create({ headers: { 'content-type': 'application/json' } })

// Refactor when this is more fleshed out
const DEV_URL = 'https://dapphero-admin.bubbleapps.io/version-new-layout/api/1.1/wf/contracts'
const PROD_URL = 'https://dapphero-admin.bubbleapps.io/api/1.1/wf/contracts'

const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

const POST = 'post'
const GET = 'get'
const PUT = 'put'
const DELETE = 'delete'

export const getContractsByProjectKey = async (projectId, options = { dev: false }) => {
  // logger.log(`projectId: ${projectId}`)

  const body = { projectId }
  try {
    const axiosResponseProd = axios({
      method: 'post',
      url: PROD_URL,
      data: body,
    })
    const axiosResponseDev = axios({
      method: 'post',
      url: DEV_URL,
      data: body,
    })
    const responses = await Promise.all([ axiosResponseProd, axiosResponseDev ])
    const responseData = responses[0]?.data?.response?.data.length >= 2 ? responses[0]?.data?.response?.data : responses[1]?.data?.response?.data
    return responseData
  } catch (err) {
    // logger.error('Error in dappHero api, getContractsByProjectKey', err)
    throw new Error(err)
  }
}
