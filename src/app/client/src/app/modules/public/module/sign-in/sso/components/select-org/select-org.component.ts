import { first } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormService } from '@sunbird/core';
import { ActivatedRoute } from '@angular/router';
import { TenantService } from '@sunbird/core';
import { ResourceService, NavigationHelperService } from '@sunbird/shared';
import { get } from 'lodash-es';
@Component({
  templateUrl: './select-org.component.html',
  styleUrls: ['./select-org.component.scss']
})
export class SelectOrgComponent implements OnInit, AfterViewInit {
  public selectedOrg: any;
  public orgList: Array<any>;
  public tempOrgList: Array<any>;
  public errorUrl = '/sso/sign-in/error';
  public telemetryImpression;
  public tenantInfo: any = {};
  public disableSubmitBtn = true;
  public submitOrgInteractEdata;
  enableSSO = (<HTMLInputElement>document.getElementById('enableSSO'))
    ? (<HTMLInputElement>document.getElementById('enableSSO')).value || 'true' : 'true';
  isIOSDevice = false;

  constructor(private formService: FormService, public activatedRoute: ActivatedRoute, private tenantService: TenantService,
    public resourceService: ResourceService, public navigationhelperService: NavigationHelperService) { }

  ngOnInit() {
    this.isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    this.setTenantInfo();
    this.setTelemetryData();
    this.setRedirectUriCookie();

    let itemsToRemoveForSSO = ["State Tamil Nadu", "State Himachal Pradesh", "State Gujarat"];
    // this.getSsoOrgList().subscribe(formData => this.tempOrgList = formData,
    //   error => console.log('no org configured in form')); // show toaster message
    // this.orgList = this.tempOrgList.filter(item => !itemsToRemoveForSSO.includes(item.name));
    
    this.getSsoOrgList().subscribe((formData: any) => {
      this.tempOrgList = formData;
      this.orgList = this.tempOrgList?.filter(item => !itemsToRemoveForSSO.includes(item?.name));
    },
    (error: any) => {
      console.log('no org configured in form', error);
    })
  }
  private setTenantInfo() {
    this.tenantService.tenantData$.pipe(first()).subscribe(data => {
      if (!data.err) {
        this.tenantInfo = {
          logo: data.tenantData.logo,
          tenantName: data.tenantData.titleName
        };
      }
    });
  }
  public handleOrgChange(event) {
    if (this.isIOSDevice) {
      this.selectedOrg = event.target.value;
    }
    this.disableSubmitBtn = false;
  }
  private getSsoOrgList() {
    const formServiceInputParams = {
      formType: 'organization',
      formAction: 'sign-in',
      contentType: 'organization'
    };
    return this.formService.getFormConfig(formServiceInputParams);
  }
  public handleOrgSelection(event) {
    window.location.href = this.selectedOrg;
  }

  ngAfterViewInit () {
    setTimeout(() => {
      this.telemetryImpression = {
        context: {
          env: this.activatedRoute.snapshot.data.telemetry.env,
        },
        edata: {
          type: this.activatedRoute.snapshot.data.telemetry.type,
          pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
          uri: this.activatedRoute.snapshot.data.telemetry.uri,
          duration: this.navigationhelperService.getPageLoadTime()
        }
      };
    });
  }

  private setTelemetryData() {
    this.submitOrgInteractEdata = {
      id: 'submit-org',
      type: 'click',
      pageid: 'sso-sign-in',
    };
  }
  private setRedirectUriCookie() {
    const redirectUri = get(this.activatedRoute, 'snapshot.queryParams.redirect_uri');
    if (redirectUri) { document.cookie = `SSO_REDIRECT_URI=${redirectUri}; path=/`; }
  }
}
