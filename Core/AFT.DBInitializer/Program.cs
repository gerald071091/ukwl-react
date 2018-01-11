using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;

namespace AFT.DBInitializer
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var siteNameArr = (args.Length > 0) ? args[0] : "";

            string[] siteNames = siteNameArr.Split(',');

            foreach (var siteName in siteNames) { 

                InitializeSessionDatabase(siteName);
                InitializeLogDatabase(siteName);
            }
        }

        private static void InitializeSessionDatabase(string siteName)
        {
            if (!String.IsNullOrEmpty(siteName))
            {
                var sessionStore = ConfigurationManager.ConnectionStrings["SessionStore"];

                if (sessionStore == null)
                {
                    Console.WriteLine("SessionStore not found.");
                    return;
                }
                var sessionStoreNew = new ConnectionStringSettings(sessionStore.Name,
                    sessionStore.ConnectionString.Replace("{siteName}", siteName), sessionStore.ProviderName);
                
                var connstringBuilder = new SqlConnectionStringBuilder(sessionStoreNew.ConnectionString);
                string databaseName = connstringBuilder.InitialCatalog;

                connstringBuilder.InitialCatalog = "master";
                string masterDbConnectionString = connstringBuilder.ToString();

                if (DatabaseExists(masterDbConnectionString, databaseName))
                {
                    return;
                }

                try
                {
                    var arguments = string.Format("-C \"{0}\" -ssadd -sstype c", sessionStoreNew.ConnectionString);
                    var aspnetRegsqlPath = Path.Combine(RuntimeEnvironment.GetRuntimeDirectory(), "aspnet_regsql.exe");
                    ExecuteProcess(aspnetRegsqlPath, arguments);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            else
            {
                Console.WriteLine("Please input valid Site Name");
            }
        }

        private static void InitializeLogDatabase(string siteName)
        {
            var logDb = ConfigurationManager.ConnectionStrings["LogDb"];

            if (logDb == null)
            {
                Console.WriteLine("LogDb not found.");
                return;
            }

            using (var db = new LogDbContext())
            {
                db.Database.Connection.ConnectionString = db.Database.Connection.ConnectionString.Replace("{siteName}", siteName);
                
                if (db.Database.Exists())
                {
                    return;
                }
                db.Database.Initialize(false);
                db.Database.ExecuteSqlCommand("CREATE INDEX [IX_Date] ON [dbo].[Log] ([Date] DESC)");
            }
        }
        private static bool DatabaseExists(string masterDbConnectionString, string databaseName)
        {
            var sql = string.Format("SELECT count(*) FROM sys.databases WHERE name = '{0}'", databaseName);
            using (var sqlConnection = new SqlConnection(masterDbConnectionString))
            {
                sqlConnection.Open();
                using (var sqlCmd = new SqlCommand(sql, sqlConnection))
                {
                    var result = (int)sqlCmd.ExecuteScalar();
                    return result > 0;
                }
            }
        }
        public static void ExecuteProcess(string fileName, string argumentsText)
        {
            var process = new Process
            {
                StartInfo =
                {
                    FileName = fileName,
                    Arguments = argumentsText,
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            Console.WriteLine(process.StandardOutput.ReadToEnd());
        }
    }
}
