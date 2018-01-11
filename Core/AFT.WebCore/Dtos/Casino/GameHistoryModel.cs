namespace AFT.WebCore.Dtos.Casino
{
    public class GameHistoryModel
    {
        /// <summary>
        /// Game name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Date of bet
        /// </summary>
        public string BetDate { get; set; }

        /// <summary>
        /// Total number of bets count in period of time
        /// </summary>
        public decimal BetCount { get; set; }

        /// <summary>
        /// Total amount of bets count in period of time
        /// </summary>
        public decimal BetAmount { get; set; }

        /// <summary>
        /// Total win/loss amount of bets count in period of time
        /// </summary>
        public decimal WinLoss { get; set; }
    }
}