FlowRouter.route('/', {
    action: function() {
        //console.log("%%% reached home page!");
        BlazeLayout.render('applicationLayout', {content: 'home'});
    },
});
FlowRouter.route('/profile/:userId', {
    action: function(params, queryParams) {
        //console.log("Yeah! We are on the account page of user:", params.userId);
        BlazeLayout.render('applicationLayout', {content: 'profile'});
    }
});