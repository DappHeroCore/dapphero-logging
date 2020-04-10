import { RequestHandler } from 'express'
import { winstonLogger as logger } from '../logging/logger'
import * as models from '../models'
import * as services from '../services'
import * as api from '../api'


export const getContracts: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params
    const newKey = req.path
    const cachedContractsResponse = services.store.get(newKey)
    if (cachedContractsResponse === undefined) {
      try {
        const responseData = await api.dappHero.getContractsByProjectKey(projectId)
        services.store.set(newKey, responseData)
        res.send(responseData)
      } catch (e) {
        
      }
    }
    res.send(cachedContractsResponse)
  } catch (err) {
    console.log(err)
  }
}
