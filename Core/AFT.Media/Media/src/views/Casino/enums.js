/**
 * Created by gian.jamisola on 5/5/2017.
 */

import iCommon from 'nls/common.js';

class Enums {
    GameCategories() {
        return [
            {
                id: 1,
                name: iCommon('csnAG')
            },
            {
                id: 2,
                name: iCommon('csnTopG')
            },
            {
                id: 3,
                name: iCommon('csnRS')
            },
            {
                id: 4,
                name: iCommon('csnFS')
            },
            {
                id: 5,
                name: iCommon('csnScratch')
            },
            {
                id: 6,
                name: iCommon('csnBJ')
            },
            {
                id: 7,
                name: iCommon('csnCG')
            },
            {
                id: 8,
                name: iCommon('csnFeatured')
            },
            {
                id: 9,
                name: iCommon('csnIG')
            },
            {
                id: 10,
                name: iCommon('csnMG')
            },
            {
                id: 11,
                name: iCommon('csnRoulette')
            },
            {
                id: 12,
                name: iCommon('csnSlots')
            },
            {
                id: 13,
                name: iCommon('csnSG')
            },
            {
                id: 14,
                name: iCommon('csnTblG')
            },
            {
                id: 15,
                name: iCommon('csnVP')
            },
            {
                id: 16,
                name: iCommon('csnBK')
            },
        ];
    }

    GameNames() {
        return [
            {
                id: 1,
                name: iCommon('csnMain')
            },
            {
                id: 2,
                name: iCommon('csnSportsbook')
            },
            {
                id: 3,
                name: iCommon('csnFBetting')
            },
            {
                id: 4,
                name: iCommon('csnMultislots')
            },
            {
                id: 5,
                name: iCommon('csnCasino')
            },
            {
                id: 6,
                name: iCommon('csnPoker')
            },
            {
                id: 7,
                name: iCommon('csn5050')
            }
        ];
    }

    JackpotTickers() {
        return [
                { jackpotID: "1", gameName: "Cash Splash" },
                { jackpotID: "1-5reel", gameName: "Cash Splash 5 Reel" },
                { jackpotID: "2", gameName: "Lots a Loot" },
                { jackpotID: "2-5reel", gameName: "Lots a Loot 5 Reel" },
                //{ jackpotID: "3", gameName: "Wow Pot" },
                { jackpotID: "3-5reel", gameName: "Wow pot 5 Reel" },
                { jackpotID: "4", gameName: "Super jax" },
                { jackpotID: "5", gameName: "Fruit Fiesta" },
                { jackpotID: "5-5reel", gameName: "Fruit Fiesta 5 Reel" },
                //{ jackpotID: "6", gameName: "Treasure Nile" },
                { jackpotID: "7", gameName: "Cyberstud" },
                { jackpotID: "8", gameName: "Jackpot Deuces" },
                { jackpotID: "9", gameName: "Triple Sevens" },
                { jackpotID: "10", gameName: "Major Millions" },
                { jackpotID: "10-5reel", gameName: "Major Millions 5 Reel" },
                { jackpotID: "10-mspin", gameName: "Major Millions Mega Spin" },
                { jackpotID: "11", gameName: "Roulette Royale" },
                { jackpotID: "12", gameName: "King Cashalot" },
                { jackpotID: "13", gameName: "Tunzamunni" },
                { jackpotID: "14", gameName: "Poker Ride" },
                { jackpotID: "15", gameName: "Mega Moolah Mega" },
                { jackpotID: "15-5reel", gameName: "MM 5 Reel Mega" },
                { jackpotID: "15-summer", gameName: "MM Summertime Mega" },
                { jackpotID: "15-isis", gameName: "MM Isis Mega" },
                { jackpotID: "15-tdk", gameName: "The Dark Knight (Mega)" },
                { jackpotID: "16", gameName: "Mega Moolah Major" },
                { jackpotID: "16-5reel", gameName: "MM 5 Reel Major" },
                { jackpotID: "16-summer", gameName: "MM Summertime Major" },
                { jackpotID: "16-isis", gameName: "MM Isis Major" },
                { jackpotID: "16-tdk", gameName: "The Dark Knight (Major)" },
                { jackpotID: "17", gameName: "Mega Moolah Minor" },
                { jackpotID: "17-5reel", gameName: "MM 5 Reel Minor" },
                { jackpotID: "17-summer", gameName: "MM Summertime Minor" },
                { jackpotID: "17-isis", gameName: "MM Isis Minor" },
                { jackpotID: "17-tdk", gameName: "The Dark Knight (Minor)" },
                { jackpotID: "18", gameName: "Mega Moolah Mini" },
                { jackpotID: "18-5reel", gameName: "MM 5 Reel Mini" },
                { jackpotID: "18-summer", gameName: "MM Summertime Mini" },
                { jackpotID: "18-isis", gameName: "MM Isis Mini" },
                { jackpotID: "18-tdk", gameName: "The Dark Knight (Mini)" },
                { jackpotID: "19", gameName: "Caribbean Draw" },

                //TEMPORARY
                { jackpotID: "3", gameName: "Black Jack Single Deck" },
                { jackpotID: "6", gameName: "Roulette" }
        ];
    }

    GameProviders() {
        return [
            {
                id: 1,
                name: iCommon('csnAmaya')
            },
            {
                id: 2,
                name: iCommon('csnQF')
            },
            {
                id: 3,
                name: iCommon('csnRSG')
            },
            {
                id: 4,
                name: iCommon('')
            },
            {
                id: 5,
                name: iCommon('')
            }
        ];
    }
}

export default new Enums();