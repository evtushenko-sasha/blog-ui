import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSelect, ModalController, NavParams} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TagService} from '../../service/tag.service';
import {Observable} from 'rxjs';
import {Tag} from '../../model/Tag';

@Component({
  selector: 'app-model-filters',
  templateUrl: './modal-filters-page.component.html',
  styleUrls: ['./modal-filters-page.component.scss'],
})
export class ModalFiltersPage implements OnInit {

  @ViewChild(IonSelect, {static: false}) tagsFilters: IonSelect;

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder,
              private tagService: TagService,
              private navParams: NavParams) {
    this.filtersFormGroup = this.formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
      tagIds: [null]
    });
    this.selectedDateFrom = this.navParams.data.selectedDateFrom;
    this.selectedDateTo = this.navParams.data.selectedDateTo;
    this.selectedTagsIds = this.navParams.data.selectedTagsIds;
    this.tags = tagService.getTags();
    if (this.selectedDateFrom != null) {
      this.selectedDateFrom = this.selectedDateFrom.toString();
    }
    if (this.selectedDateTo != null) {
      this.selectedDateTo = this.selectedDateTo.toString();
    }

  }

  private filtersFormGroup: FormGroup;
  private tags: Observable<Tag[]>;
  private selectedTagsIds: Observable<number[]>;
  private selectedDateFrom;
  private selectedDateTo;


  ngOnInit() {


    // const tagsFilters = document.getElementById('tagsFilters');
    //
    // tagsFilters.compareWith = compareWith;
    //
    // this.tags.subscribe(el => {
    //   el.forEach((option, i) => {
    //     const selectOption = document.createElement('ion-select-option');
    //     selectOption.value = option;
    //     selectOption.textContent = option.title;
    //
    //     tagsFilters.appendChild(selectOption);
    //   });
    //
    //   this.selectedTags.subscribe(selected => {
    //     tagsFilters.value = selected;
    //   });
    // });
  }

  compareWithFn(o1, o2) {
    return o1 === o2;
  }

  close() {
    this.modalController.dismiss({
      update: false
    });
  }

  apply() {
    this.modalController.dismiss({
      selectedDateFrom: new Date(this.selectedDateFrom),
      selectedDateTo: new Date(this.selectedDateTo),
      selectedTagsIds: this.filtersFormGroup.get('tagIds').value
    });
  }

  async tagsUpdate(event) {
    this.selectedTagsIds = new Observable<number[]>(subscriber => {
      subscriber.next(event.target.value);
    });

    this.selectedTagsIds.subscribe(el => {
      this.tagsFilters.value = el;
    });
  }

  dateChanged(event) {
  }
}
