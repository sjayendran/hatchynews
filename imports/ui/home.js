import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import './home.html';
var _ = require('underscore');

Template.home.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.storyList = new ReactiveVar([]);
  let tmpl = this;
  Meteor.call('getHNTopStories', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // success!
      tmpl.storyList.set(_.first(res, 20));
    }
  });
});
 
Template.home.helpers({
  stories(){
    return Template.instance().storyList.get();
  }
});