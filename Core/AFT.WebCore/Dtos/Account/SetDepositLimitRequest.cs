namespace AFT.WebCore.Dtos.Account
{
    public class SetDepositLimitRequest
    {
        public decimal DayLimit { get; set; }
        public decimal WeekLimit { get; set; }
        public decimal MonthLimit { get; set; }
    }
}