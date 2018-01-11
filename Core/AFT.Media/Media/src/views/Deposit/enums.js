/**
 * Created by bernard.molina on 6/14/2017.
 */

class Enums {
	depositButtons() {
		return [
			{
				text:`${window.currencySymbol} 500`,
				value: 500
			},
			{
				text:`${window.currencySymbol} 100`,
				value: 100
			},
			{
				text:`${window.currencySymbol} 50`,
				value: 50
			},
			{
				text:`${window.currencySymbol} 25`,
				value: 25
			}
		];
	}


}

export default new Enums();