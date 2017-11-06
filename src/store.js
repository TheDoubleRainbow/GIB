Vuex = require("./lib/vuex.min.js");
store = new Vuex.Store({
    state: {
        repoData: {owner: "", repo: "", available: false, changed: false},
        labels: []
    },
    actions: {
        setRepoData({commit}, repoData){
            commit('SET_REPODATA', repoData);
        },
        loadLabels({commit}, repoData) {
                var labels = [];
                var loops = 1;
                load();
                function load(){
                    axios.get(`https://api.github.com/repos/${repoData.owner}/${repoData.repo}/labels?page=${loops}`)

                      .then(function (response){
                        response.data.forEach(function(item, i, arr) {
                            var typeArray = item.name.split(": ");
                            var found = false;

                            labels.forEach(function(item1, i1, arr1){
                                if(item1.type == typeArray[0]){
                                    labels[i1].subtypes.push(typeArray[1] ? typeArray[1] : "");
                                    found = true;
                                }
                            })
                            if(found == false){
                                var subtype = typeArray[1] ? typeArray[1] : "";
                                labels.push({name: item.name, type: typeArray[0], subtypes: [subtype], color: item.color});
                            }
                        });
                        loops++;
                        if(response.data.length == 30){
                            load();
                        }
                      })
                      .catch(function (error) {
                        labels = [];
                        console.log("error");
                     });
                }

            commit('SET_LABELS', labels);
        }
    },
    mutations: {        
        SET_REPODATA(state, repoData) {
            state.repoData = repoData;
        },
        SET_LABELS(state, labels) {
            state.labels = labels;
        }
    },
    getters: {
        repoData(state){
            return state.repoData;
        },
        labels(state) {
            return state.labels;
        }
    },  
    modules: {

    }
        
})