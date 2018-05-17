import { Template } from 'meteor/templating';
import { Stories } from '../api/stories.js';
import './story.html';
var moment = require('moment');
var _ = require('underscore');

Template.story.onCreated(function () {
    // Use this.subscribe inside onCreated callback
    //console.log("%%%%% this is the detail from the story:");
    //console.log(this.data);
    Meteor.subscribe('storiesForUser');
    this.storyDetail = new ReactiveVar([]);
    let tmpl = this;
    Meteor.call('getHNStoryDetail', this.data, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          // success!
          //console.log(res);
          tmpl.storyDetail.set(res);
        }
    });
});

Template.story.helpers({
    storyDetail(){
        return Template.instance().storyDetail.get();
    },
    cleanedTimestamp(tstamp){
        return moment(tstamp * 1000).fromNow();
    },
    storyAlreadySaved(){
        return Stories.find({"savedBy": Meteor.userId(), 'storyID': this.valueOf()}).count() > 0;
    }
  });

Template.story.events({
    'click .saveStory'(event, template) {
        // Prevent default browser form submit
        event.preventDefault();
        //console.log("$$$ lickec this story:");
        //console.log(template.storyDetail.get());
        Meteor.call('saveStoryToProfile', template.storyDetail.get());
    },
    'click .unsaveStory'(event, template) {
        // Prevent default browser form submit
        event.preventDefault();
        console.log("$$$ lickec this story:");
        console.log(template.storyDetail.get());
        Meteor.call('unsaveStoryFromProfile', template.storyDetail.get());
    },
});