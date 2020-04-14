import { RequestHandler } from 'express'
import { winstonLogger as logger } from '../logging/logger'
import * as models from '../models'
import * as services from '../services'
import * as api from '../api'

export const getContracts: RequestHandler = async (req, res) => {
  try {
    switch (true) {
    case (req.query.raw === 'true'): {
      try {
        const { projectId } = req.params
        const newKey = req.path
        const cachedContractsResponse = services.store.get(newKey, { raw: true })
        if (cachedContractsResponse === undefined) {
          const responseData = await api.dappHero.getContractsByProjectKey(projectId)
          services.store.set(newKey, responseData)
          const value = services.store.get(newKey, { raw: true })
          res.send(value)
        }
      } catch (err) {
        console.log(err)
        res.send(err)
      }
      break
    }
    default: {
      try {
        const { projectId } = req.params
        const newKey = req.path
        const cachedContractsResponse = services.store.get(newKey)
        if (cachedContractsResponse === undefined) {
          const responseData = await api.dappHero.getContractsByProjectKey(projectId)
          services.store.set(newKey, responseData)
          res.send(services.store.get(newKey))
        }
        res.send(cachedContractsResponse)
      } catch (err) {
        console.log(err)
        res.send(err)
      }
    }
    }
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

export const updateContracts: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params
    const newKey = req.path
    const responseData = await api.dappHero.getContractsByProjectKey(projectId)
    services.store.set(newKey, responseData)
    res.send({
      projectId,
      path: req.path,
      newKey,
      responseData,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

