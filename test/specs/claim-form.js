//imports
import {$, expect, browser} from "@wdio/globals";
import {faker} from'@faker-js/faker';
import claimformPage from "../pages/claim-form-page";


describe('claimForm', () => {

    //reset main page before each test case
    beforeEach(async () =>{
        await claimformPage.open();
    })

    //validate all fields are submitted correctly
    it('fullForm', async () => {
        await claimformPage.fillForm();
        await expect(claimformPage.validationMessage).toHaveText('Your claim has been submitted.');
    });

    it('fill personal data', async () => {
        await claimformPage.addPersonalData();
        await claimformPage.submitButton.click();
        await expect(claimformPage.purchasedMissingMessage).toExist();
    });

    it('fill purchase information', async () => {
        await claimformPage.addPurchase();
        await claimformPage.submitButton.click();
        await expect(claimformPage.requiredMessage).toExist();
    });
});