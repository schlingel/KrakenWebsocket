export interface ConnectionStatus {
    event: 'systemStatus';
    connectionID: number;
    status: string;
    version: string;
}

export interface SubscriptionStatus {
    event: 'subscriptionStatus';
    channelID: number;
    pair: string;
    status: string;
    subscription: { [key: string]: string };
}

export interface HeartBeat {
    event: 'heartbeat';
}

export interface TickerData {
    a: [string, number, string];
    b: [string, number, string];
    c: [string, string];
    v: [string, string];
    p: [string, string];
    t: [number, number];
    l: [string, string];
    h: [string, string];
    o: [string, string];
}

export type Tick = [number, TickerData];

export type KrakenMessage = ConnectionStatus | SubscriptionStatus | HeartBeat | Tick;
