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
    const axiosResponse = (await axios({
      method: 'post',
      url: options.dev ? DEV_URL : PROD_URL,
      data: body,
    }))
    const responseData = axiosResponse.data.response.data
    return responseData
  } catch (err) {
    // logger.error('Error in dappHero api, getContractsByProjectKey', err)
    throw new Error(err)
  }
}
