using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Diagnostics;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Web.Http;

using AFT.WebCore.Filters;

using Common.Logging;


namespace AFT.WebCore.Api
{
    [ExcludeFromCodeCoverage]
    [ValidateSingleLogin]
    public abstract class ApiBase : ApiController
    {
        protected string CultureCode
        {
            get { return CultureInfo.CurrentCulture.Name.ToLower(); }
        }

        protected ILog Log = LogManager.GetLogger("WhitelabelApi");

#if DEBUG || QA || STAGING
        #region api execution performance test

        private readonly Dictionary<string, decimal> _counters;
        private readonly Stopwatch _stopWatch;
        private string _currentLabel;
        private string _apiInstance;

        protected ApiBase()
        {
            _counters = new Dictionary<string, decimal>();
            _stopWatch = new Stopwatch();
        }

        /// <summary>
        /// Start timer when method is executed/called.
        /// </summary>
        /// <param name="label"></param>
        public void WatchApiExecution(string label, object api)
        {
            if (_currentLabel != null)
            {
                StopTimer();
            }

            _currentLabel = label;
            _apiInstance = api.GetType().Name;
            if (!_counters.ContainsKey(label))
            {
                _counters.Add(label, 0);
            }

            _stopWatch.Restart();
        }

        /// <summary>
        /// Stop the timer upon method execution end.
        /// </summary>
        public void LogApiExecutionTimeEstimate()
        {
            if (_currentLabel != null)
            {
                StopTimer();
            }

            foreach (KeyValuePair<string, decimal> kvp in _counters)
            {
                Log.Info(string.Format("Api: {0,-20} Method called: {1,-20} Elapsed time: {2,4:N0} sec(s)",
                    _apiInstance, kvp.Key, (kvp.Value).ToString("F")));
            }
        }

        /// <summary>
        /// Stop the timer upon method with Exception execution end.
        /// </summary>
        /// <param name="ex"></param>
        public void LogApiExecutionTimeEstimate(Exception ex)
        {
            if (_currentLabel != null)
            {
                StopTimer();
            }

            foreach (KeyValuePair<string, decimal> kvp in _counters)
            {
                Log.Info(string.Format("Api: {0,-20} Method called: {1,-20} Elapsed time: {2,4:N0} sec(s) Exception: {3}",
                    _apiInstance, kvp.Key, (kvp.Value).ToString("F"), ex));
            }
        }

        /// <summary>
        /// Get the name of executed method.
        /// </summary>
        /// <returns>the name of executed method</returns>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public string MethodName()
        {
            StackTrace st = new StackTrace();
            StackFrame sf = st.GetFrame(1);

            return sf.GetMethod().Name;
        }

        private void StopTimer()
        {
            if (_currentLabel == null)
            {
                Log.Info("No counter starter");
            }

            _stopWatch.Stop();
            _counters[_currentLabel] += Convert.ToDecimal(_stopWatch.Elapsed.TotalSeconds);
            _currentLabel = null;
        }

        #endregion
#endif
    }
}