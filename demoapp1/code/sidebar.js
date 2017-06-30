CloudApp.module("MyFiles.Views", function(Views, CloudApp, Backbone, Marionette, $, _) {

    var MyFiles = CloudApp.MyFiles;
    MyFiles.Views.listingViewType = 'grid';
    var actions = Views.Actions;

    //var fn = _.throttle(_.bind(u.b, u), 2000, {trailing: false});

    Views.MainSidebar = Backbone.Marionette.ItemView.extend({
        className: 'myfiles-sidebar',
        template: "public/tpl/Myfiles/MainSidebar.html",
        events: {
            'click .ib-main-back': function() {
                return false;

            },
            'click .cl-links > li > a': function(e) {
                return this.fnsPclick(e);
            },
            'iopen .cl-links > li > a': function(e) {
                return this.fnsPclick(e);
            },
            'click .phandle': function(e) {
                return this.fnsPhandle(e);
            },
            'iopen .phandle': function(e) {
                return this.fnsPhandle(e);
            },
            'reopen .phandle': function(e) {
                return this.fnsPhandle(e, true);
            },
            'click .foldernav .handle': function(e) {
                return this.fnsFhandle(e);
            },
            'iopen .foldernav .handle': function(e) {
                return this.fnsFhandle(e, 1);
            },
            'click .foldernav .fn-label': function(e) {
                return this.fnsFnlabel(e);
            },
            'iopen .foldernav .fn-label': function(e) {
                return this.fnsFhandle(e, 1);
            },
            'reopen .foldernav .fn-label': function(e) {
                return this.fnsFhandle(e, 1, 1);
            }
        },
        setListingView: function(v) {
            this.listingView = v;
        },
        addIdragEvents: function() {
            if (this.listingView) {
                var h = $(".cf-drag-helper");
                if (h && h.length && h.is(":visible")) {
                    this.listingView.internalDraggingAttachRelevantEvents();
                }
            }
            MyFiles.Views.ContextMenu.attachFolderNavRightClick();
        },
        fnsPclick: function(e) {
            var a = $(e.target);
            if (!a.data('id')) {
                a = a.parents('a');
            }

            if(a.data('id') == 'manageservices') {
                CloudApp.trigger("myfiles:show:manageservices");
                return false;
            }

            if (this.currentProvider && a.data('id') == this.currentProvider.getId()) {
                // same provider
                CloudApp.trigger("myfiles:show:folder", a.data('id'), this.currentProvider.getRootId());
            } else {
                CloudApp.trigger("myfiles:show:provider", a.data('id'));
            }

            return false;
        },
        fnsPhandle: function(e, reopen) {
            var ithis = this;
            var liP = $(e.target).closest('.provider');
            var pId = liP.find(' > a').data('id');
            var p = CloudApp.MyFiles.Controller.getProviderById(pId);
            if(reopen) {
                liP.removeClass('opened');
            }
            if (liP.hasClass('opened')) {
                liP.removeClass('opened');
            } else {
                liP.addClass('opening');
                console.log('fns.phandle');
                $.when(p.getFolderNav(0)).done(function(proot) {
                    console.log('proot', proot);
                    liP.removeClass("opening");
                    liP.addClass("opened");

                    if (proot.children && proot.children.length) {

                        var ht = '';

                        ht += '<ul class="foldernav">';
                        _.each(proot.children.models, function(fc) {
                            ht += ithis.renderFolderSubNav(fc);
                        });
                        ht += '</ul>';

                        var pe = liP;
                        pe.find(' > ul.foldernav').remove(); // remove if any children already there
                        pe.append(ht);
                        ithis.highlightCurrentFolder();
                        ithis.addIdragEvents();
                    }
                });
            }
            return false;
        },
        fnsFhandle: function(e, onlyOpen, reopen){
            onlyOpen = onlyOpen || 0;
            var ithis = this;
            var li = $(e.target).closest('li.foldernav-unit');
            var liP = li.closest('.provider');
            var pId = liP.find(' > a').data('id');
            var p = CloudApp.MyFiles.Controller.getProviderById(pId);

            if (li.data("id")) {
                var folderId = li.data("id");
                if(reopen) {
                    if(!li.hasClass('opened')) {
                        return;
                    }
                    li.removeClass('opened');
                }
                if (li.hasClass("opened")) {
                    if (!onlyOpen) {
                        li.removeClass("opened");
                    }
                } else {
                    li.addClass("opening");
                    $.when(p.getFolderNav(folderId)).done(function(folder) {
                        li.addClass("opened");
                        li.removeClass("opening");
                        folder.set("is_nav_opened", 1);
                        if (folder.children && folder.children.length) {
                            var ht = '';

                            ht += '<ul class="foldernav">';
                            _.each(folder.children.models, function(fc) {
                                ht += ithis.renderFolderSubNav(fc);
                            });
                            ht += '</ul>';

                            li.find(' > ul.foldernav').remove(); // remove if any children already there
                            li.append(ht);
                            ithis.highlightCurrentFolder();
                            ithis.addIdragEvents();
                        }
                        else {
                            li.find(' > ul.foldernav').remove();
                        }
                    });
                }
            }

            return false;
        },
        fnsFnlabel: function(e) {
            var ithis = this;
            var li = $(e.target).closest('li.foldernav-unit');
            var liP = li.closest('.provider');
            var pId = liP.find(' > a').data('id');
            var p = CloudApp.MyFiles.Controller.getProviderById(pId);

            if (li.data("id")) {
                var folderId = li.data("id");

                CloudApp.trigger("myfiles:show:folder", pId, folderId);
            }

            return false;
        },
        highlightCurrentFolder: function() {
            $(".foldernav-unit-current").removeClass("foldernav-unit-current");
            if(!this.currentFolder || !this.currentProvider) {
                return;
            }
            var folderId = _.isObject(this.currentFolder) ? this.currentFolder.get('id') : this.currentFolder;
            if(!folderId) {
                return;
            }
            var m = $('.cl-links .provider-'+this.currentProvider.getId()+' .foldernav-unit').filter(function(i,b) { return $(b).data('id') == folderId;  });
            if(!m.length) {
                return;
            }
            m.addClass("foldernav-unit-current");

        },
        // open a folder if its parent's is there and opened
        openFolder: function(folder, provider) {
            console.log('sidebar.openFolder', folder, provider);
            this.highlightCurrentFolder();

            if(!folder || !provider) {
                return;
            }
            folder = _.isObject(folder) ? folder.get('id') : folder;
            if(!provider.hasFolderNavigation) {
                return;
            }
            if(folder == provider.getRootId()) {
                var ph = $('.cl-links .provider-'+provider.getId()+' .phandle');
                ph.trigger('reopen');
                return;
            }
            var m = $('.cl-links .provider-'+provider.getId()+' .foldernav-unit').filter(function(i,b) { return $(b).data('id') == folder;  });
            if(!m.length) {
                return;
            }
            console.log('m', m);
           
            if(m.hasClass('opened')) {
                m.find('.fn-label').trigger('reopen');
            }
            else {
                m.find('.fn-label').trigger('iopen');
            }
        },
        checkManageServiceVisibilty: function() {
            CloudApp.MyFiles.Controller.has3rdPartyServices(function(b) {
                if(!b) {
                    $(".cl-links .manageservices").hide();
                }
            });
        },
        initialize: function(options) {
            var ithis = this;
            this.options = options;
            this.providers = this.options.providers;
            this.currentFolder = this.options.currentFolder;
            this.currentProvider = this.options.currentProvider;
            this.currentTab = this.options.currentTab;
            _.bindAll(this, "render");
            CloudApp.on("myfiles:providers:list:changed", this.render);

            if (!$(".container-left").length) {
                $(".module-container").html('<div class="container-left"></div><div class="container-right"></div><div class="clear"></div>');
            }
            this.checkManageServiceVisibilty();

            // _.bindAll(this, "fnsPclick", "fnsPhandle", "fnsFhandle", "fnsFnlabel");
            // var methods = ["fnsPclick", "fnsPhandle", "fnsFhandle", "fnsFnlabel"];
            // for(var i=0; i<methods.length; i++) {
            //     this[methods[i]] = _.throttle(this[methods[i]], 800);
            // }
            //this.openFolder(this.currentFolder, this.currentProvider);

        },
        freshenUp: function(options) {
            var ithis = this;
            this.options = options;
            this.providers = this.options.providers;
            this.currentFolder = this.options.currentFolder;
            this.currentProvider = this.options.currentProvider;
            this.currentTab = this.options.currentTab;
            this.checkManageServiceVisibilty();
            /*if(this.currentProvider && this.currentFolder) {*/
                //this.openFolder(this.currentFolder, this.currentProvider);
            /*}*/


            this.$el.find(".cl-links > li").removeClass("opened");
            if (this.currentProvider && this.currentProvider.supportsFolderNavigation()) {
                this.$el.find(".cl-links > li.provider-" + this.currentProvider.getId()).addClass("opened");
            }

            this.$el.find(".cl-links > li > a").removeClass("active");
            if(this.currentTab === 'provider') {
                this.$el.find(".cl-links > li.provider-" + this.currentProvider.getId() + " > a").addClass("active");
            }
            if(this.currentTab === 'manageservices') {
                this.$el.find(".cl-links > li.manageservices > a").addClass("active");
            }

            if (!$(".container-left").length) {
                $(".module-container").html('<div class="container-left"></div><div class="container-right"></div><div class="clear"></div>');
            }
            //this.openFolder(this.currentFolder, this.currentProvider);
            ithis.addIdragEvents();
            ithis.renderQuotas();
        },
        renderQuotas: function() {
            var ithis = this;
            _.each(this.providers, function(p) {
                if (!p.isEnabled()) {
                    return;
                }
                var context = false;
                if(p.getId() == 'clouddrive') {
                    context = p.getQuotaContext();
                }
                p.getQuota(function(quota) {
                    var ht = '';
                    var el = ithis.$el.find('.provider-'+p.getId()+' .ib-title');
                    if(quota.total) {
                        var pr = parseInt(quota.used * 100 / quota.total, 10);
                        var t = utils.formatSize(quota.total);
                        var title = utils.ts('myfiles.quota_details', pr+'%', t);
                        ht = '<span class="mf_nav_quota cl-collapse-hide"><span class="nav_quota_visual"><span style="width: '+pr+'%;">&nbsp;</span></span><span class="nav_quota_text" title="'+title+'">'+t+'</span></span>';
                    }
                    el.find('.mf_nav_quota').remove();
                    el.append(ht);
                }, context, false);
            });
        },
        serializeData: function() {
            var j = {};
            // j.kback = 0;
            // if(this.currentFolder.parent_id !== this.currentProvider.getRootId()) {
            //  j.kback = 1;
            // }
            j.kback = 0; // no back button in sidebar
            j.links = [];
            j.title = i18n.t('myfiles.title');
            for (var i = 0; i < this.providers.length; i++) {
                if (!this.providers[i].isEnabled()) {
                    continue;
                }
                //<span class="cfp_nav_quota"><span class="cfp_nav_quota_visual"><span style="width: 3%;">&nbsp;</span></span><span class="cfp_nav_quota_text">2 GB</span></span>
                j.links.push({
                    id: this.providers[i].getId(),
                    cssClass: 'provider provider-' + this.providers[i].getId() + ' has-folder-nav-' + (this.providers[i].supportsFolderNavigation() ? 1 : 0) + ' ' + (this.providers[i].folderNavOpened() ? 'opened' : ''),
                    name: this.providers[i].getName(),
                    active: this.providers[i] === this.currentProvider && this.currentTab === 'provider',
                    icon: "cf-icon",
                    expandable: this.providers[i].supportsFolderNavigation(),
                    dragOpen: true
                });
            }

            
            j.links.push({
                id: 'manageservices',
                cssClass: 'manageservices has-folder-nav-0',
                name: i18n.t('myfiles.manageservices'),
                active: this.currentTab === 'manageservices',
                icon: "cf-icon",
                expandable: false,
                dragOpen: false
            });

            CloudApp.MyFiles.Controller.has3rdPartyServices(function(b) {
                if(!b) {
                    $(".cl-links .manageservices").hide();
                }
            });

            
            return j;
        },
        renderFolderSubNav: function(folder) {
            if (!folder.get("is_directory")) {
                return '';
            }
            var ithis = this;
            var ht = '';
            var p = CloudApp.MyFiles.Controller.getProviderBySupportedType(folder.get("type"));

            ht += '<li class="foldernav-unit ';
            if (folder.get("is_nav_opened")) {
                ht += ' opened ';
            }
            if (p.hasFolderCounts) {
                if (folder.get("num_folders")) {
                    ht += " has-children ";
                }
            } else {
                ht += " has-children ";
            }

            ht += " fn-unit-type-" + folder.get("type") + " ";
            if (folder.get("type") == "cloud") {
                ht += " fn-unit-type-cloud-" + folder.get("raw").folder_type.toLowerCase() + " ";
            }
            ht += '" data-id="' + folder.get("id") + '">';
            ht += '<a class="handle idrag-open " href="#"><i class="icon-chevron-right icon-fixed-width" /><i class="icon-chevron-down icon-fixed-width" /><i class="icon-refresh icon-spin icon-fixed-width" /></a>';
            ht += '<a class="fn-label idrag-open idrag-target idrag-hover" data-id="' + folder.get("id") + '" data-pid="' + p.getId() + '" href="#"><span class="cf-icon" /> ' + folder.get("name") + '</a>';



            if (folder.children && folder.children.length && folder.get("is_nav_opened")) {
                ht += '<ul class="foldernav">';
                _.each(folder.children.models, function(fc) {
                    ht += ithis.renderFolderSubNav(fc);
                });
                ht += '</ul>';
            }

            ht += '</li>';
            return ht;
        },
        onRender: function() {
            var ithis = this;

            _.each(this.providers, function(p) {
                return; // its being opened in openFolder
                if (!p.isEnabled()) {
                    return;
                }
                if(p !== ithis.currentProvider) {
                    return;
                }
                if (p.supportsFolderNavigation()) {
                    $.when(p.getFolderNav(0)).done(function(proot) {
                        if (proot.children && proot.children.length) {

                            var ht = '';

                            ht += '<ul class="foldernav  cl-collapse-hide">';
                            _.each(proot.children.models, function(fc) {
                                ht += ithis.renderFolderSubNav(fc);
                            });
                            ht += '</ul>';

                            var pe = ithis.$el.find('.provider-' + p.getId());
                            pe.find(' > ul.foldernav').remove(); // remove if any children already there
                            pe.append(ht);
                            if (p === ithis.currentProvider) {
                                pe.addClass("opened");
                            } else {
                                pe.removeClass("opened");
                            }
                            ithis.addIdragEvents();

                        }
                    });
                }
            });
            this.renderQuotas();

            this.checkManageServiceVisibilty();
        }
    });
});
