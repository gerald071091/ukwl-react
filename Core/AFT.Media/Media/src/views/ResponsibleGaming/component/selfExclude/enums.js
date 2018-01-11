/**
 * Created by gian.jamisola on 5/19/2017.
 */

let duration = [
    {
        text: '6 months',
        value: 180
    },
    {
        text: '1 year',
        value: 365
    },
    {
        text: '5 years',
        value: 1825
    },
    {
        text: 'Permanent',
        value: 18250
    }
];

let brands = [
    {
        id: 1,
        prefix: 'TBT',
        text: '12Bet',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='TBT-container'] input[type='text']").disabled = !isChecked;
            !isChecked && (document.querySelector("div[name='TBT-container'] input[type='text']").value = '')
        }
    },
    {
        id: 2,
        prefix: 'BVS',
        text: 'BetVision',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='BVS-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 3,
        prefix: 'FUN',
        text: 'Fun88',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='FUN-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 4,
        prefix: 'JEN',
        text: 'JenningsBet',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='JEN-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 5,
        prefix: 'SET',
        text: 'SetantaBet',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='SET-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 6,
        prefix: 'TLC',
        text: 'TLCBet',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='TLC-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 7,
        prefix: 'STP',
        text: 'SportPesa',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='STP-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 8,
        prefix: 'BTE',
        text: 'BetEast',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='BTE-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 9,
        prefix: 'OLE',
        text: 'Ole777',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='OLE-container'] input[type='text']").disabled = !isChecked;
        }
    },
    {
        id: 10,
        prefix: 'LET',
        text: 'Letou',
        _onChange: (e) => {
            let isChecked = e.target.checked ? true : false;
            document.querySelector("div[name='LET-container'] input[type='text']").disabled = !isChecked;
        }
    }
];

export default {duration, brands};