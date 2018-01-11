using System;
using System.Diagnostics.CodeAnalysis;

namespace AFT.WebCore.Exceptions
{
    [ExcludeFromCodeCoverage]
    [Serializable]
    public class SingleLoginSessionException : Exception
    {
        public SingleLoginSessionException()
        {
        }

        public SingleLoginSessionException(string message)
            : base(message)
        {
        }

        public SingleLoginSessionException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}