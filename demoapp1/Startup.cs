using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(demoapp1.Startup))]
namespace demoapp1
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
