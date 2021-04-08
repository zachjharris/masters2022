import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: [{"name":"Casey Golden","golfers":["30925","33448","28237","48081","29725","25364"]},{"name":"Bryan Noller","golfers":["35450","48081","34046","33448","30925","39971"]},{"name":"Zach Harris","golfers":["30925","47959","33448","34046","50525","46970"]},{"name":"Nik Sekoulopoulos","golfers":["30925","46970","34046","35450","50525","29221"]},{"name":"Dominic Hohman","golfers":["30925","46970","20396","21209","39977","33448"]},{"name":"Zach Domer","golfers":["50525","30925","35891","28237","46970","34360"]},{"name":"Austin Korte","golfers":["33448","34046","29725","30925","34360","48081"]},{"name":"Josh Anderson","golfers":["30925","47959","46970","33448","34046","34360"]},{"name":"Bryan Noller","golfers":["30925","33448","48081","46970","28237","50525"]},{"name":"Will Gandert","golfers":["1810","47959","30925","30911","46970","34046"]},{"name":"Paul Harris","golfers":["30925","33448","35450","50525","47959","46970"]},{"name":"David Kostanich","golfers":["30925","47959","33448","34046","28237","25364"]},{"name":"Jake Proakis","golfers":["46970","47959","50525","30925","25364","40026"]},{"name":"Graham Johnston","golfers":["30925","46970","33448","21209","31323","47959"]},{"name":"Jason Orzel","golfers":["34046","36689","20396","30925","29725","34360"]},{"name":"Jason Orzel - 2","golfers":["30925","47959","46970","33448","28237","34046"]},{"name":"Lee Unsinger","golfers":["30925","33448","46970","35450","48081","46717"]},{"name":"Eric Spracklen","golfers":["48081","32839","33448","36689","47959","29221"]},{"name":"Eric Spracklen - 2","golfers":["48081","32839","34046","47959","1810","24502"]},{"name":"Jeremy Krystosik","golfers":["30925","46970","33448","28237","34046","25364"]},{"name":"Jeremy Krystosik - 2","golfers":["47959","50525","29725","47483","20396","45526"]},{"name":"Dylan Dancer","golfers":["32839","30925","39971","48081","33448","30925"]},{"name":"Jordan Lane","golfers":["30925","34046","33448","36689","46046","25804"]},{"name":"Alex Harris","golfers":["30925","47959","46970","33448","28237","34046"]}],
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
                const { data } = await axios.get(`https://www.masters.com/en_US/scores/feeds/2021/scores.json`);
                console.log(data);
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