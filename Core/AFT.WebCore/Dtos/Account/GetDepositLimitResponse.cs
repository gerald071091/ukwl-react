using System;

namespace AFT.WebCore.Dtos.Account
{
    public class GetDepositLimitResponse : ApiResponse
    {
        public decimal DayLimit { get; set; }
        public decimal WeekLimit { get; set; }
        public decimal MonthLimit { get; set; }
        public DateTime CoolDownEndTime { get; set; }
        public bool IsEditable { get; set; }

        public PendingDepositLimitChangeModel PendingChange { get; set; }

        public class PendingDepositLimitChangeModel
        {
            public string ChangeType { get; set; }
            public decimal NewLimit { get; set; }
            public bool CanConfirm { get; set; }
            public string CooldownText { get; set; }
        }

    }
}