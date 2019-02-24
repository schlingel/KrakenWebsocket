import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { KrakenMessage } from '../interfaces/kraken-message.interface';

@Injectable()
export class KrakenService {
    public static readonly KRAKEN_URL = 'wss://ws.kraken.com';
    public static readonly CRYPTO_PAIRS: string[] = [
        'ADA/CAD', 'ADA/ETH', 'ADA/EUR', 'ADA/USD', 'ADA/XBT', 'BCH/EUR', 'BCH/USD', 'BCH/XBT',
        'BSV/EUR', 'BSV/USD', 'BSV/XBT', 'DASH/EUR', 'DASH/USD', 'DASH/XBT', 'EOS/ETH', 'EOS/EUR',
        'EOS/USD', 'EOS/XBT', 'GNO/ETH', 'GNO/EUR', 'GNO/USD', 'GNO/XBT', 'QTUM/CAD', 'QTUM/ETH',
        'QTUM/EUR', 'QTUM/USD', 'QTUM/XBT', 'USDT/USD', 'ETC/ETH', 'ETC/XBT', 'ETC/EUR', 'ETC/USD',
        'ETH/XBT', 'ETH/CAD', 'ETH/EUR', 'ETH/GBP', 'ETH/JPY', 'ETH/USD', 'LTC/XBT', 'LTC/EUR',
        'LTC/USD', 'MLN/ETH', 'MLN/XBT', 'REP/ETH', 'REP/XBT', 'REP/EUR', 'REP/USD', 'STR/EUR',
        'STR/USD', 'XBT/CAD', 'XBT/EUR', 'XBT/GBP', 'XBT/JPY', 'XBT/USD', 'BTC/CAD', 'BTC/EUR',
        'BTC/GBP', 'BTC/JPY', 'BTC/USD', 'XDG/XBT', 'XLM/XBT', 'DOGE/XBT', 'STR/XBT', 'XLM/EUR',
        'XLM/USD', 'XMR/XBT', 'XMR/EUR', 'XMR/USD', 'XRP/XBT', 'XRP/CAD', 'XRP/EUR', 'XRP/JPY',
        'XRP/USD', 'ZEC/XBT', 'ZEC/EUR', 'ZEC/JPY', 'ZEC/USD', 'XTZ/CAD', 'XTZ/ETH', 'XTZ/EUR',
        'XTZ/USD', 'XTZ/XBT',
    ];

    public constructor() {
    }

    public getData(symbolPairs: string[]): Observable<KrakenMessage>  {
        return Observable.create(observer => {
            const socket: WebSocket = new WebSocket('wss://ws.kraken.com');
            socket.onmessage = (event) => {
              const krakenMsg: KrakenMessage = JSON.parse(event.data);
              observer.next(krakenMsg);
            };
            socket.onopen = (event) => {
              socket.send(JSON.stringify({
                'event': 'subscribe',
                'pair': symbolPairs,
                'subscription': {
                  'name': 'ticker'
                }
              }));
            };

            socket.onclose = (event) => {
              observer.complete();
            };
        });
    }
}