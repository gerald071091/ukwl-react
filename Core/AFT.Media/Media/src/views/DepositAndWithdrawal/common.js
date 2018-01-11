/**
 * Created by gian.jamisola on 5/30/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: "Deposits & Withdrawals",
    netellerMarkup: `<a class="a-1" href="https://www.neteller.com/" target="_blank"><img
                    class="img-1"
                    src="https://cdn.media-ukwl.tgpgroup.com/images/depositwithdrawal/dep-img-8.gif"
                    alt/></a>
                <p><strong>NETELLER</strong> is an e-wallet that offers fast, simple and secure online
                    payments. Transfer funds from your bank account or use a credit or debit card to pay
                    into your e-wallet which can be used to pay for products and services online. You
                    can also use your e-wallet to accept payments. </p><br />
                <p>Deposits into your account can be made instantly from an existing Neteller account or
                    you can set one up by clicking <a href="https://www.neteller.com/home/index.jsf"
                                                      target="_blank"> here</a>. </p><br />`,
    skrillMarkup: `<a class="a-1" href="https://www.skrill.com/" target="_blank"><img class="img-1" src="https://cdn.media-ukwl.tgpgroup.com/images/depositwithdrawal/dep-img-1.gif" alt /></a>
                <p><strong>Skrill </strong>is an E-Wallet that offers fast,  simple and secure online payments. Transfer funds from your bank account or use  a credit or debit card to pay into your e-wallet which can then be used to pay  for products and services online. You can also use your e-wallet to accept  payments. </p><br />
                <p>Skrill account holders are identified by email  address and not by name. </p><br />
                <p><strong>Please note that your payment will only be  authorised if your email address registered with Skrill matches exactly the  email address registered to your account. </strong> </p><br />
                <p>Deposits into your account can be made instantly  from an existing Skrill account or you can set one up by clicking <a href="http://www.moneybookers.com/" target="_blank">here</a>.</p>
                <br />`,
    worldpayMarkup: `<div class="div-anchor">
                    <img class="img-1" src="https://cdn.media-ukwl.tgpgroup.com/images/depositwithdrawal/dep-img-2.gif" alt />
                    <img class="img-1" src="https://cdn.media-ukwl.tgpgroup.com/images/depositwithdrawal/dep-img-3.gif" alt />
                    <img class="img-1" src="https://cdn.media-ukwl.tgpgroup.com/images/depositwithdrawal/dep-img-4.gif" alt />
                    <img class="img-1" src="https://cdn.media-ukwl.tgpgroup.com/images/depositwithdrawal/dep-img-5.gif" alt />
                    <img class="img-1" src="https://cdn.media-ukwl.tgpgroup.com/images/depositwithdrawal/dep-img-6.gif" alt />
                </div>
                <p>The fastest deposit method is by secure online  payment using a UK debit or credit card. </p>
                <p>You will be required to enter your CVV number (the  three digits on the reverse of your card) and you may be asked to complete a  3DSecure (3DS) questionnaire. 3DS helps prevent your card from being used  without your permission and will only take a few seconds.&nbsp; We recommend  that you use the ‘Greeting’ or ‘Notes’ Field on the 3DS screen to add a prompt  which will help you remember your password. </p><br />
                <p>Please note that your CVV number and 3DS will not  be stored in our system, as you are to be required to follow the same security  process every time you make a deposit.</p><br />
                <p>If you deposit using a Corporate Card, non-UK  registered Card or a MasterCard we may not be able to send your withdrawal  request back to the same card.&nbsp; Under these circumstances Customer  Services will make arrangements with you to send the payment by alternative  means. </p><br />`,
    withdrawalMarkup: `<p>Withdrawal payments are made to the original method  of deposit and we aim to process your requests as quickly and efficiently as  possible.&nbsp; </p><br />
                <div>
                    <div>
                        <div class="col-xs-6" style="padding: 0">
                            <strong class="col-xs-3" style="padding: 0">MIN</strong><strong class="col-xs-3" style="padding: 0">MAX</strong>
                        </div>
                        <div class="col-xs-6" style="clear:both;padding: 0">
                            <div class="col-xs-3" style="padding-left: 0">
                                <span>£5.00</span><br />
                                <span>€5.00</span><br />
                                <span>$5.00</span><br />
                            </div>
                            <div class="col-xs-9" style="padding-left: 0">
                                <span>£5000.00 per day</span><br />
                                <span>€5000.00 per day</span><br />
                                <span>$5000.00 per day</span><br />
                            </div>
                        </div>
                    </div>
                </div>
                <br style="clear: both" />
                <br />
                <p>In accordance with Anti-Money Laundering Regulations  you may be required to submit ID documents for us to verify your identify  before we approve your payment.&nbsp; These documents can be digitally captured  or scanned and emailed to us. </p><br />
                <p>You can rest assured that we will handle your  documentation sensitively and it will be stored securely in accordance with  Data Protection law.&nbsp; </p><br />
                <p>Guidance on documents:</p>
                <p >
                    <strong>1. Valid Photographic ID.</strong><br />
                    We accept valid passports, driving  licences or national ID cards.&nbsp; The signature, name and photograph must be  visible and clear.&nbsp; The four corners of the document must be visible.
                </p>
                <p >
                    <br />
                    <strong>2. Credit/debit cards</strong> <br />
                    We only need to see the first 6 and  last 4 digits on your card number; we recommend you blank out the rest on your  copy as well as the 3 digit CVV code on the back.&nbsp; We need to see the name  on the card, the expiration date and the signature.&nbsp; The four corners of  the card must be visible.
                </p>
                <p >
                    <br />
                    <strong>3. Proof of address</strong><br />
                    We accept bank statements or utility  bills issued within the last 6 months.&nbsp; We are unable to accept mobile  phone bills.&nbsp; The document must be clear and show all four corners.
                </p>
                <br />
                <p>On occasion you may be asked to send us further  verification documents.&nbsp; If you have any queries about this or what will  be required please contact Customer Services.</p>`
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;