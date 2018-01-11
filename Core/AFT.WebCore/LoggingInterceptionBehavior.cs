using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using Common.Logging;
using Microsoft.Practices.Unity.InterceptionExtension;
using RestSharp;

namespace AFT.WebCore
{
    [ExcludeFromCodeCoverage]
    internal class LoggingInterceptionBehavior : IInterceptionBehavior
    {
        protected ILog Log = LogManager.GetLogger("ApiProxy");

        public IMethodReturn Invoke(IMethodInvocation input, GetNextInterceptionBehaviorDelegate getNext)
        {
            if (input.MethodBase.Name != "Execute")
            {
                return getNext()(input, getNext);
            }

            var sb = new StringBuilder();

            try
            {
                var request = input.Arguments["request"] as IRestRequest;

                if (request == null)
                {
                    return getNext()(input, getNext);
                }

                AppendRequestLog(request, sb);

                IMethodReturn result = getNext()(input, getNext);

                var response = result.ReturnValue as IRestResponse;

                AppendResponseLog(response, sb);

                Log.Info(sb);

                return result;
            }
            catch (Exception ex)
            {
                Log.Error(sb, ex);
                throw;
            }
        }

        private void AppendRequestLog(IRestRequest restRequest, StringBuilder sb)
        {
            try
            {
                sb.AppendFormat("{0} to resource {1} at {2}\n", restRequest.Method, restRequest.Resource,
                    DateTimeOffset.Now);

                if (restRequest.Parameters.Any(x => x.Type == ParameterType.Cookie))
                {
                    sb.AppendFormat("Cookies: {0}\n",
                        string.Join(", ",
                            restRequest.Parameters.Where(x => x.Type == ParameterType.Cookie)
                                .Select(x => string.Format("{0}={1}", x.Name, x.Value))));
                }

                if (restRequest.Parameters.Any(x => x.Type == ParameterType.GetOrPost))
                {
#if DEBUG || DEVELOP || QA
                    sb.AppendFormat("With the following parameter(s)\n\n{0}\n",
                        string.Join("\n",
                            restRequest.Parameters.Where(x => x.Type == ParameterType.GetOrPost)
                                .Select(x => string.Format("{0}={1}", x.Name, x.Value))));
#else
                    var keys = new[]
                    {
                        "password", "newPassword", "pNetAccountId", "pNetSecureId", "pAccountId", "pCardNumber",
                        "pAccountName", "pExpireYear", "pExpireMonth", "pCvv"
                    };

                    sb.AppendFormat("With the following parameter(s)\n\n{0}\n",
                        string.Join("\n",
                            restRequest.Parameters.Where(x => x.Type == ParameterType.GetOrPost)
                                .Select(x => string.Format("{0}={1}", x.Name, keys.Contains(x.Name) ? "***" : x.Value))));

#endif
                }

                sb.AppendLine("\n----------\n");
            }
            catch (Exception ex)
            {
                Debug.Write(ex.ToString());
                // we have to skip this if there's really an exception
            }
        }

        private void AppendResponseLog(IRestResponse response, StringBuilder sb)
        {
            try
            {
                sb.AppendFormat("Response from {0} with {1} {2} at {3}\n", response.ResponseUri,
                    (int) response.StatusCode,
                    response.StatusDescription, DateTimeOffset.Now);

                sb.AppendFormat(string.Join("\n",
                    response.Headers.Select(x => string.Format("{0}: {1}", x.Name, x.Value))));
                sb.AppendLine();
                sb.AppendLine(response.Content);
            }
            catch (Exception ex)
            {
                Debug.Write(ex.ToString());
                // we have to skip this if there's really an exception
            }
        }

        public IEnumerable<Type> GetRequiredInterfaces()
        {
            return Type.EmptyTypes;
        }

        public bool WillExecute
        {
            get { return true; }
        }
    }
}