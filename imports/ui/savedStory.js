import { Template } from 'meteor/templating';
import './savedStory.html';
var moment = require('moment');

Template.savedStory.helpers({
    storyDetail(){
        return Template.instance().data.storyDetail;
    },
    cleanedTimestamp(tstamp){
        return moment(tstamp * 1000).fromNow();
    }
  });

Template.savedStory.events({
    'click .unsaveStory'(event, template) {
        // Prevent default browser form submit
        event.preventDefault();
        //console.log("$$$ lickec this story:");
        //console.log(this);
        Meteor.call('unsaveStoryFromProfile', this);
    },
});