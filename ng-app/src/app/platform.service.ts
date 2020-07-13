import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  isBrowser: boolean;
  platformId;

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.platformId = platformId;
    this.isBrowser = isPlatformBrowser(platformId);
  }

  isBrowserCheck(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else {
      return false;
    }
  }
}
