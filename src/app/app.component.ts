import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { KrakenService } from './services/kraken.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { TickRepository } from './types/tick-repository';
import { ConnectionStatus, SubscriptionStatus, HeartBeat, Tick } from './interfaces/kraken-message.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  title = 'app';
  subscription: Subscription;
  pairs: string[] = [ 'XBT/EUR', 'ETH/EUR' ];
  ticks: TickRepository;
  tableData: { [key: string]: number[]; } = {};

  public constructor(
    private krakenService: KrakenService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.ticks = new TickRepository(5);
    this.subscription = this.krakenService.getData(this.pairs).subscribe(data => {
      const plainData: any = data;

      if (!plainData.event) {
        const tick: Tick = data as Tick;
        this.ticks.addTick(tick);
      } else if (plainData.event === 'subscriptionStatus') {
        const channelData: SubscriptionStatus = data as SubscriptionStatus;
        this.ticks.defineSubscriptionChannel(channelData);
      }

      this.pairs.forEach(pair => {
        this.tableData[pair] = this.ticks.getTickData(pair);
      });

      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
