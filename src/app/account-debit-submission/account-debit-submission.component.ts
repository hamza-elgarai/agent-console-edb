import { Component } from '@angular/core';

@Component({
  selector: 'app-account-debit-submission',
  templateUrl: './account-debit-submission.component.html',
  styleUrls: ['./account-debit-submission.component.css'],
})
export class AccountDebitSubmissionComponent {
  showCard = false;

  benificiaryExists: string = 'yes';
  disableTextFields: boolean = true;
  disableDropDownChooseBenificiary: boolean = false;

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleVisibilityOfTextFields() {
    if (this.benificiaryExists === 'yes') {
      this.disableTextFields = true; // Disable the text field if "Yes" is selected
      this.disableDropDownChooseBenificiary = false;
    } else if (this.benificiaryExists === 'no') {
      this.disableTextFields = false; // Enable the text field if "No" is selected
      this.disableDropDownChooseBenificiary = true;
    }
  }

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleCard() {
    console.log('toggleCard');

    this.showCard = !this.showCard;
  }
}
