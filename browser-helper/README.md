# Apply Desk browser helper

This optional Chrome Manifest V3 extension captures visible job-page text into the Apply Desk, logs an open email you explicitly choose, and fills blank form fields it can confidently identify from your local profile. It asks for access only to the active tab after you click a button. It does not run in the background, poll your inbox, upload data, or submit applications.

## Install in Chrome

1. Download this repository or its `browser-helper` folder to your computer.
2. Open `chrome://extensions`, enable **Developer mode**, choose **Load unpacked**, and select this folder.
3. Open the extension’s **Details → Extension options** and check your contact details.
4. On a job page, click the extension and choose **Capture this job**. Review the captured text in Apply Desk, then analyze and save it.
5. In Gmail, open a job-related message and choose **Log this email** to add a reply signal to the tracker. This is an on-demand capture; inbox-wide sync is not enabled.
6. On an application form, choose **Fill known fields**, review every value, attach the tailored resume yourself, and submit only after checking the entire application.

The extension deliberately leaves custom questions unanswered and never clicks Submit. Job application websites use different form structures and may ask for legally significant or sensitive information that cannot safely be inferred from a resume.

## Privacy and limitations

The profile lives in Chrome extension storage on this device. Captured page text and message snippets are sent to the Apply Desk URL in a fragment for prefilling; URL fragments are not sent to the web server, but the text is visible in the opened tab until the app removes the fragment. Applications, notes, and captured message snippets stay in local browser storage. Automatic Gmail sync is not available in this workspace; the Gmail connector is disabled, and a personal Gmail API setup would need OAuth credentials and your connection consent.
