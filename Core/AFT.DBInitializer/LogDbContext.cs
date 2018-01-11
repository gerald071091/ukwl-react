using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AFT.DBInitializer
{
    public class LogDbContext : DbContext
    {
        public LogDbContext()
            : base("name=LogDb")
        {
        }

        public DbSet<LogItem> Logs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new LogsConfiguration());
        }
    }
    public class LogItem
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required]
        public long Id { get; set; }

        [Required]
        [StringLength(32)]
        [Column(TypeName = "varchar")]
        public string AppName { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(32)]
        [Column(TypeName = "varchar")]
        public string Host { get; set; }

        [Required]
        [StringLength(16)]
        [Column(TypeName = "varchar")]
        public string Level { get; set; }

        [Required]
        [StringLength(128)]
        [Column(TypeName = "varchar")]
        public string Logger { get; set; }

        [Required]
        [StringLength(64)]
        [Column(TypeName = "varchar")]
        public string Username { get; set; }

        [Required]
        [MaxLength]
        public string Message { get; set; }

        [MaxLength]
        public string Exception { get; set; }
    }

    public class LogsConfiguration : EntityTypeConfiguration<LogItem>
    {
        public LogsConfiguration()
        {
            
            ToTable("Log");
        }
    }
}
    