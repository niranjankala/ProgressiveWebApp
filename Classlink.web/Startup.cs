using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Classlink.web.Startup))]
namespace Classlink.web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
