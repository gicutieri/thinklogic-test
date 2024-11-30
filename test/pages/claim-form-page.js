//imports
import {$, expect, browser} from "@wdio/globals";
import {faker} from'@faker-js/faker';


class claimformPage {

    //functions to find form fields

    get nameField() {
        return $('//input[@id="c__ClaimantInfo_Name_ee85a0da"]');
    }

    get emailField() {
        return $('#c__ClaimantInfo_Email_ee85a0da');
    }

    get addPurchaseButton() {
        return $('//button[text()="Add A Purchase"]');
        //class name cms-component-411edc1a-button ripple
    }

    get dateField() {
        return $('//input[@type="date"]');
    }

    get stateDropdown() {
        return $("/html//div[@id='contact-form']/div[@class='container']//div[@class='cms-form-app cms-form-app-ee85a0da']/div/div[3]/div/div[1]/div");
    }

    get stateItem() {
        return $('//li[text()="CA"]');
    }

    get attestCheck() {
        return $('//div[@class="cms-component-411edc1a-checkbox"]/div/span');
    }

    get signatureField() {
        return $('#c__Signature_SignatureText_ee85a0da');
    }

    get submitButton() {
        return $('//button[text()="Submit"]');
        //class name cms-component-411edc1a-button ripple
    }

    get validationMessage() {
        return $('#c__formAppee85a0da');
    }
    
    get requiredMessage() {
        //return $('//input[@id="c__ClaimantInfo_Name_ee85a0da" and @aria-errormessage="c__ClaimantInfo_Name_ee85a0da_error"]');
        //return $('/html//div[@id="contact-form"]/div[@class="container"]//div[@class="row-fluid"]/div/span[text()="*requirer"]');
        return $('#c__ClaimantInfo_Name_ee85a0da_error');
    }

    get purchasedMissingMessage() {
        return $('#c__Purchases_ee85a0da_error');
    }


    //get claim form page
    open() {
        return browser.url('/claim-form');
    }


    //wait for 'Date Purchased' field to show up and input value
    async inputDate() {
        await this.dateField.waitForExist();
        await this.dateField.addValue('11/30/2024');
    }


    //wait for 'State Purchased In' field to show up and select first state from dropdown
    async selectState() {
        await this.stateDropdown.waitForExist();
        await this.stateDropdown.click();
        await this.stateItem.waitForExist();
        await this.stateItem.click();
    }


    async addPersonalData() {
        await this.nameField.addValue(faker.person.fullName()); //randomize name
        await this.emailField.addValue(faker.internet.email()); //randomize email
        await this.attestCheck.click(); //attest information submitted
        await this.signatureField.addValue(faker.person.lastName()); //randomize signature
    }


    async addPurchase() {
        await this.addPurchaseButton.click(); //add a purchase
        await this.inputDate();
        await this.selectState(); //selects first state in the list
    }


    //validate all fields
    async fillForm() {
        await this.addPersonalData();
        await this.addPurchase();

        //submit
        await this.submitButton.click();
    }
}

export default new claimformPage();