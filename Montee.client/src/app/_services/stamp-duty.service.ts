import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StampDutyService {
  
  calculateStampDuty(price: number, reason: string, isCurrentRate: boolean): number {
    if (isCurrentRate) {
      if (reason === 'firstTimeBuyer') {
        if (price <= 425000) return 0;
        if (price <= 625000) return (price - 425000) * 0.05;
        return 10000 + (price - 625000) * 0.1;
      }

      if (reason === 'homeMover') {
        if (price <= 250000) return 0;
        if (price <= 925000) return (price - 250000) * 0.05;
        if (price <= 1500000) return 33750 + (price - 925000) * 0.1;
        return 93750 + (price - 1500000) * 0.12;
      }

      if (reason === 'buyToLet') {
        return this.calculateStampDuty(price, 'homeMover', true) + price * 0.03;
      }
    } else {
      if (reason === 'firstTimeBuyer') {
        if (price <= 300000) return 0;
        return (price - 300000) * 0.05;
      }

      if (reason === 'homeMover') {
        if (price <= 125000) return 0;
        if (price <= 250000) return (price - 125000) * 0.02;
        if (price <= 925000) return 2500 + (price - 250000) * 0.05;
        if (price <= 1500000) return 36250 + (price - 925000) * 0.1;
        return 93750 + (price - 1500000) * 0.12;
      }

      if (reason === 'buyToLet') {
        return this.calculateStampDuty(price, 'homeMover', false) + price * 0.03;
      }
    }

    return 0;
  }
}