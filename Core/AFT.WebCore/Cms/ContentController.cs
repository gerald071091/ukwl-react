using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AFT.RegoCMS.Engine;
using AFT.RegoCMS.Security;
using AFT.RegoCMS.WhiteLabel.Api;
using AFT.RegoCMS.WhiteLabel.Filters;

namespace AFT.RegoCMS.WhiteLabel.Cms
{
    public class ContentController : ApiBase
    {
        private readonly CmsEngine _cmsEngine;
        private readonly Configurations _configurations;

        public ContentController(CmsEngine cmsEngine, Configurations configurations)
        {
            Contract.Requires(cmsEngine != null);
            Contract.Requires(configurations != null);

            _cmsEngine = cmsEngine;
            _configurations = configurations;
        }


        [Route("~/api/refreshContents")]
        [AllowAnonymous]
        [SuppressCsrfProtection]
        [ValidateNullRequest]
        [HttpPost]
        public virtual HttpResponseMessage RefreshContents([FromBody]RefreshContentsRequest request)
        {
            Log.InfoFormat("Refreshing contents for version(s): {0}.", string.Join(", ", request.Ids));

            if (!Authorized(request.Ticket, "notifier"))
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            var failedContentItemVersionIds = new Collection<Guid>();

            foreach (var contentItemVersionId in request.Ids)
            {
                try
                {
                    _cmsEngine.UpdateContent(contentItemVersionId);
                }
                catch (Exception ex)
                {
                    failedContentItemVersionIds.Add(contentItemVersionId);
                    Log.ErrorFormat("Failed to refresh contets. Version: {0}.", ex, contentItemVersionId);
                }
            }

            if (failedContentItemVersionIds.Any())
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(string.Format("Failed to update versions: {0}",
                        string.Join(", ", failedContentItemVersionIds)))
                };
            }

            Log.InfoFormat("Refreshed contents for version(s): {0}.", string.Join(", ", request.Ids));
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public class RefreshContentsRequest
        {
            public string Ticket { get; set; }

            public List<Guid> Ids { get; set; }
        }

        [Route("~/api/refreshAllContents")]
        [AllowAnonymous]
        [SuppressCsrfProtection]
        [ValidateNullRequest]
        [HttpPost]
        public virtual HttpResponseMessage RefreshAllContents([FromBody]RefreshAllContentsRequest request)
        {
            Log.Info("Refreshing all contents.");

            if (!Authorized(request.Ticket, "notifier"))
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            try
            {
                _cmsEngine.RefreshContents();
                Log.Info("Refreshed all contents.");
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                Log.ErrorFormat("Failed to refresh all contents.", ex);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        public class RefreshAllContentsRequest
        {
            public string Ticket { get; set; }
        }

        private bool Authorized(string encrypted, string name)
        {
            try
            {
                var ticketManager = new TicketManager(_configurations.TicketKey, _configurations.TicketHashKey);
                AuthenticationTicket ticket = ticketManager.Decrypt(encrypted);
                return ticket != null && ticket.Name == name;
            }
            catch (Exception ex)
            {
                Log.Error("Failed to decrypt the ticket.", ex);
                return false;
            }
        }
    }
}