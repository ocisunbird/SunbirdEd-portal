import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-webview',
  templateUrl: './webview.component.html',
  styleUrls: ['./webview.component.scss']
})
export class WebviewComponent implements OnInit {
  
  // @Input() portalUrl: any;
  sanatizedUrl: any;
  loading: boolean = true;
  currentSiteUrl: string = '';
  
  constructor(
    public modalRef: BsModalRef,
    public sanatizer: DomSanitizer
  )
  {
    this.currentSiteUrl = localStorage.getItem('siteUrl');
    this.getUrl(this.currentSiteUrl);
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  getUrl(url: any) {
    this.sanatizedUrl = this.sanatizer.bypassSecurityTrustResourceUrl(url);
    return this.sanatizedUrl;
  }
  
  closeModal() {
    localStorage.removeItem('siteUrl');
    this.modalRef.hide();
  }

}
