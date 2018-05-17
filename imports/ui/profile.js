import { Template } from 'meteor/templating';
import { HTTP } from 'meteor/http';
import { Stories } from '../api/stories.js';
import './profile.html';

Template.profile.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  //console.log("%%% inside profile on created!!!");
  Meteor.subscribe('storiesForUser');
});
 
Template.profile.helpers({
  savedStories(){
    //console.log("%% this is the saved stories:");
    //console.log(Stories.find().fetch());
    return Stories.find();
  },
  hasSavedStories(){
    return Stories.find().fetch().length > 0;
  }
});