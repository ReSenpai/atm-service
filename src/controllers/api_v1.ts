import express, { Request } from 'express';

import { tinkoffAPI } from '../api';
import { Clusters, Currency } from '../models/tinkoff';

const apiV1 = express.Router();

interface AtmParams {
  currency: Currency;
}

type AtmRequest = Request<unknown, unknown, unknown, AtmParams>;

apiV1.get('/atm', async (req: AtmRequest, res) => {
  const { currency } = req.query;

  if (!currency) {
    res.status(400);
    res.send('Bad Request. You need the "currency" parameter.');
    return;
  }

  const currencies = currency.split(',');
  const clusters = await Promise.all(
    currencies.map(async (currency) => await tinkoffAPI.getClusters(currency))
  );

  const isClusters = (
    cluster: (undefined | Clusters)[]
  ): cluster is Clusters[] => !cluster.includes(undefined);

  if (!isClusters(clusters)) {
    res.status(500);
    res.send(
      'Internal Server Error. Problem with the tinkoffAPI getClusters method.'
    );
    return;
  }

  const idArr: string[] = [];
  const points = clusters
    .flatMap((clusters) => clusters.payload.clusters)
    .flatMap((cluster) => cluster.points)
    .filter((point) => {
      if (idArr.includes(point.id)) {
        return false;
      }
      idArr.push(point.id);
      return true;
    })
    .map((point) => ({
      id: point.id,
      location: point.location,
      address: point.address,
      currencyBalance: point.limits.map((currency) => ({
        currency: currency.currency,
        amount: currency.amount,
      })),
    }));

  res.send(JSON.stringify(points, null, 2));
});

module.exports = apiV1;
