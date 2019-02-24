import { SubscriptionStatus, Tick } from '../interfaces/kraken-message.interface';
import { ShiftingBuffer } from '../types/shifting-buffer';

export class TickRepository {
    private channelSymbolMapping: { [key: number]: string };
    private symbolRepository: { [key: string]: ShiftingBuffer<number> };
    private maxRepositorySize: number;

    public constructor(maxRepositorySize: number) {
        this.maxRepositorySize = maxRepositorySize;
        this.channelSymbolMapping = {};
        this.symbolRepository = {};
    }

    public defineSubscriptionChannel(status: SubscriptionStatus): void {
        const channelKey = status.channelID;
        const symbol = status.pair;
        this.channelSymbolMapping[channelKey] = symbol;
    }

    public addTick(tick: Tick): void {
        const channel = tick[0];
        const tickerData = tick[1];
        const symbol = this.channelSymbolMapping[channel];
        const buffer = this.symbolRepository[symbol] || new ShiftingBuffer(this.maxRepositorySize);
        const price = parseFloat(tickerData.c[0]);

        buffer.push(price);
        this.symbolRepository[symbol] = buffer;
    }

    public getTickData(symbol: string): number[] {
        if (!!this.symbolRepository[symbol]) {
            return this.symbolRepository[symbol].toArray();
        }

        return [];
    }
}