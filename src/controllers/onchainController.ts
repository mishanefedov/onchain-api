import { Request, Response } from 'express';
import {
  getTokenData,
  getTokenHolders
} from '../services/onchainService'

export const getTokenDataController = async (req: Request, res: Response) => {
  try {
    if (req.body.tokenAddress === undefined){
      return res.status(400).send("Define tokenAddress");
    }
    const tokenAddress = req.body.tokenAddress;
    const tokenData = await getTokenData(
      tokenAddress
    )
    return res.send(JSON.stringify(tokenData, (_, value) =>
      typeof value === 'bigint'
      ? value.toString()
      : value
    ));
  } catch (error) {
    res.status(500).send(`Error getting token data: ${error}`);
  }
};

export const getTokenHoldersController = async (req: Request, res: Response) => {
  try {
    if (req.body.tokenAddress === undefined){
      return res.status(400).send("Define tokenAddress");
    }
    const tokenAddress = req.body.tokenAddress;
    let tokenHolders
    if (req.body.latestBlockCount !== undefined){
      const latestBlockCount = req.body.latestBlockCount;
      tokenHolders = await getTokenHolders(
        tokenAddress,
        latestBlockCount
      )
    } else {
      tokenHolders = await getTokenHolders(
        tokenAddress
      )
    }
    return res.send(JSON.stringify(tokenHolders, (_, value) =>
      typeof value === 'bigint'
      ? value.toString()
      : value
    ));
  } catch (error) {
    res.status(500).send(`Error getting token holders: ${error}`);
  }
};
