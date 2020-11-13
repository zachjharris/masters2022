import Vuex from 'vuex';
//import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: [
            {
              "Name": "Dario Petronzio",
              "golfers": [
                28237,
                47959,
                36689,
                48081,
                32839,
                28089
              ]
            },
            {
              "Name": "Will Gandert",
              "golfers": [
                47959,
                8793,
                30925,
                28237,
                28237,
                30911
              ]
            },
            {
              "Name": "Zach Harris",
              "golfers": [
                30925,
                46970,
                47959,
                50525,
                36689,
                33448
              ]
            },
            {
              "Name": "Michael Hazelden",
              "golfers": [
                30925,
                28237,
                47959,
                50525,
                36689,
                29725
              ]
            },
            {
              "Name": "Dan Hensler",
              "golfers": [
                33448,
                36689,
                50525,
                25804,
                52372,
                34360
              ]
            },
            {
              "Name": "Parker smith",
              "golfers": [
                46970,
                33448,
                26329,
                24502,
                47959,
                48081
              ]
            },
            {
              "Name": "Mike Briach",
              "golfers": [
                47959,
                30925,
                33448,
                46970,
                48081,
                36689
              ]
            },
            {
              "Name": "Nik Sekoulopoulo",
              "golfers": [
                47959,
                33448,
                48081,
                26329,
                22405,
                50525
              ]
            },
            {
              "Name": "Alex Harris",
              "golfers": [
                47959,
                36689,
                35450,
                48081,
                46970,
                30925
              ]
            },
            {
              "Name": "Zach Domer",
              "golfers": [
                30925,
                47959,
                46970,
                48081,
                34360,
                36689
              ]
            },
            {
              "Name": "John Breig",
              "golfers": [
                47959,
                30925,
                32839,
                28237,
                36689,
                33448
              ]
            },
            {
              "Name": "Eric Spracklen",
              "golfers": [
                29725,
                8793,
                1810,
                29221,
                36689,
                28237
              ]
            },
            {
              "Name": "Dylan Dancer",
              "golfers": [
                47959,
                46970,
                36689,
                29725,
                28237,
                28237
              ]
            },
            {
              "Name": "Eric Spracklen",
              "golfers": [
                48081,
                32839,
                37455,
                8793,
                28237,
                33448
              ]
            },
            {
              "name": "Dominic Hohman",
              "golfers": [
                28089,
                30925,
                46970,
                36689,
                47959,
                28237
              ]
            }
          ],
    },
    mutations: {

    },
    actions: {
        async getStats() {

        }
    }
});
export default store;