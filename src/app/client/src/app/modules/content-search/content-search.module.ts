import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultComponent, SearchFilterComponent, PageSectionComponent,
  TopicPickerComponent, DataDrivenFilterComponent, ViewAllComponent, GlobalSearchFilterComponent, GlobalSearchSelectedFilterComponent, GlobalSearchFilterNcertComponent } from './components';
import { SharedModule } from '@sunbird/shared';
import {
  SuiModalModule, SuiProgressModule, SuiAccordionModule,
  SuiTabsModule, SuiSelectModule, SuiDimmerModule, SuiCollapseModule, SuiDropdownModule
} from 'ng2-semantic-ui-v9';
import { TelemetryModule } from '@sunbird/telemetry';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonConsumptionModule } from '@dicdikshaorg/common-consumption';
import { SlickModule } from 'ngx-slick';
import { RouterModule } from '@angular/router';
import { SharedFeatureModule } from '@sunbird/shared-feature';
import { TranslateModule } from '@ngx-translate/core';
import { SbSearchFilterModule } from '@dicdikshaorg/common-form-elements';

@NgModule({
  declarations: [NoResultComponent, SearchFilterComponent, PageSectionComponent,
    TopicPickerComponent, DataDrivenFilterComponent, ViewAllComponent, GlobalSearchFilterComponent, GlobalSearchSelectedFilterComponent, GlobalSearchFilterNcertComponent],
    imports: [
        SharedFeatureModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TelemetryModule,
        CommonModule,
        SlickModule,
        CommonConsumptionModule,
        SharedModule,
        TranslateModule,
        SuiModalModule, SuiProgressModule, SuiAccordionModule,
        SuiTabsModule, SuiSelectModule, SuiDimmerModule, SuiCollapseModule, SuiDropdownModule, SbSearchFilterModule,
    ],
  exports: [NoResultComponent, SearchFilterComponent, PageSectionComponent,
    TopicPickerComponent, DataDrivenFilterComponent, ViewAllComponent, GlobalSearchFilterComponent, GlobalSearchSelectedFilterComponent, GlobalSearchFilterNcertComponent]
})
export class ContentSearchModule { }
