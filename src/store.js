Vuex = require("./lib/vuex.min.js");
store = new Vuex.Store({
    state: {
        userData: user_data,
        //userData:{token: "", auth: false},
        repoData: {owner: "", repo: "", available: false, changed: false},
        labels: [],
    },
    actions: {
        setUserData({commit}, userData){
            commit('SET_USERDATA', userData);
        },
        setRepoData({commit}, repoData){
            commit('SET_REPODATA', repoData);
        },
        loadLabels({commit}, repoData) {
                //var labels = [{name: "NoLabled", type: "NoLabled", subtypes: [], color: ""}];
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
                                    labels[i1].subtypes.push({subtype: typeArray[1], selected: false});
                                    found = true;
                                }
                            })
                            if(found == false){
                                var subtype = typeArray[1];// ? typeArray[1];
                                labels.push({name: item.name, type: typeArray[0], subtypes: subtype ? [{subtype: subtype, selected: false}] : [], color: item.color, selected: false});
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

            //function prepareLabels
        },
        selectLabel({commit}, payload){
            commit("SELECT_LABEL", payload);

        }
    },
    mutations: {     
        SET_USERDATA(state, userData){
            state.userData = userData;
        },   
        SET_REPODATA(state, repoData) {
            state.repoData = repoData;
        },
        SET_LABELS(state, labels){
            state.labels = labels;
        },
        SELECT_LABEL(state, {typeIndex, subTypeIndex, selected}){
            //console.log("ti " +typeIndex + " sti " + subTypeIndex + " value " + selected);
            if(subTypeIndex < 0){
                state.labels[typeIndex].selected = selected;
                for(var i = 0; i < state.labels[typeIndex].subtypes.length; i++){
                    state.labels[typeIndex].subtypes[i].selected = selected;
                }


            } else{
                state.labels[typeIndex].subtypes[subTypeIndex].selected = selected;
            }
            //console.log(value);
        }
    },
    getters: {
        userData(state){
            return state.userData;
        },
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