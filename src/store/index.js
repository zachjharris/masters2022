import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: [
            {
              "name": "Dario Petronzio",
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
              "name": "Will Gandert",
              "golfers": [
                47959,
                8793,
                30925,
                28237,
                32102,
                30911
              ]
            },
            {
              "name": "Zach Harris",
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
              "name": "Michael Hazelden",
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
              "name": "Dan Hensler",
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
              "name": "Parker smith",
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
              "name": "Mike Briach",
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
              "name": "Nik Sekoulopoulo",
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
              "name": "Alex Harris",
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
              "name": "Zach Domer",
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
              "name": "John Breig",
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
              "name": "Eric Spracklen",
              "golfers": [
                29725,
                8793,
                1810,
                29221,
                36689,
                32102
              ]
            },
            {
              "name": "Dylan Dancer",
              "golfers": [
                47959,
                46970,
                36689,
                29725,
                28237,
                32102
              ]
            },
            {
              "name": "Eric Spracklen",
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
        scores: [],
        yardages: [],
        pars: []
    },
    mutations: {
        setScores(state, scores) {
            state.scores = scores;
        },
        setPars(state, pars) {
            state.pars = pars;
        },
        setYardages(state, yardages) {
            state.yardages = yardages;
        }
    },
    actions: {
        async getScores(context) {
            try {
                const { data } = await axios.get(`https://www.masters.com/en_US/scores/feeds/scores.json`);
                context.commit('setScores', data.data.player);
                context.commit('setPars', data.data.pars);
                context.commit('setYardages', data.data.yardages);
            }
            catch(err) {
                console.log('unable to retrieve scores');
            }
        }
    }
});
export default store;