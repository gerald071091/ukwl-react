using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Routing;
using System.Web.SessionState;

namespace AFT.WebCore.Handlers
{
    [ExcludeFromCodeCoverage]
    public class IOvationDynamicJs : IHttpHandler, IReadOnlySessionState
    {
        public bool IsReusable { get { return false; } }

        public void ProcessRequest(HttpContext context)
        {
            var absPath = context.Request.Url.AbsolutePath.Replace("/iojs","");
            var iovationProxyUrl = ConfigurationManager.AppSettings["IOVationProxyUrl"];
            //var remoteUrl = "https://ci-first.iovation.com/" + absPath;
            var remoteUrl = iovationProxyUrl + absPath;

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(remoteUrl);

            request.UserAgent = context.Request.UserAgent;
            request.Referer = context.Request.Headers["Referer"];

            foreach (var key in context.Request.Headers.AllKeys) {
                if (key == "Cookie" || key == "Accept-Language" || key == "Accept-Charset" || key == "X-Requested-With" || key == "X-Forwarded-For" || key == "X-Cluster-Client-Ip") {
                    request.Headers.Add(key, context.Request.Headers[key]);
                }
            }

            HttpWebResponse response;
            try
            {
                response = (HttpWebResponse)request.GetResponse();
            }
            catch (WebException we)
            {
                //remote url not found, send 404 to client 
                context.Response.StatusCode = 404;
                context.Response.StatusDescription = "Not Found";
                context.Response.Write("<h2>Page not found</h2>");
                context.Response.End();
                return;
            }
            
            Stream receiveStream = response.GetResponseStream();

            byte[] buff = new byte[1024];
            int bytes = 0;
            while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
            {
                //Write the stream directly to the client 
                context.Response.OutputStream.Write(buff, 0, bytes);
            }

            foreach (var key in response.Headers.AllKeys) {
                if (key == "Set-Cookie" || key == "Cache-Control" || key == "Pragma") {
                    context.Response.Headers.Add(key, response.Headers[key]);
                }
            }

            //close streams
            context.Response.ContentType = response.ContentType;
            response.Close();
            context.Response.End();
        }
        public string ParseHtmlResponse(string html, string appPath)
        {
            html = html.Replace("\"/", "\"" + appPath + "/");
            html = html.Replace("'/", "'" + appPath + "/");
            html = html.Replace("=/", "=" + appPath + "/");

            return html;
        }
    }
}
