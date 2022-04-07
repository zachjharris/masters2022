import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: [
            { "name": "John Rich", "golfers": ["46970", "26329"] },
            { "name": "Josh Anderson", "golfers": ["35891", "32839"] },
            { "name": "Zach Domer", "golfers": ["46046", "47483"] },
            { "name": "Austin Korte", "golfers": ["36689", "8793"] },
            { "name": "Zach Besand", "golfers": ["35450", "34363"] },
            { "name": "Nolan Escher", "golfers": ["30925", "47959"] },
            { "name": "Zach Harris", "golfers": ["50525", "48081"] },
            { "name": "Kevin Kinsella", "golfers": ["47504", "46717"] },
            { "name": "Dylan Dancer", "golfers": ["33448", "34046"] }
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