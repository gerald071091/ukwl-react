/**
 * Created by gian.jamisola on 6/8/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: "Cash Out",
    cashoutMarkup: `<div class="primary-content">
    <p><b>Want to take full control of your bets?</b></p>
    <p>Our new Partial Cash Out feature is the perfect way to do it! Cash Out and collect 100% of your cash out offer early or select exactly how much you want to take out of your potential winnings…</p>
    <p>Just use the mini-slider to set how much of your bet you cash out and how much will stay active.</p>
    <p>The slider allows you to cash out a portion of your cash out offer, and let the remaining part of your Single or Accumulator bet continue at the new odds.</p>
    <p>You can enjoy an early payout on several sports, football is just one of the Cash Out highlights – this special option is also available on tennis, basketball, ice hockey, American football, baseball and many other sports!</p>

    <p>
        <strong>How to make a Full Cash out:</strong><br />
    </p>

    <ol style="text-transform:none;list-style-type: decimal;margin-left: 2em;">
        <li> Place a Single or Accumulator (Acca) bet on a pre-match or live event.</li>
        <li> Go to the ‘My Bets' tab on the Betting Slip.</li>
        <li> Note the current Cash Out value of your bets.</li>
        <li> Take your return by clicking on the <strong>Cash Out</strong> button and confirming your Cash Out amount.</li>
    </ol>

    <p>
        <strong>How to make a Partial Cash Out:</strong><br />
    </p>
    <ol style="text-transform:none;list-style-type: decimal;margin-left: 2em;">
        <li> Place a single or Accumulator (Acca) bet on a pre-match or live event.</li>
        <li> Go to the ‘My Bets' tab and click on the <strong>mini-slider button</strong>.</li>
        <li> Use the Slider to Cash Out the exact amount you want, leaving the remainder to run as a new bet at the new website odds.</li>
        <li> If in a profitable position you can use the <strong>Bank My Stake</strong> button to take your stake back, leaving the profit to run as a new bet at the new website odds.</li>
    </ol>

    <p>Cashing out your bet could not be easier!</p>
    <p><em>* Cash Out and Partial Cash Out is available for pre-live and live markets and applicable for Single and Acca Bets.</em></p>
    <br />

    <img src=${window.cmsMedia("Content/images/cashout/bvs.jpg")} />`,
    rulesMarkup: `<div> <h3 class="titles section-title mainTitle">Rules</h3>
    <section class="format">
        <ul class="{0}">
            <li>These Cash Out Terms are  inseparably linked to our Terms &amp; Conditions, of which they form a part,  and acceptance of these Cash Out Terms is a prerequisite to account  registration. Any capitalized terms used herein which are not defined shall  take their meaning from the Terms &amp; Conditions.</li>
            <li>By Cashing Out, you are  agreeing to close your bet at the amount offered to you. Once you have Cashed Out,  the amount you have received for the bet will not change, irrespective of  whether the remaining selections subsequently win, lose or do not compete.</li>
            <li>The amount you are offered to  Cash Out is based on your original bet, the status of any selections which have  already completed, and the current market price(s) of your unsettled  selection(s). This may be greater than or less than your original stake.</li>
            <li>After choosing to Cash Out any  bet, the confirmation screen which then appears will display the newly updated  value and therefore may have changed from that shown in the Cash Out Statement  page. The value displayed in the confirmation screen will be the actual amount  offered to you, and will supersede any amount previously displayed in the Cash  Out Statement page.</li>
            <li>If you choose to take the  offer, the Cash Out request will be subject to a five-second delay if any of  your selections involved in your Cash Out are currently in play.</li>
            <li>Cash Out / Partial Cash Out is  available for pre-live and live markets and applicable for Single Bets and ACCA  Bets, excluding System Bets.</li>
            <li>Cash Out is not available on  Forecast/Tricast Bets.</li>
            <li>We cannot guarantee Cash Out on  all multiple bets.</li>
            <li>Partial Cash Out shall only be  available in circumstances where the full Cash Out offer, for the bet subject of  the partial Cash Out, is greater than twice the minimum bet amount permitted  for that particular bet.</li>
            <li>The minimum Partial Cash Out  amount is equal to the minimum bet permitted for that particular bet.</li>
            <li>The maximum Partial Cash Out  amount shall be the full Cash Out amount minus the minimum bet amount permitted  for that particular bet.</li>
            <li>Acca Bets, placed together with  System Bets via the 'Multiples&rsquo; section, cannot be the subject of a Cash Out or  Partial Cash Out.</li>
            <li>When a Customer undertakes a  Partial Cash Out, the remaining bet amount (ie the initial bet amount minus  Partial Cash Out Amount) is placed as a new bet at the odds current at the time  of the Partial Cash Out.</li>
            <li>In the case of a Partial Cash Out  of an Acca Bet, where one or more of the lines has already been settled, the  new bet is placed on the remaining open lines at the current odds.</li>
            <li>We provide no guarantee that  the Cash Out or Partial Cash Out facility will be available for a specific  market or Customer.</li>
            <li>Cash Out / Partial Cash Out  offers are available only within a specific time frame- any changes in the  price or market during this time may result in a new Cash Out offer or in the  suspension/removal of the Cash Out facility.</li>
            <li>Cashed Out and Partial Cashed  Out bets will be considered and shown as settled, the outcome of the final  market is not correlated with the bet settlement.</li>
            <li>After completing the Cash Out /  Partial Cash Out process, the funds will be returned to your Account  immediately. Your bet will be settled and the final outcome of your bet will  have no effect on the amount returned to your Account.</li>
            <li>Cashed Out or Partial Cashed  Out bets shall not contribute to meeting the rollover requirements of any  Sports promotion.</li>
            <li>Any offers (e.g. Accumulator  insurance), bonuses or consolations (e.g. on a Lucky15) will not apply where a  customer has taken Cash Out or Partial Cash Out.</li>
            <li>Bets placed using a Free Bet  cannot be the subject of a Cash Out or or Partial Cash Out.</li>
            <li>Cash Out and Partial Cash Out  applies to Desktop and Mobile sites.</li>
            <li>@CMS.SiteName reserves the  right, at its sole discretion to suspend or disable the Cash Out and/or Partial  Cash Out feature at any time.</li>
            <li>If you choose not to Cash Out  or you are unable to Cash Out, your bet will be settled based on the outcome of  the completed event(s).</li>
            <li>If for any reason there is an  obvious error in a bet price being displayed, any bet taken at this price  including multiples will be deemed void. Should this situation arise, any Cash  Out / Partial Cash Out transaction made on such a bet will also be deemed void.</li>

        </ul>
    </section></div>`
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;