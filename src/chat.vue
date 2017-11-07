Vue.component('chat', {
	template: `
		<div>
			<div class="chat-open" @click="openChat()">Open chat</div>
			<div class="chat-body " :id="chatid">
				<a @click="closeChat" class="delete chat-close"></a>
				<div class="chat-display">
					<div v-if="messages.length == 0" class="messages-none">This chat has no messages.</div>
					<div :class="getMessageType(message)" v-for="message in messages"><a :href="'https://github.com/' + message.user"><img class="chatavatar" :src="message.avatar" /></a><div><a class="message-url" :href="'https://github.com/' + message.user">{{message.user}}</a>{{': ' + message.text}}</div></div>
				</div>
		        <div class="chat-input">
		          <input @keyup.enter="sendMessage" v-model="input" type="text" placeholder="Enter your message" name="input" class="input messages-input" />
		        </div>
		    </div>
        </div>
	`,
	props: ['chatid'],
	data: function() {
		return {
			user: "Anonimous",
			input: "",
			messages: []
		}
	},
	methods:{
		getMessageType(message){
			return message.user == this.$store.getters.userData.login ? "chat-message chat-message-byuser" : "chat-message"
		},
		openChat(){
			var that = this;
			var socket = io.connect();
			socket.on('messagesList', function(messages){
				that.messages = messages
				document.getElementById(that.chatid).querySelector(".chat-display").scrollTop = 9999;
			});
			socket.emit("getMessages", {chat: this.chatid, repo: this.$route.params.owner+"/"+this.$route.params.repo})
			document.getElementById(this.chatid).className = "chat-body animated zoomInUp"; document.getElementById(this.chatid).style.display = "block"; document.getElementById(this.chatid).style.left = window.innerWidth/2+'';

		},
		closeChat(){
			document.getElementById(this.chatid).className = "chat-body animated zoomOutUp"
			//document.getElementById(this.chatid).style.display = "none";
		},
		sendMessage(){
			if(this.input != ""){
				var socket = io.connect();
				var that = this
				socket.on(this.chatid, function(messages){
					that.messages = messages;
					document.getElementById(that.chatid).querySelector(".chat-display").scrollTop = 999999;
				});
				socket.emit("newMessage", {user: this.$store.getters.userData.login, avatar: this.$store.getters.userData.avatar, text: this.input, repo: this.$route.params.owner+"/"+this.$route.params.repo, chat: this.chatid})
				//this.messages.push({user: "Me", text: this.input})
				this.input = ""
			}
		}
	}
})