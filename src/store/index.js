import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: [
            { "name": "Zach Harris", "golfers": ["46970", "50525", "28237", "30925", "33448", "45526"] },
            { "name": "Matt Barker", "golfers": ["50525", "30925", "35891", "29725", "46046", "32839"] },
            { "name": "Kevin K", "golfers": ["35891", "46970", "47504", "34046", "30925", "25804"] },
            { "name": "Will", "golfers": ["32839", "47483", "30911", "46970", "33448", "46717"] },
            { "name": "Mike Siefker", "golfers": ["48081", "32839", "34046", "35450", "26329", "46046"] },
            { "name": "Nik sekoulopoulos", "golfers": ["35891", "46970", "36689", "47483", "52215", "50525"] },
            { "name": "Zach Domer", "golfers": ["46046", "36689", "33448", "46717", "46970", "47483"] },
            { "name": "Paul Harris", "golfers": ["46970", "35450", "35891", "33448", "34363", "47483"] },
            { "name": "Noller", "golfers": ["33448", "48081", "36689", "50525", "35891", "46970"] },
            { "name": "Casey", "golfers": ["46970", "28237", "30911", "35450", "36689", "34046"] },
            { "name": "Leininger", "golfers": ["34046", "25396", "32839", "46970", "33448", "30925"] },
            { "name": "Michael Rinehart", "golfers": ["46970", "30925", "36689", "50525", "33448", "8793"] },
            { "name": "Eric", "golfers": ["48081", "36689", "8793", "24502", "39997", "25396"] },
            { "name": "Graham", "golfers": ["26329", "50525", "46717", "46970", "28237", "33204"] },
            { "name": "Alex", "golfers": ["46970", "34046", "48081", "35891", "36689", "46046"] }
        ],
        scores: [],
        yardages: [],
        pars: [],
        videos: []
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
        },
        setVideos(state, videos) {
            state.videos = videos;
        }
    },
    actions: {
        async getScores(context) {
            try {
                const { data } = await axios.get(`https://www.masters.com/en_US/scores/feeds/2022/scores.json`);
                context.commit('setScores', data.data.player);
                context.commit('setPars', data.data.pars);
                context.commit('setYardages', data.data.yardages);
            }
            catch(err) {
                console.log('unable to retrieve scores');
            }
        },
        async getVideos(context) {
            try {
                const { data } = await axios.get(`https://www.masters.com/en_US/cms/feeds/live/liveVideo.json`);
                const { channels } = data;
                context.commit('setVideos', channels);
            }
            catch(err) {
                console.log('unable to retrieve videos');
            }
        }
    }
});
export default store;