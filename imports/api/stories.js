import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
var _ = require('underscore');

export const Stories = new Mongo.Collection('stories');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('storiesForUser', function storiesPublication() {
      if(!_.isNull(this.userId)){
        //console.log("%%% going to return the stories for this guy:" + this.userId);
        return Stories.find({savedBy: this.userId});
      }
    });

    Meteor.methods({
      'getHNTopStories'() {
        //get latest top stories from HN
        const result = HTTP.call('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json');
        return result.data;
      },
      'getHNStoryDetail'(storyID) {
        const result = HTTP.call('GET', 'https://hacker-news.firebaseio.com/v0/item/'+storyID+'.json');
        return result.data;
      },
      'saveStoryToProfile'(storyObj) {
        //console.log("%%% going to save this story to the use rprofile:");
        //console.log(storyObj);
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
       
        let newSavedStoryID = Stories.insert({
            storyID: storyObj.id,
            storyObj: storyObj,
            savedOn: new Date(),
            savedBy: Meteor.userId(),
            savedByUsername: Meteor.user().username,
        });

        //console.log("%%% this is the new saved story id:");
        //console.log(newSavedStoryID);
      },
      'unsaveStoryFromProfile'(storyObj){
        //console.log("%%% going to unsave this story to the use rprofile:");
        //console.log(storyObj);
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Stories.remove({storyID: storyObj.id, savedBy: Meteor.userId()});
      }
    });
}