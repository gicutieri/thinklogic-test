# Thinklogic Test
Testing scrip designed to verify functionality of the form on the webpage and the back-end data capture.


Created for the purposes of Thinklogic Assesment.


## Instructions

◊ Download and install latest versions of Git and Node.js

◊ Clone repository

    git clone https://github.com/gicutieri/thinklogic-test.git
    cd ./thinklogic-test

◊ Run tests

    npx wdio


## Expected results

![expected results](https://github.com/user-attachments/assets/e609f97d-4d9b-4dee-9f87-56f1e3d2b682)

### claimForm.fullForm
validate all fields are submitted correctly

### claimForm.fill personal data
negative test

personal data is submitted and purchase information is not submitted

error message should be found

### claimForm.fill purchase information
negative test

personal data is not submitted and purchase information is submitted

error message should be found


## Versions used

#### node.js
v23.3.0

#### npm
10.9.0
